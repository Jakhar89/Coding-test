import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

import { analyticsStore } from '@/context/Analytics/Analytics';
import { apiStore } from '@/context/API/Api';
import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';
import { userStore } from '@/context/User/User';
import { AEMErrorMap, AEMProps } from '@/types/global/aem-definition';
import { isAuthorMode } from '@/utility/aem';
import HiddenValueCollector from '@/utility/components/FormElement/Forgerock/HiddenValueCollector';
import FormSection from '@/utility/components/FormElement/FormSection';
import { emitTrackEvent, handleAnalyticsClick } from '@/utility/helpers/analytics';
import { getCallAPI, postCallAPI, SIGNATURE_COOKIE_NAME } from '@/utility/helpers/api';
import { clearCorrelationId } from '@/utility/helpers/correlation-id';
import { forgerockInitialConfig, getFirstCallbackByType, SSP_LOGIN_TREE } from '@/utility/helpers/forgerock';
import useForgeRockJourney from '@/utility/hooks/useForgeRockJourney';
import { usePrevious } from '@/utility/hooks/usePrevious';
import { FRUser, TextOutputCallback } from '@forgerock/javascript-sdk';

import { LoginParsedProps, LoginSteps } from './definitions';
import AgreeTermsOfUse from './Steps/AgreeTermsOfUse';
import LogIn from './Steps/LogIn';
import MobileOtp from './Steps/MobileOtp';
import { LoginContainer } from './StyledLogin';

const analyticsC1JourneyHeader = 'continueLogin';
const analyticsC1JourneyName = 'Log in';
const analyticsC1JourneySuccess = 'loginSuccess';

