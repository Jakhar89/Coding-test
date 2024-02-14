import { find, isEmpty, isEqual } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

import { analyticsStore } from '@/context/Analytics/Analytics';
import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';
import { userStore } from '@/context/User/User';
import { AEMErrorMap, AEMProps } from '@/types/global/aem-definition';
import DataList from '@/utility/components/DataList';
import { DataListItem } from '@/utility/components/DataList/definitions';
import EditableSectionContainer from '@/utility/components/EditableSection/EditableSectionContainer';
import ActionButton from '@/utility/components/FormElement/ActionButton';
import HiddenValueCollector from '@/utility/components/FormElement/Forgerock/HiddenValueCollector';
import FormSection from '@/utility/components/FormElement/FormSection';
import { HeadingWithButtonWrapper, HeadingWithDivider } from '@/utility/components/FormElement/StyledFormSection';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';
import ModalOverlay from '@/utility/components/ModalOverlay';
import { dispatchFormInteractionAnalyticsClick, handleAnalyticsClick } from '@/utility/helpers/analytics';
import { getCallAPI, getRequestHeaders, loginFlow, postCallAPI } from '@/utility/helpers/api';
import { ContactTelephone, CustomerProfile } from '@/utility/helpers/api/CustomerProfileContext/definitions';
import { API_LOGIN_INFO, API_PROFILE_DATA, SET_LOADING_OBJ } from '@/utility/helpers/constants';
import { apiErrorRedirect } from '@/utility/helpers/error-handling';
import {
  checkAllInputsHidden,
  forgerockInitialConfig,
  getFirstCallbackByType,
  SSP_CHANGE_PHONE_NUMBER_TREE,
} from '@/utility/helpers/forgerock';
import { getAEMErrorMessageByCode, questApiErrorMessage } from '@/utility/helpers/validation';
import useForgeRockJourney from '@/utility/hooks/useForgeRockJourney';
import { usePrevious } from '@/utility/hooks/usePrevious';
import { TextOutputCallback } from '@forgerock/javascript-sdk';

import { dataToGo, ManagePhoneNumberSteps, PhoneNumberFormValues, PhoneNumberParsedProps } from './definitions';
import EmailOtp from './Steps/EmailOtp';
import ManagePhoneNumber from './Steps/ManagePhoneNumber';
import MobileOtp from './Steps/MobileOtp';

const SECTION_NAME = 'Phone Number';
const analyticsField = {
  0: 'correlation id',
  1: 'phone',
  2: 'preferences/otp',
  3: 'preferences/otp',
  4: 'success',
};

