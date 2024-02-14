import { TextOutputCallback } from '@forgerock/javascript-sdk';
import React, { useEffect, useState } from 'react';

import { analyticsStore } from '@/context/Analytics/Analytics';
import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';

import { AEMErrorMap, AEMProps } from '@/types/global/aem-definition';

import HiddenValueCollector from '@/utility/components/FormElement/Forgerock/HiddenValueCollector';
import FormSection from '@/utility/components/FormElement/FormSection';

import InPageAnnouncement from '@/utility/components/InPageAnnouncement';
import ModalOverlay from '@/utility/components/ModalOverlay';

import {
  checkAllInputsHidden,
  forgerockInitialConfig,
  getFirstCallbackByType,
  SSP_RESET_PASSWORD_TREE,
} from '@/utility/helpers/forgerock';
import { getAEMErrorMessageByCode } from '@/utility/helpers/validation';

import useForgeRockJourney from '@/utility/hooks/useForgeRockJourney';
import { usePrevious } from '@/utility/hooks/usePrevious';

import EmailOtp from './Steps/EmailOtp';
import ForgotYourPassword from './Steps/ForgotYourPassword';
import MobileOtp from './Steps/MobileOtp';
import ResetPassword from './Steps/ResetPassword';
import AgreeTermsOfUse from './Steps/AgreeTermsOfUse';

import { ForgotPasswordParsedProps, ForgotPasswordSteps } from './definitions';
import { getCallAPI } from '@/utility/helpers/api';
import { apiStore } from '@/context/API/Api';
import { userStore } from '@/context/User/User';

const analyticsField = {
  0: 'correlation id',
  1: 'mail|recaptcha',
  2: 'preferences/otp',
  3: 'preferences/otp',
  4: 'password|confirm password',
};

