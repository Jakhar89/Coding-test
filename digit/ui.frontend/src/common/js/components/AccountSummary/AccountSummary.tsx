import React, { useEffect, useRef, useState } from 'react';

import { userStore } from '@/context/User/User';
import { AEMProps } from '@/types/global/aem-definition';
import Slider from '@/utility/components/Slider/Slider';
import { SliderPlaceholder } from '@/utility/components/Slider/SliderPlaceholder';
import { loginFlow } from '@/utility/helpers/api';
import { API_LOGIN_INFO, SET_LOADING_OBJ } from '@/utility/helpers/constants';

import AccountSummaryCard from './AccountSummaryCard';
import { AccountSummaryProps } from './definitions';
import { CardContainer, CardGroup, GridContainer, GridItemContainer, GridRowContainer } from './StyledAccountSummary';

const AccountSummary = ({ attributes, errorSuccessMap }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }
  const AccountSummaryJson: AccountSummaryProps | any = JSON.parse(attributes);

  const { apiResponse, addToAPIResponse } = userStore();
  const { contractsData, loginInfo } = apiResponse;

  const questApiKey = localStorage?.getItem('apiKey') ?? AccountSummaryJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? AccountSummaryJson?.globalConfig?.baseApiUrl;

  let cardWidthConfig: any;

  useEffect(() => {
    if (!loginInfo && baseApiUrl && questApiKey) {
      addToAPIResponse(API_LOGIN_INFO, SET_LOADING_OBJ);
      loginFlow(baseApiUrl, questApiKey, errorSuccessMap, apiResponse, addToAPIResponse, true);
    }
  }, []);

  const AccountSummaryItems: any[] | undefined = contractsData?.contracts?.map((contract, index) => {
    // contract is to be passed to each component for api
    return (
      <CardGroup
        className="CG"
        key={index}
      >
        <GridContainer>
          <GridRowContainer>
            <GridItemContainer config={cardWidthConfig}>
              <CardContainer className="CC">
                <AccountSummaryCard
                  contract={contract}
                  accountSummaryJson={AccountSummaryJson}
                  errorSuccessMap={errorSuccessMap}
                  isMulti={contractsData?.contracts?.length && contractsData?.contracts?.length > 1 ? true : false}
                />
              </CardContainer>
            </GridItemContainer>
          </GridRowContainer>
        </GridContainer>
      </CardGroup>
    );
  });

  if (!AccountSummaryItems) return <SliderPlaceholder />;

  return <Slider slides={AccountSummaryItems} />;
};

export default AccountSummary;
