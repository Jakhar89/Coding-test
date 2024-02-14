import React, { useCallback, useEffect, useState } from 'react';

import { analyticsStore } from '@/context/Analytics/Analytics';
import { apiStore } from '@/context/API/Api';
import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';
import { userStore } from '@/context/User/User';
import { AEMErrorMap, AEMProps } from '@/types/global/aem-definition';
import HiddenValueCollector from '@/utility/components/FormElement/Forgerock/HiddenValueCollector';
import FormSection from '@/utility/components/FormElement/FormSection';
import { JourneyStepLabel } from '@/utility/components/FormElement/StyledFormSection';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';
import ModalOverlay from '@/utility/components/ModalOverlay';
import { emitTrackEvent, handleAnalyticsClick } from '@/utility/helpers/analytics';
import { forgerockInitialConfig, getFirstCallbackByType, SSP_REGISTRATION_TREE } from '@/utility/helpers/forgerock';
import { getAEMErrorMessageByCode } from '@/utility/helpers/validation';
import useForgeRockJourney from '@/utility/hooks/useForgeRockJourney';
import { usePrevious } from '@/utility/hooks/usePrevious';
import { TextOutputCallback } from '@forgerock/javascript-sdk';

import { RegistrationParsedProps, RegistrationSteps } from './definitions';
import AgreeTermsOfUse from './Steps/AgreeTermsOfUse';
import EmailOtp from './Steps/EmailOtp';
import MobileOtp from './Steps/MobileOtp';
import RegisterAccount from './Steps/RegisterAccount';
import SetPassword from './Steps/SetPassword';

const analyticsC1JourneyHeader = 'continueRegister';
const analyticsC1JourneyName = 'Register';
const analyticsC1JourneySuccess = 'registrationSuccess';

const analyticsField = {
  0: 'correlation id',
  1: 'email|recaptcha',
  2: 'terms',
  3: 'preferences/otp',
  4: 'preferences/otp',
  5: 'password|confirm password',
};

