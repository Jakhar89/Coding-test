import { isEqual, mapKeys, omit } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';
import { userStore } from '@/context/User/User';
import { AEMProps } from '@/types/global/aem-definition';
import FormSection from '@/utility/components/FormElement/FormSection';
import ModalOverlay from '@/utility/components/ModalOverlay';
import { getCallAPI, loginFlow, postCallAPI } from '@/utility/helpers/api';
import { CustomerProfile } from '@/utility/helpers/api/CustomerProfileContext/definitions';
import { API_PROFILE_DATA, SET_LOADING_OBJ } from '@/utility/helpers/constants';

import { apiStore } from '../../context/API/Api';
import { AddressDetailsFormValues, AddressDetailsParsedProps } from './definitions';
import MailingAddress from './MailingAddress/MailingAddress';
import ResidentialAddress from './ResidentialAddress/ResidentialAddress';

export const RESIDENTIAL_ADDRESS_SECTION_NAME = 'Residential Address';
export const MAILING_ADDRESS_SECTION_NAME = 'Mailing Address';

const AddressDetails = ({ attributes, errorSuccessMap }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const { apiResponse, addToAPIResponse } = userStore();
  const { profileData: profileDataApi, loginInfo } = apiResponse || {};

  const addressDetailsJson: AddressDetailsParsedProps = JSON.parse(attributes);

  const questApiKey = localStorage?.getItem('apiKey') ?? addressDetailsJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? addressDetailsJson?.globalConfig?.baseApiUrl;

  const { setApiKey } = apiStore();

  // API Request data handling state
  const [customerProfileData, setCustomerProfileData] = useState<CustomerProfile>();

  // Api error handling state
  const { errorMessage, setErrorMessage } = errorMessageStore();
  const [questDeleteOrPutApiError, setQuestDeleteOrPutApiError] = useState(false);

  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get customer profile function
  function getProfileDataFromApi() {
    addToAPIResponse(API_PROFILE_DATA, SET_LOADING_OBJ);
    return getCallAPI('customer-profile', `${baseApiUrl}`, `${questApiKey}`, errorSuccessMap).then((response) => {
      addToAPIResponse(API_PROFILE_DATA, response?.data);
    });
  }

  // Get customer login info
  useEffect(() => {
    if (!loginInfo && baseApiUrl && questApiKey) {
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
    if (!customerProfileData) {
      return;
    }
  }, [customerProfileData]);

  const dataFromApi: CustomerProfile['customerDomain'] = customerProfileData?.customerDomain;

  const residentialData = dataFromApi?.addressDetail?.find((data) => data?.addressPurposeType === 'Residential');
  const mailingData = dataFromApi?.addressDetail?.find((data) => data?.addressPurposeType === 'Mailing');

  const prefixedMailingData = mapKeys(mailingData, (value, key) => `mailing-${key}`);
  const prefixedResidentialData = mapKeys(residentialData, (value, key) => `residential-${key}`);

  const isResidentialMailingAddressSame: boolean = isEqual(
    omit(residentialData, 'addressPurposeType'),
    omit(mailingData, 'addressPurposeType'),
  );

  const initialData = {
    copyAddressTo: isResidentialMailingAddressSame,
    isPoBox: !mailingData?.streetType,
    ...{ ...prefixedMailingData, ...prefixedResidentialData },
    ...{
      'residential-country': 'Australia',
      'residential-countryCode': 'AU',
      'residential-api-address': '',
      // 'residential-fullAddress': '',
      'residential-sA1SevenDigitCode': '',
      'mailing-country': 'Australia',
      'mailing-countryCode': 'AU',
      'mailing-api-address': '',
      // 'mailing-fullAddress': '',
      'mailing-sA1SevenDigitCode': '',
    },
  };

  const data = [
    {
      title: addressDetailsJson.resAddressLine1,
      value: residentialData?.addressLine1 ?? '',
    },
    {
      title: addressDetailsJson.resAddressLine2,
      value: residentialData?.addressLine2 ?? '',
    },
    {
      title: addressDetailsJson.resCitySuburb,
      value: residentialData?.citySuburb ?? '',
    },
    {
      title: addressDetailsJson.resStateTerritory,
      value: residentialData?.stateProvince ?? '',
    },
    {
      title: addressDetailsJson.resPostZipCode,
      value: residentialData?.postZipCode ?? '',
    },
    {
      title: addressDetailsJson.resCountry,
      value: residentialData?.country ?? 'Australia',
    },
  ];

  const data2 = [
    {
      title: addressDetailsJson.resAddressLine1,
      value: mailingData?.addressLine1 ?? '',
    },
    {
      title: addressDetailsJson.resAddressLine2,
      value: mailingData?.addressLine2 ?? '',
    },
    {
      title: addressDetailsJson.resCitySuburb,
      value: mailingData?.citySuburb ?? '',
    },
    {
      title: addressDetailsJson.resStateTerritory,
      value: mailingData?.stateProvince ?? '',
    },
    {
      title: addressDetailsJson.resPostZipCode,
      value: mailingData?.postZipCode ?? '',
    },
    {
      title: addressDetailsJson.resCountry,
      value: mailingData?.country ?? 'Australia',
    },
  ];

  if (!data) {
    return null;
  }

  const isMailingAddressEmpty = Object.values(data2).every((item) => item.value.trim() === '');

  useEffect(() => {
    if (questApiKey) {
      setApiKey(questApiKey);
    }
  }, []);

  const cleanAddress = (address: string) => {
    if (!address) {
      return;
    }

    // Remove consecutive spaces new lines etc
    return address?.replace(/\s\s+/g, ' ')?.trim();
  };

  const formatAddress = (values: any, type: 'residential' | 'mailing', addressLine1?: string) => {
    let addressArr: string[] = [];

    switch (type) {
      case 'residential':
        addressArr = [
          addressLine1,
          values?.['residential-citySuburb'],
          values?.['residential-stateProvince'],
          values?.['residential-countryCode'],
          values?.['residential-postZipCode'],
        ];
        break;
      case 'mailing':
        addressArr = [
          addressLine1,
          values?.['mailing-citySuburb'],
          values?.['mailing-stateProvince'],
          values?.['mailing-countryCode'],
          values?.['mailing-postZipCode'],
        ];
        break;
      default:
        return;
    }

    return cleanAddress(addressArr?.join(' '));
  };

  const handleFormSubmit = (values: AddressDetailsFormValues) => {
    if (!values) {
      return;
    }

    setIsLoading(true);

    console.log(values);

    const residentialAddressLine1 = cleanAddress(
      [
        values?.['residential-propertyName'],
        values?.['residential-unitNumber'],
        values?.['residential-streetNumber'],
        values?.['residential-streetName'],
        values?.['residential-streetType'],
      ].join(' '),
    );

    const residentialFullAddress = values?.['residential-useNonStandardAddress']
      ? cleanAddress(values?.['residential-fullAddress'])
      : formatAddress(values, 'residential', residentialAddressLine1);

    const addressDetail = [
      {
        propertyName: values?.['residential-propertyName'],
        unitNumber: values?.['residential-unitNumber'],
        streetNumber: values?.['residential-streetNumber'],
        streetName: values?.['residential-streetName'],
        streetType: values?.['residential-streetType'],
        addressLine1: residentialAddressLine1,
        addressLine2: '',
        addressLine3: '',
        citySuburb: values?.['residential-citySuburb'],
        stateProvince: values?.['residential-stateProvince'],
        postZipCode: values?.['residential-postZipCode'],
        countryCode: values?.['residential-countryCode'] || 'AU',
        fullAddress: residentialFullAddress,
        addressPurposeType: 'Residential',
        copyAddressTo: values?.copyAddressTo,
        sA1SevenDigitCode: values?.['residential-useNonStandardAddress']
          ? values?.['residential-sA1SevenDigitCode']
          : '', // Source from sensis data, blank for manual
        useNonStandardAddress: values?.['residential-useNonStandardAddress'],
      },
    ];

    if (!values?.copyAddressTo) {
      const mailingAddressLine1 = values?.isPoBox
        ? values?.['mailing-addressLine1']
        : cleanAddress(
            [
              values?.['mailing-propertyName'],
              values?.['mailing-unitNumber'],
              values?.['mailing-streetNumber'],
              values?.['mailing-streetName'],
              values?.['mailing-streetType'],
            ].join(' '),
          );

      const mailingFullAddress = values?.['mailing-useNonStandardAddress']
        ? cleanAddress(values?.['mailing-fullAddress'])
        : formatAddress(values, 'mailing', mailingAddressLine1);

      // if PO box is selected, remove all street details
      const mailingAddressDetail = {
        propertyName: values?.isPoBox ? '' : values?.['mailing-propertyName'],
        unitNumber: values?.isPoBox ? '' : values?.['mailing-unitNumber'],
        streetNumber: values?.isPoBox ? '' : values?.['mailing-streetNumber'],
        streetName: values?.isPoBox ? '' : values?.['mailing-streetName'],
        streetType: values?.isPoBox ? '' : values?.['mailing-streetType'],
        addressLine1: mailingAddressLine1,
        addressLine2: '',
        addressLine3: '',
        citySuburb: values?.['mailing-citySuburb'],
        stateProvince: values?.['mailing-stateProvince'],
        postZipCode: values?.['mailing-postZipCode'],
        countryCode: values?.['mailing-countryCode'] || 'AU',
        fullAddress: mailingFullAddress,
        addressPurposeType: 'Mailing',
        copyAddressTo: values?.copyAddressTo,
        sA1SevenDigitCode: values?.['mailing-useNonStandardAddress'] ? values?.['mailing-sA1SevenDigitCode'] : '', // Source from sensis data, blank for manual
        useNonStandardAddress: values?.['mailing-useNonStandardAddress'],
      };

      addressDetail.push(mailingAddressDetail);
    }

    const customErrorHandler = () => {
      setIsLoading(false);
      setQuestDeleteOrPutApiError(true);
    };
    const addMethod = { error: customErrorHandler, redirect: false };

    const payload = {
      customerDomain: {
        addressDetail,
      },
    };

    //update call
    postCallAPI('update-address', `${baseApiUrl}`, `${questApiKey}`, payload, errorSuccessMap, 'put', addMethod).then(
      (response) => {
        if (response?.status === 204) {
          getProfileDataFromApi().then(() => {
            setQuestDeleteOrPutApiError(false);
            setIsEditing(false);
            setIsLoading(false);
            setShouldShowModal(true);
          });
        }
      },
    );
  };

  return (
    <>
      <FormSection
        spacingSize="macro1"
        sectionWidth="halfwidth"
      >
        <ResidentialAddress
          addressDetailsJson={addressDetailsJson}
          data={data}
          errorPagePath={errorSuccessMap?.errorPagePath}
          handleFormSubmit={handleFormSubmit}
          initialData={initialData}
          isEditing={isEditing}
          isLoading={isLoading}
          isResidentialMailingAddressSame={isResidentialMailingAddressSame}
          setIsEditing={setIsEditing}
          setIsLoading={setIsLoading}
          hasQuestApiError={questDeleteOrPutApiError}
          setQuestDeleteOrPutApiError={setQuestDeleteOrPutApiError}
        />
        <>
          {!isResidentialMailingAddressSame && dataFromApi && !isMailingAddressEmpty && (
            <MailingAddress
              addressDetailsJson={addressDetailsJson}
              data={data2}
              errorPagePath={errorSuccessMap?.errorPagePath}
              handleFormSubmit={handleFormSubmit}
              initialData={initialData}
              isEditing={isEditing}
              isLoading={!!customerProfileData}
              isApiLoading={isLoading}
              isResidentialMailingAddressSame={isResidentialMailingAddressSame}
              setIsEditing={setIsEditing}
            />
          )}

          <ModalOverlay
            description={'Your details have been updated'}
            hasQuestApiError={questDeleteOrPutApiError}
            setShouldShowModal={setShouldShowModal}
            shouldShowModalOverlay={shouldShowModal}
            heading={'Thank you!'}
          />
        </>
      </FormSection>
    </>
  );
};

export default AddressDetails;
