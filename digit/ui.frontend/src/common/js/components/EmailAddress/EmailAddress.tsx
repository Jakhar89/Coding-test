import { find, isEmpty, isEqual } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

import { analyticsStore } from '@/context/Analytics/Analytics';
import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';
import { userStore } from '@/context/User/User';
import { AEMErrorMap, AEMProps } from '@/types/global/aem-definition';
import DataList from '@/utility/components/DataList';
import EditableSectionContainer from '@/utility/components/EditableSection/EditableSectionContainer';
import ActionButton from '@/utility/components/FormElement/ActionButton';
import HiddenValueCollector from '@/utility/components/FormElement/Forgerock/HiddenValueCollector';
import FormSection from '@/utility/components/FormElement/FormSection';
import { HeadingWithButtonWrapper, HeadingWithDivider } from '@/utility/components/FormElement/StyledFormSection';
import ModalOverlay from '@/utility/components/ModalOverlay';
import { dispatchFormInteractionAnalyticsClick, handleAnalyticsClick } from '@/utility/helpers/analytics';
import { getCallAPI, getRequestHeaders, loginFlow, postCallAPI } from '@/utility/helpers/api';
import { ContactEmailAddress, CustomerProfile } from '@/utility/helpers/api/CustomerProfileContext/definitions';
import {
  API_LOGIN_INFO,
  API_PROFILE_DATA,
  QUEST_ERROR_MSG_DISPLAY_DURATION,
  SET_LOADING_OBJ,
} from '@/utility/helpers/constants';
import { apiErrorRedirect } from '@/utility/helpers/error-handling';
import { forgerockInitialConfig, getFirstCallbackByType, SSP_CHANGE_EMAIL_TREE } from '@/utility/helpers/forgerock';
import useForgeRockJourney from '@/utility/hooks/useForgeRockJourney';
import { usePrevious } from '@/utility/hooks/usePrevious';
import { TextOutputCallback } from '@forgerock/javascript-sdk';

import { dataToGo, EmailAddressFormValues, EmailAddressParsedProps, ManageEmailAddressSteps } from './definitions';
import EmailOtp from './Steps/EmailOtp';
import ManageEmailAddress from './Steps/ManageEmailAddress';
import MobileOtp from './Steps/MobileOtp';

const analyticsField = {
  0: 'correlation id',
  1: 'mail',
  2: 'preferences/otp',
  3: 'preferences/otp',
  4: 'success',
};
const SECTION_NAME = 'Email Address';

