import React, { useEffect, useRef } from 'react';

import { userStore } from '@/context/User/User';
import { AEMProps } from '@/types/global/aem-definition';
import Dropdown from '@/utility/components/FormElement/Dropdown';
import FormSection from '@/utility/components/FormElement/FormSection';
import { loginFlow } from '@/utility/helpers/api';
import { API_LOGIN_INFO, API_RESTRICT_DATA, SET_LOADING_OBJ } from '@/utility/helpers/constants';
import { restrictAPI } from '@/utility/helpers/restrictAccess';

import { AccountSelectorParsedProps } from './definitions';
import { Label } from './StyledAccountSelector';

const AccountSelector = ({ attributes, errorSuccessMap, restricted }: AEMProps) => {
  const accountSelectorJson: AccountSelectorParsedProps = JSON.parse(attributes);

  const accountSelectorLabel = accountSelectorJson.accountSelectorLabel ?? 'Select account';

  const { apiResponse, addToAPIResponse, selectedContract, setSelectedContract } = userStore();
  const { contractsData, loginInfo } = apiResponse || {};

  const questApiKey = accountSelectorJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? accountSelectorJson?.globalConfig?.baseApiUrl;

  const targettedContract = (contractId) => {
    return contractsData?.contracts?.find((contract) => contract?.customerDomain?.contract?.contractId == contractId);
  };

  useEffect(() => {
    if (contractsData && !selectedContract) {
      const urlParams = new URLSearchParams(window.location.search);
      const queryContractId = urlParams.get('contract');

      const targetContract = queryContractId && targettedContract(queryContractId);

      if (targetContract) {
        setSelectedContract(targetContract);
      } else {
        // first contract is the default contract to be used
        setSelectedContract(contractsData?.contracts?.[0]);
      }
    }
  }, [contractsData]);

  // Get customer login info
  useEffect(() => {
    if (baseApiUrl && questApiKey && !loginInfo) {
      addToAPIResponse(API_LOGIN_INFO, SET_LOADING_OBJ);
      loginFlow(`${baseApiUrl}`, `${questApiKey}`, errorSuccessMap, apiResponse, addToAPIResponse, true);
    }
  }, []);

  const getContracts = () => {
    return contractsData?.contracts?.map((contract, index) => {
      const contractId = contract?.customerDomain?.contract?.contractId;
      const vehicleDescription = contract?.vehicleDomain?.vehicleSpecification?.vehicleDescription;

      const option = `${contractId} - ${vehicleDescription}`;

      return {
        label: option,
        onClick: () => setSelectedContract(contract),
        default: selectedContract ? contractId == selectedContract?.customerDomain?.contract?.contractId : index === 0,
      };
    });
  };

  if (!contractsData || contractsData?.loading) {
    return null;
  }

  return (
    <FormSection
      spacingSize="macro1"
      sectionWidth="halfwidth"
    >
      <Label>{accountSelectorLabel}</Label>
      {selectedContract && (
        <Dropdown
          name="dropdown"
          items={getContracts()}
          canSelectItem={true}
        ></Dropdown>
      )}
    </FormSection>
  );
};

export default AccountSelector;
