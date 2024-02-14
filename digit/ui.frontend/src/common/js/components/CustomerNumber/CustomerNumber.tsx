import React, { useEffect, useRef, useState } from 'react';

import { userStore } from '@/context/User/User';
import { AEMProps } from '@/types/global/aem-definition';
import DataList from '@/utility/components/DataList';
import FormSection from '@/utility/components/FormElement/FormSection';
import { HeadingWithDivider } from '@/utility/components/FormElement/StyledFormSection';
import { getCallAPI, loginFlow } from '@/utility/helpers/api';
import { CustomerProfile } from '@/utility/helpers/api/CustomerProfileContext/definitions';
import { API_LOGIN_INFO, API_PROFILE_DATA, SET_LOADING_OBJ } from '@/utility/helpers/constants';

import { CustomerNumberParsedProps } from './definitions';

const CustomerNumber = ({ attributes, errorSuccessMap }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const { apiResponse, addToAPIResponse } = userStore();
  const { profileData: profileDataApi, loginInfo } = apiResponse || {};

  // AEM attributes props
  const customerNumberJson: CustomerNumberParsedProps = JSON.parse(attributes);
  const questApiKey = customerNumberJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? customerNumberJson?.globalConfig?.baseApiUrl;

  // API Request data handling state
  const [customerProfileData, setCustomerProfileData] = useState<CustomerProfile>();

  // Get customer profile function
  function getProfileDataFromApi() {
    addToAPIResponse(API_PROFILE_DATA, SET_LOADING_OBJ);

    getCallAPI('customer-profile', `${baseApiUrl}`, `${questApiKey}`, errorSuccessMap).then((response) => {
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

  const dataFromApi: CustomerProfile['customerDomain'] = customerProfileData?.customerDomain;

  const data = [
    {
      title: customerNumberJson.customerNumber,
      value: dataFromApi?.customer?.customerId ?? '',
    },
  ];

  return (
    <FormSection
      spacingSize="macro1"
      sectionWidth="halfwidth"
    >
      <HeadingWithDivider>{customerNumberJson.customerNumberTitle}</HeadingWithDivider>
      <DataList
        data={data}
        shouldHideEmptyValues={!!customerProfileData}
      />
    </FormSection>
  );
};

export default CustomerNumber;
