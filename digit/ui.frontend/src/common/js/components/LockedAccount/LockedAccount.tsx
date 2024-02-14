import React, { useEffect, useState } from 'react';

import PageNotification from '@/components/PageNotification/PageNotification';
import { analyticsStore } from '@/context/Analytics/Analytics';
import { apiStore } from '@/context/API/Api';
import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';
import { userStore } from '@/context/User/User';
import { AEMErrorMap, AEMProps } from '@/types/global/aem-definition';
import HiddenValueCollector from '@/utility/components/FormElement/Forgerock/HiddenValueCollector';
import FormSection from '@/utility/components/FormElement/FormSection';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';
import ModalOverlay from '@/utility/components/ModalOverlay';
import { emitTrackEvent } from '@/utility/helpers/analytics';
import {
    forgerockInitialConfig, getFirstCallbackByType, SSP_RECOVER_LOCKED_ACCOUNT_TREE
} from '@/utility/helpers/forgerock';
import { getAEMErrorMessageByCode } from '@/utility/helpers/validation';
import useForgeRockJourney from '@/utility/hooks/useForgeRockJourney';
import { usePrevious } from '@/utility/hooks/usePrevious';
import { TextOutputCallback } from '@forgerock/javascript-sdk';

import { LockedAccountParsedProps, LockedAccountSteps } from './definitions';
import EmailOtp from './Steps/EmailOtp';
import MobileOtp from './Steps/MobileOtp';
import ResetPassword from './Steps/ResetPassword';
import ResetPasswordPrompt from './Steps/ResetPasswordPrompt';

const analyticsField = {
  0: 'unlock account prompt',
  1: 'reset password prompt',
  2: 'password|confirm password',
  3: 'preferences/otp',
  4: 'preferences/otp',
  5: 'thank you',
};