const EmailAddress = ({ attributes, errorSuccessMap, site }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const { apiResponse, addToAPIResponse } = userStore();
  const { profileData: profileDataApi, loginInfo } = apiResponse || {};

  // AEM attributes props
  const emailAddressJson: EmailAddressParsedProps = JSON.parse(attributes);
  const questApiKey = localStorage?.getItem('apiKey') ?? emailAddressJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? emailAddressJson?.globalConfig?.baseApiUrl;
  const errorMap: AEMErrorMap = errorSuccessMap?.errorMap ?? [];
  const modalTitle = {
    0: 'correlation id',
    1: emailAddressJson?.emailAddressEditTitle,
    2: emailAddressJson?.communicationsConfig?.verifyMobileTitle,
    3: emailAddressJson?.communicationsConfig?.verifyEmailTitle,
    4: emailAddressJson.communicationsConfig?.thankYouTitle,
  };
  // Labels
  const { personalLabelText, workLabelText, loginLabelText } = emailAddressJson;

  // Hard-corded label
  const preferredLoginText = 'Preferred contact email';
  const preferredAuthLoginText = 'Used for authentication and as preferred contact';
  const preferredAuthText = 'Used for authentication';

  // forgerock journey api call using useForgerockJourneyHook

  //Forgerock config setup
  useEffect(() => {
    //@ts-ignore
    forgerockInitialConfig(emailAddressJson.globalConfig, SSP_CHANGE_EMAIL_TREE);
    setErrorAPI('Forgerock');
  }, []);

  const {
    hasSuccessfullyCompleted,
    header,
    isLoading,
    nextStep,
    resetJourney,
    step = null,
  } = useForgeRockJourney({ errorSuccessMap, tree: SSP_CHANGE_EMAIL_TREE });

  const [isQuestLoading, setIsQuestLoading] = useState(false);

  // API Request data handling state
  const [customerProfileData, setCustomerProfileData] = useState<CustomerProfile>();

  // Api error handling state
  const { setErrorMessage } = errorMessageStore();
  const [questDeleteOrPutApiError, setQuestDeleteOrPutApiError] = useState(false);
  const [isForgerockJourneyRequired, setIsForgerockJourneyRequired] = useState(false);
  const [isQuestUpdateRequired, setIsQuestUpdateRequired] = useState(false);

  // Analytics store and handling state
  const { setErrorAPI, setJourneyFlow, setModalTitle, setSectionType, setErrorField } = analyticsStore();
  const [localDigitalData, setLocalDigitalData] = useState({});

  // Display and Modal handling state
  const [isEditing, setIsEditing] = useState(false);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [currentStepNumber, setCurrentStepNumber] = useState<number>(ManageEmailAddressSteps['New-Email']);
  const [textOutputComponent, setTextOutputComponent] = useState<TextOutputCallback | null>(null);
  const prevHeader = usePrevious(header);

  const cachedValues = useRef<EmailAddressFormValues>();

  // Get customer profile function
  function getProfileDataFromApi() {
    addToAPIResponse(API_PROFILE_DATA, SET_LOADING_OBJ);

    return getCallAPI('customer-profile', `${baseApiUrl}`, `${questApiKey}`, errorSuccessMap).then((response) => {
      addToAPIResponse(API_PROFILE_DATA, response?.data);
    });
  }

  // Get customer login info
  useEffect(() => {
    if (baseApiUrl && questApiKey && !loginInfo) {
      addToAPIResponse(API_LOGIN_INFO, SET_LOADING_OBJ);

      loginFlow(baseApiUrl, questApiKey, errorSuccessMap, apiResponse, addToAPIResponse, true);
    }
  }, []);

  useEffect(() => {
    if (!profileDataApi) {
      getProfileDataFromApi();
      return;
    }
    if (profileDataApi) {
      setCustomerProfileData(profileDataApi);
    }
  }, [loginInfo, profileDataApi]);

  // Check for api data availability
  useEffect(() => {
    if (!customerProfileData || !loginInfo) {
      return;
    }
  }, [customerProfileData, loginInfo]);

  // Destructure api data value
  const dataFromApi: CustomerProfile['customerDomain'] = customerProfileData?.customerDomain;
  const findPersonalEmail = find(dataFromApi?.contactEmailAddress, { emailType: 'Personal' });
  const findWorkEmail = find(dataFromApi?.contactEmailAddress, { emailType: 'Work' });
  const findPreferredContactEmail = find(dataFromApi?.contactEmailAddress, { primaryEmail: true });

  // Set initial value (used for formik and view-only data)
  const initialLoginEmail = loginInfo?.email ?? '';
  const initialPersonalEmail = findPersonalEmail?.email ?? '';
  const initialWorkEmail = findWorkEmail?.email ?? '';
  const initialPreferredContactEmailAddress = findPreferredContactEmail?.email ?? '';
  const initialPreferredContact = findPreferredContactEmail?.emailType?.toLowerCase() ?? '';

  const handleQuestUpdates = (initialValues: EmailAddressFormValues, values: EmailAddressFormValues | undefined) => {
    // if work/personal email changed, send data to API
    const dataToSubmitToUpdateAPI: ContactEmailAddress[] = [];
    const dataToSubmitToDeleteAPI: ContactEmailAddress[] = [];

    if (
      !isEqual(initialValues?.personalEmail, values?.personalEmail) ||
      !isEqual(initialValues?.preferredContactEmail, values?.preferredContactEmail)
    ) {
      // either updating or deleting - 2 different APIs
      const apiToSendDataTo = values?.personalEmail ? dataToSubmitToUpdateAPI : dataToSubmitToDeleteAPI;

      apiToSendDataTo.push({
        // @ts-ignore
        email: values?.personalEmail?.trim() === '' ? initialValues?.personalEmail : values?.personalEmail,
        emailType: 'Personal',
        primaryEmail: values?.preferredContactEmail === 'personal',
      });
    }

    if (
      !isEqual(initialValues?.workEmail, values?.workEmail) ||
      !isEqual(initialValues?.preferredContactEmail, values?.preferredContactEmail)
    ) {
      // either updating or deleting - 2 different APIs
      const apiToSendDataTo = values?.workEmail ? dataToSubmitToUpdateAPI : dataToSubmitToDeleteAPI;

      apiToSendDataTo.push({
        // @ts-ignore
        email: values?.workEmail?.trim() === '' ? initialValues?.workEmail : values?.workEmail,
        emailType: 'Work',
        primaryEmail: values?.preferredContactEmail === 'work',
      });
    }

    const customErrorHandler = () => {
      setIsQuestLoading(false);
      setQuestDeleteOrPutApiError(true);
      if (isForgerockJourneyRequired) {
        setIsEditing(false);
        setShouldShowModal(true);
      }
    };
    const addMethod = { error: customErrorHandler };

    const sendData = (dataToSend): dataToGo => ({
      customerDomain: {
        contactEmail: dataToSend,
      },
    });

    if (dataToSubmitToUpdateAPI?.length || dataToSubmitToDeleteAPI?.length) {
      setIsQuestLoading(true);
    }

    // update operations
    if (dataToSubmitToUpdateAPI?.length) {
      postCallAPI(
        'update-customer',
        `${baseApiUrl}`,
        `${questApiKey}`,
        sendData(dataToSubmitToUpdateAPI),
        errorSuccessMap,
        'put',
        addMethod,
      ).then((response) => {
        if (response?.status === 204) {
          console.log('onner update');
          getProfileDataFromApi()
            .then(() => {
              // TODO - might have to be moved
              setIsQuestLoading(false);
              setIsEditing(false);
              setShouldShowModal(true);
            })
            .catch((error) => {
              setIsQuestLoading(false);
              setQuestDeleteOrPutApiError(true);
              console.error(`error: manage email address component failed to update contacts: ${error}`);
            });
        }
      });
    }

    // delete operations
    if (dataToSubmitToDeleteAPI?.length) {
      postCallAPI(
        'update-customer',
        `${baseApiUrl}`,
        `${questApiKey}`,
        sendData(dataToSubmitToDeleteAPI),
        errorSuccessMap,
        'delete',
        addMethod,
      )
        .then((response) => {
          if (response?.status === 204) {
            getProfileDataFromApi()
              .then(() => {
                setIsQuestLoading(false);
                setIsEditing(false);
                setShouldShowModal(true);
              })
              .catch((error) => {
                setIsQuestLoading(false);
                setQuestDeleteOrPutApiError(true);
                console.error(`error: manage email address component failed to delete contacts: ${error}`);
              });
          }
        })
        .catch((error) => {
          setQuestDeleteOrPutApiError(true);
          if (isForgerockJourneyRequired) {
            setIsEditing(false);
            setShouldShowModal(true);
          }
          console.error(`error: manage email address component failed to delete contacts: ${error}`);
        });
    }
  };

  // Form action: Handle submit
  const handleFormSubmit = (values: EmailAddressFormValues, { setSubmitting }) => {
    if (!isEqual(initialValues?.preferredContactEmail, values?.preferredContactEmail)) {
      // If preferred contact has changed, store the preferred contact details for analytics use case
      setLocalDigitalData((localDigitalData) => ({
        ...localDigitalData,
        preferredContactEmail: values?.preferredContactEmail,
      }));
    }

    if (
      !isEqual(initialValues?.useWorkEmailAsLogin, values?.useWorkEmailAsLogin) ||
      !isEqual(initialValues?.usePersonalEmailAsLogin, values?.usePersonalEmailAsLogin)
    ) {
      const usePersonalOrEmailAsLogin = values?.usePersonalEmailAsLogin ? 'Personal' : 'Work';
      // If useWorkEmailAsLogin or usePerSonalEmailAsLogin has changed, store the details for analytics use case
      setLocalDigitalData((localDigitalData) => ({
        ...localDigitalData,
        setLoginEmail: usePersonalOrEmailAsLogin,
      }));
    }

    // initiate C1 flow
    if (!isEqual(initialValues?.mail, values.mail)) {
      cachedValues.current = values;
      setIsForgerockJourneyRequired(true);
      setSubmitting(false);
      setErrorMessage(null);
      nextStep(step);
    }

    // if any of the Quest fields have changed, we need to update internal state
    if (
      !isEqual(initialValues?.personalEmail, values?.personalEmail) ||
      !isEqual(initialValues?.workEmail, values?.workEmail) ||
      !isEqual(initialValues?.useWorkEmailAsLogin, values?.useWorkEmailAsLogin) ||
      !isEqual(initialValues?.usePersonalEmailAsLogin, values?.usePersonalEmailAsLogin) ||
      !isEqual(initialValues?.preferredContactEmail, values?.preferredContactEmail)
    ) {
      setIsQuestUpdateRequired(true);
    }

    // initiate Quest flow
    if (isEqual(initialValues?.mail, values.mail)) {
      handleQuestUpdates(initialValues, values);
    }
  };

  // Form action: Handle on click cancel
  const handleOnClickCancel = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setErrorMessage(null);
  };

  // Form action for one time password: Handle on click cancel
  const handleOnClickOtpCancel = (e) => {
    e.preventDefault();
    setIsEditing(false);
    resetJourney(true);
    setErrorMessage(null);
  };

  // Function for render label and description on data list table
  const formatDataListItem = (title, emailAddress, useForDisplayLoginData = false) => {
    const isEmailAddressMatchesLoginEmail = isEqual(emailAddress, initialLoginEmail);
    const isLoginEmailMatchesPersonalOrWorkEmail =
      isEqual(initialPersonalEmail, initialLoginEmail) || isEqual(initialWorkEmail, initialLoginEmail);
    const isPrimaryEmailAddress = isEqual(emailAddress, initialPreferredContactEmailAddress);
    // If use for display login data it has to not match initialPersonalEmail or initialWorkEmail
    if (useForDisplayLoginData && isLoginEmailMatchesPersonalOrWorkEmail) {
      return;
    }

    const formattedTitle =
      isEmailAddressMatchesLoginEmail && !useForDisplayLoginData ? `${title} & ${loginLabelText}` : title;

    const formattedDisclaimerText = () => {
      if (isEmailAddressMatchesLoginEmail) {
        return isPrimaryEmailAddress ? preferredAuthLoginText : preferredAuthText;
      } else {
        return isPrimaryEmailAddress ? preferredLoginText : '';
      }
    };

    return {
      title: formattedTitle,
      value: emailAddress,
      disclaimer: formattedDisclaimerText(),
    };
  };

  // Execute function and spread data into a list of item
  const personalEmailAddressData = formatDataListItem(personalLabelText, initialPersonalEmail);
  const workEmailAddressData = formatDataListItem(workLabelText, initialWorkEmail);
  const loginEmailAddressData = formatDataListItem(loginLabelText, initialLoginEmail, true);
  const data = [{ ...personalEmailAddressData }, { ...workEmailAddressData }, { ...loginEmailAddressData }];

  // Check for data list value availability
  if (!data) {
    return;
  }

  useEffect(() => {
    if (isLoading || !step) {
      return;
    }
    const header: keyof typeof ManageEmailAddressSteps = step?.getHeader();

    if (!header) {
      return;
    }

    // cherry-pick out TextOutputCallback
    setTextOutputComponent(getFirstCallbackByType(step?.callbacks));

    // increment currentStep if header changes
    if (prevHeader !== header) {
      setCurrentStepNumber(ManageEmailAddressSteps?.[header] ?? 0);
    }
  }, [step]);

  useEffect(() => {
    if (hasSuccessfullyCompleted) {
      resetJourney(true);
      setIsEditing(false);
      setShouldShowModal(true);

      // C1 Login email update should trigger loginInfo API to reflect the changes
      loginFlow(`${baseApiUrl}`, `${questApiKey}`, errorSuccessMap, apiResponse, addToAPIResponse);
    }
    // we've done the C1 update, now let's try update Quest
    if (hasSuccessfullyCompleted && isQuestUpdateRequired) {
      handleQuestUpdates(initialValues, cachedValues?.current);
    }
  }, [hasSuccessfullyCompleted]);

  useEffect(() => {
    if (shouldShowModal && !isEmpty(localDigitalData)) {
      handleAnalyticsClick('updateSuccess', {
        updateSuccessSection: SECTION_NAME,
        ...(localDigitalData as Record<string, unknown>),
      });
      // clear store local digital data once analytics click has dispatch
      setLocalDigitalData({});
    }
  }, [shouldShowModal]);

  const initialValues = {
    mail: initialLoginEmail,
    personalEmail: initialPersonalEmail,
    workEmail: initialWorkEmail,
    preferredContactEmail: initialPreferredContact,
    usePersonalEmailAsLogin: initialPersonalEmail === initialLoginEmail,
    useWorkEmailAsLogin: initialWorkEmail === initialLoginEmail,
  };

  useEffect(() => {
    if (isEditing) {
      setErrorField(analyticsField[ManageEmailAddressSteps?.[header]]);
      setModalTitle(modalTitle[ManageEmailAddressSteps?.[header]]);
      setSectionType(SECTION_NAME);
    }
  }, [currentStepNumber, isEditing]);

  // Dispatch form interaction analytics click
  dispatchFormInteractionAnalyticsClick(currentStepNumber, modalTitle, SECTION_NAME);

  useEffect(() => {
    setJourneyFlow(isEditing ? 'Update email' : undefined);

    // re-set Quest error if true
    if (!isEditing && questDeleteOrPutApiError) {
      setTimeout(() => {
        setQuestDeleteOrPutApiError(false);
        resetJourney(true);
      }, QUEST_ERROR_MSG_DISPLAY_DURATION);
    }
  }, [isEditing]);

  return (
    <>
      <FormSection
        spacingSize="macro1"
        sectionWidth="halfwidth"
      >
        <HeadingWithButtonWrapper>
          <HeadingWithDivider>{emailAddressJson.emailAddressLabelText}</HeadingWithDivider>
          <ActionButton
            handleOnClick={() => {
              handleAnalyticsClick('updateClick', { updateSection: SECTION_NAME });
              setIsEditing(true);
            }}
            icon="edit"
          />
        </HeadingWithButtonWrapper>
        <DataList
          data={data}
          shouldHideEmptyValues={!!customerProfileData}
        />
      </FormSection>
      <EditableSectionContainer
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      >
        {/* Hidden values */}
        {currentStepNumber === ManageEmailAddressSteps['Hidden-Value-Collector'] && (
          <HiddenValueCollector
            errorMap={errorMap}
            handleFormSubmit={() => {
              nextStep(step);
            }}
            site={site}
            step={step}
          />
        )}

        {currentStepNumber === ManageEmailAddressSteps['New-Email'] && (
          <ManageEmailAddress
            cancelButtonText={emailAddressJson.cancelButtonText}
            emailAddressEditTitle={emailAddressJson.emailAddressEditTitle}
            errorComponent={textOutputComponent}
            errorMap={errorMap}
            handleFormSubmit={handleFormSubmit}
            handleOnClickCancel={handleOnClickCancel}
            hasQuestApiError={questDeleteOrPutApiError && !isForgerockJourneyRequired}
            initialValues={initialValues}
            introductoryText={emailAddressJson.introductoryText}
            loginEmailText={emailAddressJson.loginEmailText}
            loginLabelText={emailAddressJson.loginLabelText}
            nextStep={nextStep}
            personalLabelText={emailAddressJson.personalLabelText}
            preferredContactDescription={emailAddressJson.preferredContactDescription}
            preferredContactTitle={emailAddressJson.preferredContactTitle}
            saveButtonText={emailAddressJson.saveButtonText}
            site={site}
            step={step}
            workLabelText={emailAddressJson.workLabelText}
            isLoading={isLoading || isQuestLoading}
          />
        )}
        {[ManageEmailAddressSteps['Email-OTP'], ManageEmailAddressSteps['SMS-OTP']].includes(currentStepNumber) && (
          <>
            {/* Email OTP */}
            {currentStepNumber === ManageEmailAddressSteps['Email-OTP'] && (
              <EmailOtp
                communicationsConfig={emailAddressJson?.communicationsConfig}
                errorComponent={textOutputComponent}
                errorMap={errorMap}
                handleFormSubmit={() => nextStep(step)}
                handleOnClickCancel={handleOnClickOtpCancel}
                nextStep={nextStep}
                site={site}
                step={step}
                isLoading={isLoading}
              />
            )}
            {/* SMS OTP */}
            {currentStepNumber === ManageEmailAddressSteps['SMS-OTP'] && (
              <MobileOtp
                communicationsConfig={emailAddressJson?.communicationsConfig}
                errorComponent={textOutputComponent}
                errorMap={errorMap}
                handleFormSubmit={() => nextStep(step)}
                handleOnClickCancel={handleOnClickOtpCancel}
                nextStep={nextStep}
                site={site}
                step={step}
                isLoading={isLoading}
              />
            )}
          </>
        )}
      </EditableSectionContainer>
      <ModalOverlay
        description={emailAddressJson.communicationsConfig?.thankYouDescription ?? ''}
        hasQuestApiError={questDeleteOrPutApiError && isForgerockJourneyRequired}
        iconName={emailAddressJson.communicationsConfig?.thankYouIcon}
        setShouldShowModal={setShouldShowModal}
        setTimer={emailAddressJson.communicationsConfig?.thankYouOverlayTimer}
        shouldShowModalOverlay={shouldShowModal}
        heading={emailAddressJson.communicationsConfig?.thankYouTitle}
      />
    </>
  );
};

export default EmailAddress;