const Registration = ({ attributes, errorSuccessMap, site }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const registrationJson: RegistrationParsedProps = JSON.parse(attributes);
  const errorMap: AEMErrorMap = errorSuccessMap?.errorMap ?? [];
  const {
    //prettier-ignore
    agreeTerms,
    agreeTermsButton,
    agreeTermsTitle,
    communicationsConfig,
    globalConfig,
    loginButton,
    loginButtonUrl,
    loginIcon,
    loginTitle,
    registerButton,
    registerContact,
    registerDescription,
    registerTitle,
    resetPasswordText,
    termsOfUse,
    termsTitle,
  } = registrationJson;

  const { setErrorAPI, setErrorField, setJourneyFlow, setModalTitle } = analyticsStore();
  const { errorMessage } = errorMessageStore();
  const { signature } = apiStore();
  const { isAuthenticated } = userStore();

  //Forgerock config setup
  useEffect(() => {
    //@ts-ignore
    forgerockInitialConfig(globalConfig, SSP_REGISTRATION_TREE);
    setJourneyFlow('Registration');
    setErrorAPI('Forgerock');
  }, []);

  const {
    hasSuccessfullyCompleted,
    header,
    isLoading,
    nextStep,
    resetJourney,
    step = null,
  } = useForgeRockJourney({ errorSuccessMap: errorSuccessMap, tree: SSP_REGISTRATION_TREE });
  const prevHeader = usePrevious(header);
  const [currentStepNumber, setCurrentStepNumber] = useState<number>(RegistrationSteps.Registration);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [textOutputComponent, setTextOutputComponent] = useState<TextOutputCallback | null>(null);

  useEffect(() => {
    if (isLoading || !step) {
      return;
    }

    // cherry-pick out TextOutputCallback
    setTextOutputComponent(getFirstCallbackByType(step?.callbacks));

    const header: keyof typeof RegistrationSteps = step?.getHeader();

    if (!header) {
      return;
    }

    // increment currentStep if header changes
    if (prevHeader !== header) {
      setCurrentStepNumber(RegistrationSteps?.[header] ?? 1);

      if (currentStepNumber === RegistrationSteps['Terms-of-Use']) {
        handleAnalyticsClick(analyticsC1JourneyHeader, {
          continueSection: analyticsC1JourneyName,
          modalTitle: prevHeader,
        });
      }
      if (currentStepNumber === RegistrationSteps['Email-OTP']) {
        handleAnalyticsClick(analyticsC1JourneyHeader, {
          continueSection: analyticsC1JourneyName,
          modalTitle: prevHeader,
        });
      }
      if (currentStepNumber === RegistrationSteps['SMS-OTP']) {
        handleAnalyticsClick(analyticsC1JourneyHeader, {
          continueSection: analyticsC1JourneyName,
          modalTitle: prevHeader,
        });
      }

      const modalTitle = {
        0: 'correlation id',
        1: registerTitle,
        2: termsTitle,
        3: communicationsConfig?.verifyEmailTitle,
        4: communicationsConfig?.verifyMobileTitle,
        5: communicationsConfig?.managePasswordEditTitle,
      };
      setModalTitle(modalTitle[RegistrationSteps?.[header]]);
      setErrorField(analyticsField[RegistrationSteps?.[header]]);
    }
  }, [step]);

  // only used by Formik-related forms
  const handleFormSubmit = () => {
    if (step?.getHeader() === 'Login-Prompt') {
      resetJourney(true);
    } else {
      nextStep(step);
    }
  };

  useEffect(() => {
    if (hasSuccessfullyCompleted && isAuthenticated && signature) {
      window.sessionStorage.setItem('journey', 'registration');
      resetJourney(true);
      setShouldShowModal(true);
      handleAnalyticsClick(analyticsC1JourneyHeader, {
        continueSection: analyticsC1JourneyName,
        modalTitle: prevHeader,
      });
      emitTrackEvent({ name: analyticsC1JourneySuccess });
    }
  }, [hasSuccessfullyCompleted, isAuthenticated, signature]);

  return (
    <>
      {/* TODO: Re-enable loading overlay */}
      {/* <LoadingOverlay attributes="" /> */}
      <>
        {currentStepNumber !== 0 && <JourneyStepLabel>Step {currentStepNumber} of 5</JourneyStepLabel>}

        {/* Hidden values */}
        {currentStepNumber === RegistrationSteps['Hidden-Value-Collector'] && (
          <HiddenValueCollector
            errorMap={errorMap}
            handleFormSubmit={handleFormSubmit}
            site={site}
            step={step}
          />
        )}

        {/* Registration */}
        {currentStepNumber === RegistrationSteps.Registration && (
          <RegisterAccount
            btnText={registerButton}
            errorComponent={textOutputComponent}
            errorMap={errorMap}
            handleFormSubmit={handleFormSubmit}
            isLoading={isLoading}
            loginButton={loginButton}
            loginButtonUrl={loginButtonUrl}
            loginIcon={loginIcon}
            loginTitle={loginTitle}
            nextStep={nextStep}
            registerContact={registerContact}
            registerDescription={registerDescription}
            registerTitle={registerTitle}
            site={site}
            step={step}
          />
        )}

        {/* Terms of use */}
        {currentStepNumber === RegistrationSteps['Terms-of-Use'] && (
          <AgreeTermsOfUse
            agreeTerms={agreeTerms}
            agreeTermsTitle={agreeTermsTitle}
            btnText={agreeTermsButton}
            errorMap={errorMap}
            handleFormSubmit={handleFormSubmit}
            nextStep={nextStep}
            site={site}
            step={step}
            termsOfUse={termsOfUse}
            termsTitle={termsTitle}
          />
        )}

        {[RegistrationSteps['Email-OTP'], RegistrationSteps['SMS-OTP'], RegistrationSteps.Password].includes(
          currentStepNumber,
        ) && (
          <FormSection sectionWidth="halfwidth">
            <>
              {/* Email OTP */}
              {currentStepNumber === RegistrationSteps['Email-OTP'] && (
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
              {currentStepNumber === RegistrationSteps['SMS-OTP'] && (
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
              {/* SET PASSWORD */}
              {currentStepNumber === RegistrationSteps.Password && (
                <SetPassword
                  btnText={resetPasswordText}
                  description={communicationsConfig?.managePasswordDescription}
                  errorMap={errorMap}
                  handleFormSubmit={handleFormSubmit}
                  nextStep={nextStep}
                  title={communicationsConfig?.managePasswordEditTitle}
                  site={site}
                  step={step}
                  isLoading={isLoading}
                />
              )}
            </>
          </FormSection>
        )}
        {/* THANK YOU MODAL OVERLAY WITH REDIRECTION*/}
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
    </>
  );
};
export default Registration;