const LockedAccount = ({ attributes, errorSuccessMap, site }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const { signature } = apiStore();
  const { isAuthenticated } = userStore();

  //Forgerock config setup
  useEffect(() => {
    //@ts-ignore
    forgerockInitialConfig(lockedAccountJson?.globalConfig, SSP_RECOVER_LOCKED_ACCOUNT_TREE);
    setJourneyFlow('Locked account');
    setErrorAPI('Forgerock');
    emitTrackEvent({ name: 'accountLockout' });
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
    tree: SSP_RECOVER_LOCKED_ACCOUNT_TREE,
  });
  const lockedAccountJson: LockedAccountParsedProps = JSON.parse(attributes);
  const {
    // Prettier-ignore
    eventName,
    communicationsConfig,
    lockedButtonText,
    lockedDescription,
    lockedIcon,
    lockedTitle,
    loginButtonText,
    setPasswordText,
  } = lockedAccountJson;

  const errorMap: AEMErrorMap = errorSuccessMap?.errorMap ?? [];

  const lockedPagePath = errorSuccessMap?.lockedPagePath ?? '';
  const [currentStepNumber, setCurrentStepNumber] = useState<number>(LockedAccountSteps['Hidden-Value-Collector']);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [textOutputComponent, setTextOutputComponent] = useState<TextOutputCallback | null>(null);
  const prevHeader = usePrevious(header);

  const { setErrorAPI, setJourneyFlow, setModalTitle, setErrorField } = analyticsStore();
  const { errorMessage } = errorMessageStore();

  const handleOnClick = () => {
    nextStep(step);
  };

  useEffect(() => {
    if (isLoading || !step) {
      return;
    }
    const header: keyof typeof LockedAccountSteps = step?.getHeader();

    if (!header) {
      return;
    }

    // cherry-pick out TextOutputCallback
    setTextOutputComponent(getFirstCallbackByType(step?.callbacks));

    const modalTitle = {
      0: lockedAccountJson?.lockedTitle,
      1: communicationsConfig?.verifyEmailTitle,
      2: communicationsConfig?.verifyMobileTitle,
      3: lockedAccountJson?.unlockedTitle,
      4: communicationsConfig?.managePasswordEditTitle,
      5: communicationsConfig?.thankYouTitle,
    };

    setModalTitle(modalTitle[LockedAccountSteps?.[header]]);
    setErrorField(analyticsField[LockedAccountSteps?.[header]]);

    // increment currentStep if header changes
    if (prevHeader !== header) {
      setCurrentStepNumber(LockedAccountSteps?.[header] ?? 0);
    }
  }, [step]);

  // only used by Formik-related forms
  const handleFormSubmit = () => {
    nextStep(step);
  };

  const props = {
    analyticsTrackEventName: eventName,
    buttonText: lockedButtonText,
    buttonUrl: lockedPagePath,
    description: lockedDescription,
    icon: lockedIcon,
    title: lockedTitle,
  };

  useEffect(() => {
    if (header === 'Email-OTP') {
      window.sessionStorage.removeItem('userid');
    }
  }, [header]);

  useEffect(() => {
    if (hasSuccessfullyCompleted) {
      resetJourney(true);
      if (
        currentStepNumber !== LockedAccountSteps['Set-Password'] &&
        currentStepNumber === LockedAccountSteps['Reset-Password-Prompt'] &&
        isAuthenticated &&
        signature
      ) {
        window.location.href = `${errorSuccessMap?.successPagePath}.html`;
      }

      if (currentStepNumber === LockedAccountSteps['Set-Password']) {
        setShouldShowModal(true);
      }
    }
  }, [hasSuccessfullyCompleted, isAuthenticated, signature]);

  return (
    <>
      {currentStepNumber === LockedAccountSteps['Hidden-Value-Collector'] && (
        <>
          <PageNotification
            attributes={JSON.stringify(props)}
            handleOnClick={handleFormSubmit}
            removeMarginTopSpacing={true}
            isLoading={isLoading}
          />
          <HiddenValueCollector
            errorMap={errorMap}
            // Empty function to prevent hidden value collector to go to next step before hitting continue button
            handleFormSubmit={() => {}}
            site={site}
            step={step}
          />
        </>
      )}

      {[LockedAccountSteps['Email-OTP'], LockedAccountSteps['SMS-OTP']].includes(currentStepNumber) && (
        <FormSection sectionWidth="halfwidth">
          <>
            {/* Email OTP */}
            {currentStepNumber === LockedAccountSteps['Email-OTP'] && (
              <EmailOtp
                communicationsConfig={communicationsConfig}
                errorComponent={textOutputComponent}
                errorMap={errorMap}
                handleFormSubmit={handleFormSubmit}
                nextStep={nextStep}
                site={site}
                step={step}
                isLoading={isLoading}
              />
            )}
            {/* SMS OTP */}
            {currentStepNumber === LockedAccountSteps['SMS-OTP'] && (
              <MobileOtp
                communicationsConfig={communicationsConfig}
                errorComponent={textOutputComponent}
                errorMap={errorMap}
                handleFormSubmit={handleFormSubmit}
                nextStep={nextStep}
                site={site}
                step={step}
                isLoading={isLoading}
              />
            )}
          </>
        </FormSection>
      )}
      {/* Option to Reset Password or Login without reset.  */}
      {currentStepNumber === LockedAccountSteps['Reset-Password-Prompt'] && (
        <ResetPasswordPrompt
          errorComponent={textOutputComponent}
          errorMap={errorMap}
          lockedAccountJson={lockedAccountJson}
          loginButtonText={loginButtonText}
          nextStep={nextStep}
          site={site}
          step={step}
        />
      )}
      {/* Reset Password */}
      {currentStepNumber === LockedAccountSteps['Set-Password'] && (
        <FormSection sectionWidth="halfwidth">
          <ResetPassword
            communicationsConfig={communicationsConfig}
            errorComponent={textOutputComponent}
            errorMap={errorMap}
            handleFormSubmit={handleFormSubmit}
            nextStep={nextStep}
            setPasswordText={setPasswordText}
            site={site}
            step={step}
            isLoading={isLoading}
          />
        </FormSection>
      )}

      {errorMessage && <InPageAnnouncement text={getAEMErrorMessageByCode(errorMessage, errorMap)} />}

      {/* THANK YOU OVERLAY MODAL WITH REDIRECT USER TO ACCOUNT PAGE*/}
      <ModalOverlay
        description={communicationsConfig?.thankYouDescription ?? ''}
        heading={communicationsConfig?.thankYouTitle}
        iconName={communicationsConfig?.thankYouIcon}
        redirectURL={errorSuccessMap?.successPagePath}
        setShouldShowModal={setShouldShowModal}
        setTimer={communicationsConfig?.thankYouOverlayTimer}
        shouldRedirectUserOnSuccessful={true}
        shouldShowModalOverlay={shouldShowModal}
      />
    </>
  );
};

export default LockedAccount;