const PhoneNumber = ({ site, attributes, errorSuccessMap }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const { apiResponse, addToAPIResponse } = userStore();
  const { profileData: profileDataApi, loginInfo } = apiResponse || {};

  // AEM attributes props
  const phoneNumberJson: PhoneNumberParsedProps = JSON.parse(attributes);
  const questApiKey = localStorage?.getItem('apiKey') ?? phoneNumberJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? phoneNumberJson?.globalConfig?.baseApiUrl;
  const errorMap: AEMErrorMap = errorSuccessMap?.errorMap ?? [];
  const modalTitle = {
    0: 'correlation id',
    1: phoneNumberJson?.phoneNumberEditTitle,
    2: phoneNumberJson?.communicationsConfig?.verifyEmailTitle,
    3: phoneNumberJson?.communicationsConfig?.verifyMobileTitle,
    4: phoneNumberJson.communicationsConfig?.thankYouTitle,
  };
  // labels
  const {
    homeLabelText,
    mobileLabelText,
    otherLabelText,
    phoneNumberEditTitle,
    phoneNumberTitle,
    preferredContactDescription,
    preferredContactTitle,
    workLabelText,
    cancelButtonText,
    saveButtonText,
  } = phoneNumberJson;

  // Hard-corded label
  const preferredContactText = 'Preferred contact number';

  // forgerock journey api call using useForgerockJourneyHook

  //Forgerock config setup
  useEffect(() => {
    //@ts-ignore
    forgerockInitialConfig(phoneNumberJson.globalConfig, SSP_CHANGE_PHONE_NUMBER_TREE);
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
    tree: SSP_CHANGE_PHONE_NUMBER_TREE,
  });

  // API Request data handling state
  const [customerProfileData, setCustomerProfileData] = useState<CustomerProfile>();

  // Api error handling state
  const { errorMessage, setErrorMessage } = errorMessageStore();
  const [questDeleteOrPutApiError, setQuestDeleteOrPutApiError] = useState(false);
  const [isForgerockJourneyRequired, setIsForgerockJourneyRequired] = useState(false);
  const [isQuestUpdateRequired, setIsQuestUpdateRequired] = useState(false);

  // Analytics store and handling state
  const { setErrorField, setJourneyFlow, setModalTitle, setSectionType } = analyticsStore();
  const [localDigitalData, setLocalDigitalData] = useState({});

  // Display and Modal handling state
  const [isEditing, setIsEditing] = useState(false);
  const [isQuestLoading, setIsQuestLoading] = useState(false);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [currentStepNumber, setCurrentStepNumber] = useState<number>(ManagePhoneNumberSteps['New-Phone-Number']);
  const [textOutputComponent, setTextOutputComponent] = useState<TextOutputCallback | null>(null);
  const prevHeader = usePrevious(header);

  // Cacahed phone number form value for quest updates
  const cachedValues = useRef<PhoneNumberFormValues>();

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

      getCallAPI('login-info', baseApiUrl, questApiKey)
        .then((response) => {
          addToAPIResponse(API_LOGIN_INFO, response?.data);
        })
        .catch((error) => {
          console.error(`error: manage phone number component failed to get login info: ${error}`);
          apiErrorRedirect(`${errorSuccessMap?.errorPagePath}.html`);
        });
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
  const findHomeNumber = find(dataFromApi?.contactTelephone, { telephoneNumberType: 'Home' });
  const findWorkPhoneNumber = find(dataFromApi?.contactTelephone, { telephoneNumberType: 'Work' });
  const findOtherPhoneNumber = find(dataFromApi?.contactTelephone, { telephoneNumberType: 'Alternate' });
  const findPreferredContactPhoneNumber = find(dataFromApi?.contactTelephone, { primaryTelephoneNumber: true });

  // Set initial value (used for formik and view-only data)
  const initialMobileNumber = loginInfo?.phone_number ?? '';
  const initialHomeNumber = findHomeNumber?.telephoneNumber ?? '';
  const initialWorkNumber = findWorkPhoneNumber?.telephoneNumber ?? '';
  const initialOtherNumber = findOtherPhoneNumber?.telephoneNumber ?? '';
  const initialPreferredContactAsMobile =
    !!find(dataFromApi?.contactTelephone, { telephoneNumberType: 'Mobile', primaryTelephoneNumber: true }) ?? false;
  const initialPreferredContact = initialPreferredContactAsMobile
    ? 'telephoneNumber'
    : findPreferredContactPhoneNumber?.telephoneNumberType.toLowerCase();

  // Handle Quest updates
  const handleQuestUpdates = (values: PhoneNumberFormValues | undefined) => {
    if (!values) {
      return;
    }

    if (values?.preferredContact === 'other') {
      values = { ...values, preferredContact: 'alternate' };
    }

    const { home, other, preferredContact, work, telephoneNumber } = values;
    // if work/home/other phone number changed, send data to API
    const dataToSubmitToUpdateAPI: ContactTelephone[] = [];
    const dataToSubmitToDeleteAPI: ContactTelephone[] = [];

    if (!isEqual(initialHomeNumber, home) || !isEqual(initialPreferredContact, preferredContact)) {
      // either updating or deleting - 2 different APIs
      const apiToSendDataTo = home ? dataToSubmitToUpdateAPI : initialHomeNumber ? dataToSubmitToDeleteAPI : null;

      apiToSendDataTo &&
        apiToSendDataTo.push({
          // Introduce ts-ignore here as telephoneNumber should not undefined and initialHomeNumber are require to be sent as part of delete request
          // @ts-ignore
          telephoneNumber: home?.trim() === '' ? initialHomeNumber : home,
          telephoneNumberType: 'Home',
          primaryTelephoneNumber: preferredContact === 'home',
        });
    }

    if (!isEqual(initialWorkNumber, work) || !isEqual(initialPreferredContact, preferredContact)) {
      // either updating or deleting - 2 different APIs
      const apiToSendDataTo = work ? dataToSubmitToUpdateAPI : initialWorkNumber ? dataToSubmitToDeleteAPI : null;

      apiToSendDataTo &&
        apiToSendDataTo.push({
          // Introduce ts-ignore here as telephoneNumber should not undefined and initialWorkNumber are require to be sent as part of delete request
          // @ts-ignore
          telephoneNumber: work?.trim() === '' ? initialWorkNumber : work,
          telephoneNumberType: 'Work',
          primaryTelephoneNumber: preferredContact === 'work',
        });
    }

    if (!isEqual(initialOtherNumber, other) || !isEqual(initialPreferredContact, preferredContact)) {
      // either updating or deleting - 2 different APIs
      const apiToSendDataTo = other ? dataToSubmitToUpdateAPI : initialOtherNumber ? dataToSubmitToDeleteAPI : null;

      apiToSendDataTo &&
        apiToSendDataTo.push({
          // Introduce ts-ignore here as telephoneNumber should not undefined and initialOtherNumber are require to be sent as part of delete request
          // @ts-ignore
          telephoneNumber: other?.trim() === '' ? initialOtherNumber : other,
          telephoneNumberType: 'Alternate',
          primaryTelephoneNumber: preferredContact === 'alternate',
        });
    }

    if (!isEqual(initialPreferredContact, preferredContact)) {
      // Mobile is only for update preferred contact
      const apiToSendDataTo = dataToSubmitToUpdateAPI;

      apiToSendDataTo.push({
        // Introduce ts-ignore here as telephoneNumber should not undefined
        // @ts-ignore
        telephoneNumber,
        telephoneNumberType: 'Mobile',
        primaryTelephoneNumber: preferredContact === 'telephoneNumber',
      });
    }

    setIsQuestLoading(true);

    const customErrorHandler = () => {
      setIsQuestLoading(false);
      setQuestDeleteOrPutApiError(true);
      if (isForgerockJourneyRequired) {
        resetJourney(true);
        setIsEditing(false);
        setShouldShowModal(true);
      }
    };
    const addMethod = { error: customErrorHandler };

    const sendData = (dataToSend): dataToGo => ({
      customerDomain: {
        contactTelephone: dataToSend,
      },
    });

    // Send updated data to quest api
    if (dataToSubmitToUpdateAPI?.length) {
      // call UPDATE Quest api
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
          getProfileDataFromApi()
            .then(() => {
              setIsQuestLoading(false);
              setQuestDeleteOrPutApiError(false);
              setIsEditing(false);
              setShouldShowModal(true);
              if (isForgerockJourneyRequired) {
                resetJourney(true);
              }
            })
            .catch((error) => {
              setIsQuestLoading(false);
              console.error(`error: manage phone number component failed to update contacts: ${error}`);
            });
        }
      });
    }

    // Send delete data request to quest api
    if (dataToSubmitToDeleteAPI?.length) {
      // call DELETE Quest api
      postCallAPI(
        'update-customer',
        `${baseApiUrl}`,
        `${questApiKey}`,
        sendData(dataToSubmitToDeleteAPI),
        errorSuccessMap,
        'delete',
        addMethod,
      ).then((response) => {
        if (response?.status === 204) {
          getProfileDataFromApi()
            .then(() => {
              setIsQuestLoading(false);
              setQuestDeleteOrPutApiError(false);
              setIsEditing(false);
              setShouldShowModal(true);

              if (isForgerockJourneyRequired) {
                resetJourney(true);
              }
            })
            .catch((error) => {
              setIsQuestLoading(false);
              console.error(`error: manage phone number component failed to update contacts: ${error}`);
            });
        }
      });
    }
  };
  // Form action: Handle submit
  const handleFormSubmit = (values: PhoneNumberFormValues, { setSubmitting }) => {
    //prettier-ignore
    const {
      home,
      other,
      preferredContact,
      telephoneNumber,
      work,
     } = values;

    if (!isEqual(initialPreferredContact, preferredContact)) {
      setLocalDigitalData((localDigitalData) => ({
        // If preferred contact has changed, store the preferred contact details for analytics use case
        ...localDigitalData,
        preferredContactNumber: preferredContact,
      }));
    }

    if (telephoneNumber && !isEqual(initialMobileNumber, telephoneNumber)) {
      cachedValues.current = values;
      setIsForgerockJourneyRequired(true);
      setSubmitting(false);
      setErrorMessage(null);
      nextStep(step);
    } else {
      // Making sure that setIsForgerockJourneyRequired has switch off when user tried to change other than forgerock journey field
      setIsForgerockJourneyRequired(false);
    }

    // mock call to Quest API
    if (isEqual(initialMobileNumber, telephoneNumber)) {
      // only show thank you if something changed
      if (
        !isEqual(initialHomeNumber, home) ||
        !isEqual(initialWorkNumber, work) ||
        !isEqual(initialOtherNumber, other) ||
        !isEqual(initialPreferredContact, preferredContact)
      ) {
        setIsQuestUpdateRequired(true);
        handleQuestUpdates(values);
      }
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
  let data: DataListItem[] = [
    {
      title: phoneNumberJson.mobileLabelText,
      value: initialMobileNumber,
      disclaimer:
        initialPreferredContact === 'telephoneNumber'
          ? 'Used for authentication and as preferred contact'
          : 'Used for authentication',
    },
  ];

  if (initialHomeNumber) {
    const homeData = {
      title: phoneNumberJson.homeLabelText,
      value: initialHomeNumber,
      disclaimer: initialPreferredContact === 'home' ? preferredContactText : '',
    };
    data.push(homeData);
  }

  if (initialWorkNumber) {
    const workData = {
      title: phoneNumberJson.workLabelText,
      value: initialWorkNumber,
      disclaimer: initialPreferredContact === 'work' ? preferredContactText : '',
    };
    data.push(workData);
  }

  if (initialOtherNumber) {
    const otherData = {
      title: phoneNumberJson.otherLabelText,
      value: initialOtherNumber,
      disclaimer: initialPreferredContact === 'alternate' ? preferredContactText : '',
    };
    data.push(otherData);
  }

  if (!data) {
    return null;
  }

  useEffect(() => {
    if (isLoading || !step) {
      return;
    }
    const header: keyof typeof ManagePhoneNumberSteps = step?.getHeader();

    if (!header) {
      return;
    }

    // cherry-pick out TextOutputCallback
    setTextOutputComponent(getFirstCallbackByType(step?.callbacks));

    // determine if first step of journey where only hidden inputs returned from API
    if (checkAllInputsHidden(step?.callbacks, header)) {
      nextStep(step);
    }

    // increment currentStep if header changes
    if (prevHeader !== header) {
      setCurrentStepNumber(ManagePhoneNumberSteps?.[header] ?? 1);
    }
  }, [step]);

  useEffect(() => {
    if (hasSuccessfullyCompleted) {
      if (!isQuestUpdateRequired) {
        getProfileDataFromApi().then(() => {
          resetJourney(true);
          setIsEditing(false);
          setShouldShowModal(true);
        });
      }

      // C1 Login email update should trigger loginInfo API to reflect the changes
      loginFlow(`${baseApiUrl}`, `${questApiKey}`, errorSuccessMap, apiResponse, addToAPIResponse);

      // we've done the C1 update, now let's try update Quest
      if (isQuestUpdateRequired) {
        handleQuestUpdates(cachedValues?.current);
      }
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

  useEffect(() => {
    if (isEditing) {
      setErrorField(analyticsField[ManagePhoneNumberSteps?.[header]]);
      setSectionType(SECTION_NAME);
      setModalTitle(modalTitle[ManagePhoneNumberSteps?.[header]]);
    }
  }, [currentStepNumber, isEditing]);

  // Dispatch form interaction analytics click
  dispatchFormInteractionAnalyticsClick(currentStepNumber, modalTitle, SECTION_NAME);

  useEffect(() => {
    setJourneyFlow(isEditing ? 'Update phone' : undefined);
  }, [isEditing]);

  return (
    <>
      <FormSection
        spacingSize="macro1"
        sectionWidth="halfwidth"
      >
        <HeadingWithButtonWrapper>
          <HeadingWithDivider>{phoneNumberTitle}</HeadingWithDivider>
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
        {currentStepNumber === ManagePhoneNumberSteps['Hidden-Value-Collector'] && (
          <HiddenValueCollector
            errorMap={errorMap}
            handleFormSubmit={() => {
              nextStep(step);
            }}
            site={site}
            step={step}
          />
        )}
        {currentStepNumber === ManagePhoneNumberSteps['New-Phone-Number'] && (
          <ManagePhoneNumber
            cancelButtonText={cancelButtonText}
            errorComponent={textOutputComponent}
            errorMap={errorMap}
            handleFormSubmit={handleFormSubmit}
            handleOnClickCancel={handleOnClickCancel}
            hasQuestApiError={questDeleteOrPutApiError && !isForgerockJourneyRequired}
            homeLabelText={homeLabelText}
            initialHomeNumber={initialHomeNumber}
            initialMobileNumber={initialMobileNumber}
            initialOtherNumber={initialOtherNumber}
            initialPreferredContact={initialPreferredContact === 'alternate' ? 'other' : initialPreferredContact}
            initialPreferredContactAsMobile={initialPreferredContactAsMobile}
            initialWorkNumber={initialWorkNumber}
            mobileLabelText={mobileLabelText}
            nextStep={nextStep}
            otherLabelText={otherLabelText}
            phoneNumberEditTitle={phoneNumberEditTitle}
            preferredContactDescription={preferredContactDescription}
            preferredContactTitle={preferredContactTitle}
            saveButtonText={saveButtonText}
            site={site}
            step={step}
            workLabelText={workLabelText}
            isLoading={isLoading || isQuestLoading}
          />
        )}
        {[ManagePhoneNumberSteps['Email-OTP'], ManagePhoneNumberSteps['SMS-OTP']].includes(currentStepNumber) && (
          <>
            {/* Email OTP */}
            {currentStepNumber === ManagePhoneNumberSteps['Email-OTP'] && (
              <EmailOtp
                communicationsConfig={phoneNumberJson?.communicationsConfig}
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
            {currentStepNumber === ManagePhoneNumberSteps['SMS-OTP'] && (
              <MobileOtp
                communicationsConfig={phoneNumberJson?.communicationsConfig}
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

        {errorMessage && <InPageAnnouncement text={getAEMErrorMessageByCode(errorMessage, errorMap)} />}
      </EditableSectionContainer>
      {/* THANK YOU MODAL OVERLAY*/}
      <ModalOverlay
        description={phoneNumberJson.communicationsConfig?.thankYouDescription ?? ''}
        hasQuestApiError={questDeleteOrPutApiError}
        heading={phoneNumberJson.communicationsConfig?.thankYouTitle}
        iconName={phoneNumberJson.communicationsConfig?.thankYouIcon}
        setShouldShowModal={setShouldShowModal}
        setTimer={phoneNumberJson.communicationsConfig?.thankYouOverlayTimer}
        shouldShowModalOverlay={shouldShowModal}
      />
    </>
  );
};

export default PhoneNumber;
