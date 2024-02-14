import { TextOutputCallback } from '@forgerock/javascript-sdk';
import { useEffect, useState } from 'react';

import { analyticsStore } from '@/context/Analytics/Analytics';

import { AEMErrorMap, AEMProps } from '@/types/global/aem-definition';

import DataList from '@/utility/components/DataList';
import EditableSectionContainer from '@/utility/components/EditableSection/EditableSectionContainer';
import ActionButton from '@/utility/components/FormElement/ActionButton';
import HiddenValueCollector from '@/utility/components/FormElement/Forgerock/HiddenValueCollector';
import FormSection from '@/utility/components/FormElement/FormSection';
import { HeadingWithButtonWrapper, HeadingWithDivider } from '@/utility/components/FormElement/StyledFormSection';
import ModalOverlay from '@/utility/components/ModalOverlay';

import { dispatchFormInteractionAnalyticsClick, handleAnalyticsClick } from '@/utility/helpers/analytics';
import { forgerockInitialConfig, getFirstCallbackByType, SSP_CHANGE_PASSWORD_TREE } from '@/utility/helpers/forgerock';

import useForgeRockJourney from '@/utility/hooks/useForgeRockJourney';
import { usePrevious } from '@/utility/hooks/usePrevious';

import { ManagePasswordParsedProps, ManagePasswordSteps } from './definitions';

import MobileOtp from './Steps/MobileOtp';
import PasswordStep from './Steps/Password';

const analyticsField = {
  0: 'correlation id',
  1: 'mail',
  2: 'preferences/otp',
  3: 'preferences/otp',
  4: 'success',
};
const SECTION_NAME = 'Password';

const ManagePassword = ({ attributes, errorSuccessMap, site }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const { setErrorAPI, setJourneyFlow, setModalTitle, setSectionType, setErrorField } = analyticsStore();
  const [textOutputComponent, setTextOutputComponent] = useState<TextOutputCallback | null>(null);

  const managePasswordJson: ManagePasswordParsedProps = JSON.parse(attributes);
  const errorMap: AEMErrorMap = errorSuccessMap?.errorMap ?? [];
  const modalTitle = {
    0: 'correlation id',
    1: managePasswordJson?.communicationsConfig?.managePasswordEditTitle,
    2: managePasswordJson?.communicationsConfig?.verifyMobileTitle,
    3: managePasswordJson.communicationsConfig?.thankYouTitle,
  };

  //Forgerock config setup
  useEffect(() => {
    //@ts-ignore
    forgerockInitialConfig(managePasswordJson.globalConfig, SSP_CHANGE_PASSWORD_TREE);
    setErrorAPI('Forgerock');
  }, []);

  const {
    hasSuccessfullyCompleted,
    header,
    isLoading,
    nextStep,
    resetJourney,
    step = null,
  } = useForgeRockJourney({
    errorSuccessMap: errorSuccessMap,
    tree: SSP_CHANGE_PASSWORD_TREE,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [currentStepNumber, setCurrentStepNumber] = useState<number>(ManagePasswordSteps['New-Password']);
  const prevHeader = usePrevious(header);

  const data = [
    {
      title: managePasswordJson.passwordText,
      value: '*********',
    },
  ];

  if (!data) {
    return null;
  }

  const handleFormSubmit = () => {
    nextStep(step);
  };

  useEffect(() => {
    if (isLoading || !step) {
      return;
    }
    const header: keyof typeof ManagePasswordSteps = step?.getHeader();

    if (!header) {
      return;
    }

    // cherry-pick out TextOutputCallback
    setTextOutputComponent(getFirstCallbackByType(step?.callbacks));

    // increment currentStep if header changes
    if (prevHeader !== header) {
      setCurrentStepNumber(ManagePasswordSteps?.[header] ?? 0);
    }
  }, [step]);

  useEffect(() => {
    if (hasSuccessfullyCompleted) {
      resetJourney(true);
      setIsEditing(false);
      setShouldShowModal(true);
      handleAnalyticsClick('updateSuccess', { updateSuccessSection: SECTION_NAME });
    }
  }, [hasSuccessfullyCompleted]);

  useEffect(() => {
    if (isEditing) {
      setErrorField(analyticsField[ManagePasswordSteps?.[header]]);
      setModalTitle(modalTitle[ManagePasswordSteps?.[header]]);
      setSectionType(SECTION_NAME);
    }
  }, [currentStepNumber, isEditing]);

  // Dispatch form interaction analytics click
  dispatchFormInteractionAnalyticsClick(currentStepNumber, modalTitle, SECTION_NAME);

  useEffect(() => {
    setJourneyFlow(isEditing ? 'Update password' : undefined);
  }, [isEditing]);

  return (
    <>
      <FormSection
        spacingSize="macro1"
        sectionWidth="halfwidth"
      >
        <HeadingWithButtonWrapper>
          <HeadingWithDivider>{managePasswordJson?.managePasswordTitle}</HeadingWithDivider>
          <ActionButton
            handleOnClick={() => {
              handleAnalyticsClick('updateClick', { updateSection: SECTION_NAME });
              setIsEditing(true);
            }}
            icon="edit"
          />
        </HeadingWithButtonWrapper>
        <DataList data={data} />
      </FormSection>
      <>
        {/* output the form elements from Foregrock API response */}
        <EditableSectionContainer
          isEditing={isEditing}
          resetJourneyFn={resetJourney}
          setIsEditing={setIsEditing}
        >
          {/* Hidden values */}
          {currentStepNumber === ManagePasswordSteps['Hidden-Value-Collector'] && (
            <HiddenValueCollector
              errorMap={errorMap}
              handleFormSubmit={handleFormSubmit}
              site={site}
              step={step}
            />
          )}

          {/* Manage Password */}
          {currentStepNumber === ManagePasswordSteps['New-Password'] && (
            <PasswordStep
              errorComponent={textOutputComponent}
              errorMap={errorMap}
              handleFormSubmit={handleFormSubmit}
              managePasswordJson={managePasswordJson}
              nextStep={nextStep}
              resetJourney={resetJourney}
              setIsEditing={setIsEditing}
              site={site}
              step={step}
              isLoading={isLoading}
            />
          )}
          {/* One Time Password  */}
          {currentStepNumber === ManagePasswordSteps['SMS-OTP'] && (
            <MobileOtp
              errorComponent={textOutputComponent}
              errorMap={errorMap}
              handleFormSubmit={handleFormSubmit}
              managePasswordJson={managePasswordJson}
              nextStep={nextStep}
              resetJourney={resetJourney}
              setIsEditing={setIsEditing}
              site={site}
              step={step}
              isLoading={isLoading}
            />
          )}
        </EditableSectionContainer>
      </>
      {/* Thank you overlay */}
      <ModalOverlay
        description={managePasswordJson.communicationsConfig?.thankYouDescription ?? ''}
        iconName={managePasswordJson.communicationsConfig?.thankYouIcon}
        setShouldShowModal={setShouldShowModal}
        setTimer={managePasswordJson.communicationsConfig?.thankYouOverlayTimer}
        shouldShowModalOverlay={shouldShowModal}
        heading={managePasswordJson.communicationsConfig?.thankYouTitle}
      />
    </>
  );
};

export default ManagePassword;
