import React, { useEffect, useState } from 'react';

import { userStore } from '@/context/User/User';
import { contractData, postCallAPI } from '@/utility/helpers/api';
import { SET_LOADING_OBJ } from '@/utility/helpers/constants';
import { formatDate } from '@/utility/helpers/dateTime';
import { currencyFormatter } from '@/utility/helpers/string';

import {
  CardTitle,
  InnerContainer,
  LoanProgressContainer,
  NextAmount,
  NextDate,
  NextRepay,
  NextRepayData,
  RegoPlate,
} from './StyledAccountSummary';

const LeftContainer = ({ accountSummaryJson, errorSuccessMap, contract, children }) => {
  const {
    dashboardRepaymentAPIData,
    setDashboardRepaymentAPIData,
    dashboardVehicleDetailsAPIData,
    setDashboardVehicleDetailsAPIData,
  } = userStore();

  const contractID: string = contract?.customerDomain?.contract?.contractId ?? '';
  const repayDetails = dashboardRepaymentAPIData?.[contractID];
  const vehicleDetails = dashboardVehicleDetailsAPIData?.[contractID];

  const questApiKey = localStorage?.getItem('apiKey') ?? accountSummaryJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? accountSummaryJson?.globalConfig?.baseApiUrl;

  const getRepaymentsData = (contractId: string) => {
    const postData = contractData(contractId);
    postCallAPI('repayment', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((response) => {
      if (response?.data) {
        setDashboardRepaymentAPIData(contractId, response?.data);
      }
    });
  };

  const getVehicleDetailsData = (contractId: string) => {
    const postData = contractData(contractId);
    postCallAPI('vehicle-details', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((response) => {
      if (response?.data) {
        setDashboardVehicleDetailsAPIData(contractId, response?.data?.assets[0]?.vehicleDomain);
      }
    });
  };

  useEffect(() => {
    if (contract) {
      const contractID: string = contract?.customerDomain?.contract?.contractId ?? '';

      if (!dashboardRepaymentAPIData?.[contractID]) {
        setDashboardRepaymentAPIData(contractID, SET_LOADING_OBJ);
        getRepaymentsData(contractID);
      }

      if (!dashboardVehicleDetailsAPIData?.[contractID]) {
        setDashboardVehicleDetailsAPIData(contractID, SET_LOADING_OBJ);
        getVehicleDetailsData(contractID);
      }
    } else {
      return;
    }
  }, [contract]);

  const nextRepaymentDate = (dateString) => {
    return !isNaN(Date.parse(dateString)) ? formatDate(new Date(dateString)) : '';
  };

  return (
    <InnerContainer size={[50, 55]}>
      {vehicleDetails && !vehicleDetails?.loading && (
        <>
          <CardTitle divider>
            {`${vehicleDetails?.vehicleSpecification?.vehicleYear} `}
            {`${vehicleDetails?.vehicleSpecification?.vehicleModel} `}
            {`${vehicleDetails?.vehicleSpecification?.vehicleMake}`}
          </CardTitle>

          <RegoPlate>
            {`${vehicleDetails?.vehicleRegistration?.vehicleRegistrationNumber} - 
            ${vehicleDetails?.vehicleRegistration?.vehicleRegistrationState}`}
          </RegoPlate>
        </>
      )}

      <LoanProgressContainer>{children}</LoanProgressContainer>

      <NextRepay>{accountSummaryJson?.nextRepaymentDueTitle}</NextRepay>
      <NextRepayData>
        <NextDate>
          {repayDetails?.customerDomain &&
            nextRepaymentDate(repayDetails?.customerDomain?.financeAccount?.nextPaymentDate)}
        </NextDate>
        <NextAmount>
          {repayDetails?.customerDomain &&
            ` ${currencyFormatter(repayDetails?.customerDomain?.financeAccount?.billedAmount)}`}
        </NextAmount>
      </NextRepayData>
    </InnerContainer>
  );
};

export default LeftContainer;