const Login = ({ attributes, errorSuccessMap, site }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const checkAuthorMode = isAuthorMode();
  const errorMap: AEMErrorMap = errorSuccessMap?.errorMap ?? [];
  const loginJson: LoginParsedProps = JSON.parse(attributes);
  const {
    //prettier-ignore
    agreeTerms,
    agreeTermsButton,
    agreeTermsTitle,
    communicationsConfig,
    forgotPasswordText,
    forgotPasswordUrl,
    registerButton,
    registerButtonUrl,
    registerIcon,
    registerTitle,
    loginButton,
    loginContact,
    loginDescription,
    loginTitle,
    termsOfUse,
    termsTitle,
  } = loginJson;

  const { setErrorAPI, setErrorField, setJourneyFlow, setModalTitle } = analyticsStore();
  const { errorMessage } = errorMessageStore();
  const { signature } = apiStore();
  const { isAuthenticated } = userStore();

  const [isLogout, setIsLogout] = useState<boolean>(false);

  const [currentStepNumber, setCurrentStepNumber] = useState<number | null>(null);
  const [textOutputComponent, setTextOutputComponent] = useState<TextOutputCallback | null>(null);

  const { globalConfig } = loginJson;

  const logoutUser = () => {
    const postData = {
      eventLabel: 'LOGOUT',
    };
    postCallAPI('logout', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap);
  };

  const logout = async () => {
    logoutUser();
    await FRUser.logout().then(() => {
      Cookies.remove(SIGNATURE_COOKIE_NAME);
      clearCorrelationId();
    });
    setIsLogout(true);
  };

  //Forgerock config setup
  useEffect(() => {
    window.sessionStorage.removeItem('journey');
    const tokenExpiry = JSON.parse(localStorage?.getItem('forgerock-sdk-SSCP') ?? 'null')?.tokenExpiry;

    if (tokenExpiry && new Date() > new Date(tokenExpiry)) {
      logout();
    } else {
      setIsLogout(true);
    }
  }, []);

  //Forgerock config setup
  useEffect(() => {
    if (!isLogout) return;
    //@ts-ignore
    forgerockInitialConfig(loginJson.globalConfig, SSP_LOGIN_TREE);
    setJourneyFlow('Login');
    setErrorAPI('Forgerock');
  }, [isLogout]);

  const {
    hasSuccessfullyCompleted,
    header,
    isLoading,
    nextStep,
    resetJourney,
    step = null,
  } = useForgeRockJourney({ errorSuccessMap: errorSuccessMap, globalConfig, tree: SSP_LOGIN_TREE });
  const { apiResponse, addToAPIResponse } = userStore();
  const { tcStatusData } = apiResponse || {};

  const prevHeader = usePrevious(header);

  useEffect(() => {
    if (isLoading || !step) {
      return;
    }
    const header: keyof typeof LoginSteps = step?.getHeader();

    if (!header) {
      return;
    }

    const modalTitle = {
      0: 'correlation id',
      1: loginTitle,
      2: agreeTermsTitle,
      3: communicationsConfig?.verifyMobileTitle,
    };

    const analyticsField = {
      0: 'correlation id',
      1: 'email|password',
      2: 'terms of use',
      3: 'preferences/otp',
    };

    setModalTitle(modalTitle[LoginSteps[header]]);
    setErrorField(analyticsField[LoginSteps[header]]);

    // cherry-pick out TextOutputCallback
    setTextOutputComponent(getFirstCallbackByType(step?.callbacks));

    // increment currentStep if header changes
    if (prevHeader !== header) {
      setCurrentStepNumber(LoginSteps?.[header]);
      if (currentStepNumber === LoginSteps['Terms-of-Use']) {
        handleAnalyticsClick(analyticsC1JourneyHeader, {
          continueSection: analyticsC1JourneyName,
          modalTitle: prevHeader,
        });
      }
    }
  }, [step]);

  // only used by Formik-related forms
  const handleFormSubmit = () => {
    nextStep(step);
  };

  const questApiKey = localStorage?.getItem('apiKey') ?? loginJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? loginJson?.globalConfig?.baseApiUrl;

  const getTCStatus = () => {
    getCallAPI('tc-status', `${baseApiUrl}`, `${questApiKey}`, errorSuccessMap).then((response) => {
      if (response?.data) {
        addToAPIResponse('tcStatusData', response.data);
      }
    });
  };

  useEffect(() => {
    if (hasSuccessfullyCompleted && isAuthenticated && signature) {
      handleAnalyticsClick(analyticsC1JourneyHeader, {
        continueSection: analyticsC1JourneyName,
        modalTitle: prevHeader,
      });
      emitTrackEvent({ name: analyticsC1JourneySuccess });
      getTCStatus();
    }
  }, [hasSuccessfullyCompleted, isAuthenticated, signature]);

  useEffect(() => {
    if (tcStatusData) {
      // fallback to root path and dispatcher rule can handle from there
      if (tcStatusData?.customerDomain?.customerConsent?.customerPortalTermsAndConditionsStatus === 'Y') {
        window.location.href = errorSuccessMap?.successPagePath ? `${errorSuccessMap.successPagePath}.html` : `/`;
        resetJourney(true);
      } else {
        setCurrentStepNumber(LoginSteps?.['Terms-of-Use']);
      }
    }
  }, [hasSuccessfullyCompleted, isAuthenticated, signature, tcStatusData]);

  return (
    <LoginContainer>
      {/* TODO: Re-enable loading overlay */}
      {/* <LoadingOverlay attributes="" /> */}
      <>
        {/* Hidden values */}
        {currentStepNumber === LoginSteps['Hidden-Value-Collector'] && (
          <>
            <HiddenValueCollector
              errorMap={errorMap}
              handleFormSubmit={handleFormSubmit}
              site={site}
              step={step}
            />
          </>
        )}
        {checkAuthorMode || currentStepNumber === LoginSteps['Log-In'] ? (
          <LogIn
            btnText={loginButton}
            errorMap={errorMap}
            errorComponent={textOutputComponent}
            forgotPasswordText={forgotPasswordText}
            forgotPasswordUrl={forgotPasswordUrl}
            handleFormSubmit={handleFormSubmit}
            isLoading={isLoading}
            loginContact={loginContact}
            loginDescription={loginDescription}
            loginTitle={loginTitle}
            nextStep={nextStep}
            registerButton={registerButton}
            registerButtonUrl={registerButtonUrl}
            registerIcon={registerIcon}
            registerTitle={registerTitle}
            site={site}
            step={step}
          />
        ) : (
          ''
        )}
        {/* Terms of use */}
        {currentStepNumber === LoginSteps['Terms-of-Use'] && (
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
            attributes={loginJson}
            errorSuccessMap={errorSuccessMap}
          />
        )}
        {/* SMS OTP */}
        {currentStepNumber === LoginSteps['SMS-OTP'] && (
          <FormSection sectionWidth="fullwidth">
            <>
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
            </>
          </FormSection>
        )}
      </>
    </LoginContainer>
  );
};
export default Login;
