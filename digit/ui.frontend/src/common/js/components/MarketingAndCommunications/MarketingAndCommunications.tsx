import { Form, Formik } from 'formik';
import { isEmpty, isEqual } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

import { analyticsStore } from '@/context/Analytics/Analytics';
import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';
import { userStore } from '@/context/User/User';
import { AEMProps } from '@/types/global/aem-definition';
import EditableSectionActions from '@/utility/components/EditableSection/EditableSectionActions';
import EditableSectionContainer from '@/utility/components/EditableSection/EditableSectionContainer';
import ActionButton from '@/utility/components/FormElement/ActionButton';
import FormSection from '@/utility/components/FormElement/FormSection';
import Radio from '@/utility/components/FormElement/Radio';
import {
  ContentLabel,
  HeadingWithButtonWrapper,
  HeadingWithDivider,
  RadioSection,
} from '@/utility/components/FormElement/StyledFormSection';
import ModalOverlay from '@/utility/components/ModalOverlay';
import RichText from '@/utility/components/RichText';
import { handleAnalyticsClick, handleClientValidationErrors } from '@/utility/helpers/analytics';
import { getCallAPI, loginFlow, postCallAPI } from '@/utility/helpers/api';
import { API_LOGIN_INFO, API_PROFILE_DATA, SET_LOADING_OBJ } from '@/utility/helpers/constants';
import { convertYesNotoYN } from '@/utility/helpers/string';

import { MarketingAndCommunicationsParsedProps, MarketingAndCommunicationsValues } from './definitions';
import MarketingAndCommunicationsEditMode from './MarketingAndCommunicationsEditMode';
import validationSchema from './validationSchema';

const SECTION_NAME = 'Marketing and Communications';

export const Yes = 'Yes';
export const No = 'No';

export const preferredCorrespondenceTransform = {
  Mail: 'Letter',
  Email: 'Email',
  Letter: 'Mail',
};