const ForgotPassword = ({ site, attributes, errorSuccessMap }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const forgotPasswordJson: ForgotPasswordParsedProps = JSON.parse(attributes);
  const errorMap: AEMErrorMap = errorSuccessMap?.errorMap ?? [];
  const {
    //prettier-ignore
    agreeTerms,
    agreeTermsButton,
    agreeTermsTitle,
    termsOfUse,
    termsTitle,
  } = forgotPasswordJson;

  //Forgerock config setup
  useEffect(() => {
    //@ts-ignore
    forgerockInitialConfig(forgotPasswordJson.globalConfig, SSP_RESET_PASSWORD_TREE);
    setErrorAPI('Forgerock');
    setJourneyFlow('Forgot password');
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
    tree: SSP_RESET_PASSWORD_TREE,
  });
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [currentStepNumber, setCurrentStepNumber] = useState<number>(ForgotPasswordSteps['Hidden-Value-Collector']);
  const [textOutputComponent, setTextOutputComponent] = useState<TextOutputCallback | null>(null);
  const prevHeader = usePrevious(header);
  const { signature } = apiStore();
  const { isAuthenticated, apiResponse, addToAPIResponse } = userStore();
  const { tcStatusData } = apiResponse || {};

  const { setErrorAPI, setJourneyFlow, setModalTitle, setErrorField } = analyticsStore();
  const { errorMessage } = errorMessageStore();

  useEffect(() => {
    if (isLoading || !step) {
      return;
    }
    const header: keyof typeof ForgotPasswordSteps = step?.getHeader();

    if (!header) {
      return;
    }

    // determine if first step of journey where only hidden inputs returned from API
    if (checkAllInputsHidden(step?.callbacks, header)) {
      nextStep(step);
    }

    // cherry-pick out TextOutputCallback
    setTextOutputComponent(getFirstCallbackByType(step?.callbacks));

    const modalTitle = {
      0: 'correlation id',
      1: forgotPasswordJson?.forgotPasswordTitle,
      2: forgotPasswordJson?.communicationsConfig?.verifyEmailTitle,
      3: forgotPasswordJson?.communicationsConfig?.verifyMobileTitle,
      4: forgotPasswordJson?.communicationsConfig?.managePasswordEditTitle,
      5: forgotPasswordJson?.termsTitle,
    };

    setModalTitle(modalTitle[ForgotPasswordSteps?.[header]]);
    setErrorField(analyticsField[ForgotPasswordSteps?.[header]]);

    // increment currentStep if header changes
    if (prevHeader !== header) {
      setCurrentStepNumber(ForgotPasswordSteps?.[header] ?? 1);
    }
  }, [step]);

  // only used by Formik-related forms
  const handleFormSubmit = () => {
    nextStep(step);
  };

  const questApiKey = localStorage?.getItem('apiKey') ?? forgotPasswordJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? forgotPasswordJson?.globalConfig?.baseApiUrl;

  const getTCStatus = () => {
    getCallAPI('tc-status', `${baseApiUrl}`, `${questApiKey}`, errorSuccessMap).then((response) => {
      if (response?.data) {
        addToAPIResponse('tcStatusData', response.data);
      }
    });
  };

  useEffect(() => {
    if (hasSuccessfullyCompleted && isAuthenticated && signature) {
      getTCStatus();
    }
  }, [hasSuccessfullyCompleted, isAuthenticated, signature]);

  useEffect(() => {
    if (tcStatusData) {
      if (tcStatusData?.customerDomain?.customerConsent?.customerPortalTermsAndConditionsStatus === 'Y') {
        resetJourney(true);
        setShouldShowModal(true);
      } else {
        setCurrentStepNumber(ForgotPasswordSteps?.['Terms-of-Use']);
      }
    }
  }, [hasSuccessfullyCompleted, isAuthenticated, signature, tcStatusData]);

  return (
    <>
      <FormSection sectionWidth="halfwidth">
        <>
          {/* Hidden values */}
          {currentStepNumber === ForgotPasswordSteps['Hidden-Value-Collector'] && (
            <HiddenValueCollector
              errorMap={errorMap}
              handleFormSubmit={handleFormSubmit}
              site={site}
              step={step}
            />
          )}

          {/* Enter email address to reset password  */}
          {currentStepNumber === ForgotPasswordSteps['Reset-Password'] && (
            <ForgotYourPassword
              errorComponent={textOutputComponent}
              errorMap={errorMap}
              forgotPasswordContact={forgotPasswordJson?.forgotPasswordContact}
              forgotPasswordDescription={forgotPasswordJson?.forgotPasswordDescription}
              forgotPasswordTitle={forgotPasswordJson?.forgotPasswordTitle}
              handleFormSubmit={handleFormSubmit}
              isLoading={isLoading}
              step={step}
              site={site}
              nextStep={nextStep}
              btnText={forgotPasswordJson?.forgotPasswordButton}
            />
          )}

          {/* Email OTP */}
          {currentStepNumber === ForgotPasswordSteps['Email-OTP'] && (
            <EmailOtp
              communicationsConfig={forgotPasswordJson?.communicationsConfig}
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
          {currentStepNumber === ForgotPasswordSteps['SMS-OTP'] && (
            <MobileOtp
              communicationsConfig={forgotPasswordJson?.communicationsConfig}
              errorComponent={textOutputComponent}
              errorMap={errorMap}
              handleFormSubmit={() => nextStep(step)}
              nextStep={nextStep}
              site={site}
              step={step}
              isLoading={isLoading}
            />
          )}

          {/* Reset Password */}
          {currentStepNumber === ForgotPasswordSteps['New-Password'] && (
            <ResetPassword
              communicationsConfig={forgotPasswordJson?.communicationsConfig}
              errorComponent={textOutputComponent}
              errorMap={errorMap}
              handleFormSubmit={handleFormSubmit}
              nextStep={nextStep}
              setPasswordText={forgotPasswordJson?.setPasswordText}
              site={site}
              step={step}
              isLoading={isLoading}
            />
          )}

          {/* Terms of use */}
          {currentStepNumber === ForgotPasswordSteps['Terms-of-Use'] && (
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
              attributes={forgotPasswordJson}
              errorSuccessMap={errorSuccessMap}
              isLoading={isLoading}
            />
          )}
        </>
      </FormSection>
      {/* THANK YOU OVERLAY MODAL WITH REDIRECT USER TO ACCOUNT PAGE*/}
      <ModalOverlay
        description={forgotPasswordJson?.communicationsConfig?.thankYouDescription ?? ''}
        heading={forgotPasswordJson?.communicationsConfig?.thankYouTitle}
        iconName={forgotPasswordJson?.communicationsConfig?.thankYouIcon}
        redirectURL={errorSuccessMap?.successPagePath}
        setShouldShowModal={setShouldShowModal}
        setTimer={forgotPasswordJson?.communicationsConfig?.thankYouOverlayTimer}
        shouldRedirectUserOnSuccessful={true}
        shouldShowModalOverlay={shouldShowModal}
      />
    </>
  );
};

export default ForgotPassword;