const MarketingAndCommunications = ({ attributes, errorSuccessMap }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }
  const { apiResponse, addToAPIResponse } = userStore();
  const { profileData: profileDataApi, loginInfo } = apiResponse || {};

  const marketingCommunicationsJson: MarketingAndCommunicationsParsedProps = JSON.parse(attributes);

  const { journeyFlow, modalTitle, setJourneyFlow, setModalTitle, setSectionType } = analyticsStore();
  const { setErrorMessage } = errorMessageStore();
  const [hasError, setHasError] = useState<boolean>(false);

  const [profileData, setProfileData] = useState<MarketingAndCommunicationsValues>({
    customerCorrespondencePreference: '-',
    customerMarketingPreference: '-',
  });

  //@ts-ignore
  const questApiKey = localStorage?.getItem('apiKey') ?? marketingCommunicationsJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? marketingCommunicationsJson?.globalConfig?.baseApiUrl;

  function getProfileDataFromApi() {
    addToAPIResponse(API_PROFILE_DATA, SET_LOADING_OBJ);
    return getCallAPI('customer-profile', `${baseApiUrl}`, `${questApiKey}`, errorSuccessMap).then((response) => {
      addToAPIResponse(API_PROFILE_DATA, response?.data);
    });
  }

  // transform profile data
  function translateAndPopulateProfileData(data) {
    const transformedDataFromAPI = {
      customerMarketingPreference: convertYesNotoYN(data?.customerMarketingPreference, 'fromAPI') ?? '',
      customerCorrespondencePreference: preferredCorrespondenceTransform[data?.customerCorrespondencePreference] ?? '',
    };
    setProfileData(transformedDataFromAPI);
  }

  useEffect(() => {
    // Request login info api only if its not in User Context
    if (baseApiUrl && questApiKey && !loginInfo) {
      addToAPIResponse(API_LOGIN_INFO, SET_LOADING_OBJ);
      // get customer login info
      loginFlow(baseApiUrl, questApiKey, errorSuccessMap, apiResponse, addToAPIResponse, true);
    }
  }, []);

  useEffect(() => {
    if (!profileDataApi) {
      getProfileDataFromApi();
      return;
    }

    const dataCustomerConsent = profileDataApi?.customerDomain?.customerConsent;
    if (dataCustomerConsent) {
      translateAndPopulateProfileData(dataCustomerConsent);
    }
  }, [loginInfo, profileDataApi]);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [localDigitalData, setLocalDigitalData] = useState({});

  const marketingPreferenceRadio = {
    name: 'customerMarketingPreference',
    items: [
      {
        id: 'customerMarketingYes',
        label: marketingCommunicationsJson.marketingPreferenceYes,
        isChecked: profileData?.customerMarketingPreference === Yes,
        isDisabled: !(profileData?.customerMarketingPreference === Yes),
      },
      {
        id: 'customerMarketingNo',
        label: marketingCommunicationsJson.marketingPreferenceNo,
        isChecked: profileData?.customerMarketingPreference === No,
        isDisabled: !(profileData?.customerMarketingPreference === No),
      },
    ],
  };

  const correspondenceMethodRadio = {
    name: 'customerCorrespondencePreference',
    items: [
      {
        id: 'customerCorrespondenceEmail',
        label: marketingCommunicationsJson.correspondenceMethodEmail,
        isChecked: profileData?.customerCorrespondencePreference === 'Email',
        isDisabled: !(profileData?.customerCorrespondencePreference === 'Email'),
      },
      {
        id: 'customerCorrespondenceMail',
        label: marketingCommunicationsJson.correspondenceMethodPaper,
        isChecked: profileData?.customerCorrespondencePreference === 'Mail',
        isDisabled: !(profileData?.customerCorrespondencePreference === 'Mail'),
      },
    ],
  };

  const handleFormSubmit = async (values: MarketingAndCommunicationsValues, { setSubmitting }) => {
    setIsLoading(true);

    //prettier-ignore
    const {
      customerCorrespondencePreference,
      customerMarketingPreference,
    } = values;

    if (!isEqual(profileData?.customerMarketingPreference, customerMarketingPreference)) {
      setLocalDigitalData((localDigitalData) => ({
        ...localDigitalData,
        marketingCommunicationsPreference: customerMarketingPreference,
      }));
    }

    if (!isEqual(profileData?.customerCorrespondencePreference, customerCorrespondencePreference)) {
      setLocalDigitalData((localDigitalData) => ({
        ...localDigitalData,
        methodOfCorrespondenceSelected: customerCorrespondencePreference,
      }));
    }

    if (!isEqual(profileData, values)) {
      handleAnalyticsClick('saveChanges', {
        saveSection: SECTION_NAME,
        modalTitle: marketingCommunicationsJson?.marketingAndCommunicationsTitle,
      });
    }

    const dataToSendToAPI = {
      customerDomain: {
        customerConsent: {
          customerCorrespondencePreference: preferredCorrespondenceTransform?.[customerCorrespondencePreference],
          customerMarketingPreference: convertYesNotoYN(customerMarketingPreference, 'toAPI'),
        },
      },
    };

    //update call
    postCallAPI(
      'marketing-communications',
      `${baseApiUrl}`,
      `${questApiKey}`,
      dataToSendToAPI,
      errorSuccessMap,
      'put',
    ).then((response) => {
      if (response?.status === 204) {
        getProfileDataFromApi()
          .then(() => {
            setIsEditing(false);
            setShouldShowModal(true);
          })
          .catch(() => setHasError(true));
      }
      setIsLoading(false);
    });
  };

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
    setJourneyFlow(isEditing ? 'Update Marketing and Communications' : undefined);

    if (isEditing) {
      setModalTitle(marketingCommunicationsJson?.marketingAndCommunicationsTitle);
      setSectionType(SECTION_NAME);
    }
  }, [isEditing]);

  return (
    <>
      <FormSection
        spacingSize="macro1"
        sectionWidth="halfwidth"
      >
        <>
          <HeadingWithButtonWrapper>
            <HeadingWithDivider>{marketingCommunicationsJson?.marketingAndCommunicationsTitle}</HeadingWithDivider>
            <ActionButton
              handleOnClick={() => {
                handleAnalyticsClick('updateClick', { updateSection: SECTION_NAME });
                setIsEditing(true);
              }}
              icon="edit"
            />
          </HeadingWithButtonWrapper>
          <ContentLabel>
            <RichText>{marketingCommunicationsJson?.marketingPreferenceDescription}</RichText>
          </ContentLabel>
          {/* @ts-ignore */}
          <Formik initialValues={{}}>
            <Form>
              <RadioSection>
                <Radio {...marketingPreferenceRadio} />
              </RadioSection>
              <ContentLabel>
                <RichText>{marketingCommunicationsJson?.correspondenceMethodDescription}</RichText>
              </ContentLabel>
              <RadioSection>
                <Radio {...correspondenceMethodRadio} />
              </RadioSection>
            </Form>
          </Formik>
        </>
      </FormSection>

      <EditableSectionContainer
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      >
        <Formik
          enableReinitialize={true}
          initialValues={profileData}
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
          validateOnBlur={true}
          validateOnChange={false}
          validateOnMount={false}
        >
          {({ errors }) => (
            <Form>
              <MarketingAndCommunicationsEditMode
                correspondenceMethodDescription={marketingCommunicationsJson.correspondenceMethodDescription}
                correspondenceMethodEmail={marketingCommunicationsJson.correspondenceMethodEmail}
                correspondenceMethodPaper={marketingCommunicationsJson.correspondenceMethodPaper}
                hasError={hasError}
                marketingPreferenceDescription={marketingCommunicationsJson.marketingPreferenceDescription}
                marketingPreferenceNo={marketingCommunicationsJson.marketingPreferenceNo}
                marketingPreferenceYes={marketingCommunicationsJson.marketingPreferenceYes}
                marketingAndCommunicationsEditTitle={marketingCommunicationsJson.marketingAndCommunicationsEditTitle}
                marketingCommunicationsErrorDescription={
                  marketingCommunicationsJson.marketingCommunicationsErrorDescription
                }
                marketingCommunicationsErrorTitle={marketingCommunicationsJson.marketingCommunicationsErrorTitle}
              />
              <EditableSectionActions
                cancelLabel={marketingCommunicationsJson.cancelButtonText}
                saveLabel={marketingCommunicationsJson.saveButtonText}
                handleOnClickCancel={() => {
                  setIsEditing(false);
                  setShouldShowModal(false);
                }}
                handleOnClickSave={() => {
                  handleClientValidationErrors({ errors, journeyFlow, modalTitle });
                  setErrorMessage(null);
                }}
                isLoading={isLoading}
              />
            </Form>
          )}
        </Formik>
      </EditableSectionContainer>
      <ModalOverlay
        description={marketingCommunicationsJson.communicationsConfig?.thankYouDescription ?? ''}
        iconName={marketingCommunicationsJson.communicationsConfig?.thankYouIcon}
        setShouldShowModal={setShouldShowModal}
        setTimer={marketingCommunicationsJson.communicationsConfig?.thankYouOverlayTimer}
        shouldShowModalOverlay={shouldShowModal}
        heading={marketingCommunicationsJson.communicationsConfig?.thankYouTitle}
      />
    </>
  );
};

export default MarketingAndCommunications;
