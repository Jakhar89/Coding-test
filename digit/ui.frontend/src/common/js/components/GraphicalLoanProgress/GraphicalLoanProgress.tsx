import React, { useEffect, useState } from 'react';

import { userStore } from '@/context/User/User';
import { AEMErrorSuccessProps } from '@/types/global/aem-definition';
import Icon from '@/utility/components/Icon';
import { contractData, postCallAPI } from '@/utility/helpers/api';
import { SET_LOADING_OBJ } from '@/utility/helpers/constants';
import {
  calculateFortnightsFromStart,
  calculateMonthsFromStart,
  calculateWeeksFromStart,
} from '@/utility/helpers/dateTime';
import { currencyFormatter } from '@/utility/helpers/string';

import Arc from './Arc';
import {
  AccountNumber,
  ACLabel,
  ACNumber,
  ArcContainer,
  ArcInfo,
  IconWrapper,
  LoanInfo,
  LoanInfoContainer,
  LoanInfoCopy,
  LoanInfoLabel,
  LoanInfoLabelOne,
  LoanInfoValue,
  LoanProgressContainer,
  ProgressCopy,
  ProgressTitle,
} from './StyledGraphicalLoanProgress';

type GraphicalLoanProgressProps = {
  accountSummaryJson: any;
  contract: any;
  errorSuccessMap?: AEMErrorSuccessProps;
};

const GraphicalLoanProgress = ({ accountSummaryJson, errorSuccessMap, contract }: GraphicalLoanProgressProps) => {
  const [paidPercent, setPaidPercent] = useState<number | undefined>();
  const [paidToDate, setPaidToDate] = useState<number | undefined>();

  const {
    apiResponse,
    dashboardRepaymentAPIData,
    setDashboardRepaymentAPIData,
    dashboardAccountDetailsAPIData,
    setDashboardAccountDetailsAPIData,
    dashboardPaidToDateAPIData,
    setDashboardPaidToDateAPIData,
  } = userStore();

  const { contractsData } = apiResponse;

  const contractID: string = contract?.customerDomain?.contract?.contractId ?? '';

  const accountsData = dashboardAccountDetailsAPIData?.[contractID];
  const repaymentData = dashboardRepaymentAPIData?.[contractID];

  const questApiKey = localStorage?.getItem('apiKey') ?? accountSummaryJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? accountSummaryJson?.globalConfig?.baseApiUrl;

  const getAccountDetailsApi = (contractId: string) => {
    const postData = contractData(contractId);

    postCallAPI('account-details', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((response) => {
      if (response?.data) {
        setDashboardAccountDetailsAPIData(contractId, response.data);
      }
    });
  };

  const getRepaymentsData = (contractId: string) => {
    const postData = contractData(contractId);
    postCallAPI('repayment', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((response) => {
      if (response?.data) {
        setDashboardRepaymentAPIData(contractId, response?.data);
      }
    });
  };

  const getPaidToDateApi = (contractId: string) => {
    const postData = contractData(contractId);
    postCallAPI('paid-to-date', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((response) => {
      if (response?.data) {
        setDashboardPaidToDateAPIData(contractId, response?.data);
      }
    });
  };

  const calculatePaidToDate = (paidToDateApiData) => {
    const paymentsData = Array.isArray(paidToDateApiData?.customerDomain?.payment)
      ? paidToDateApiData?.customerDomain?.payment
      : [];
    const refundsData = Array.isArray(paidToDateApiData?.customerDomain?.refunds)
      ? paidToDateApiData?.customerDomain?.refunds
      : [];

    const paidToDate = [...paymentsData, ...refundsData].reduce((total, item) => {
      const amount =
        typeof item?.paymentAmount == 'number'
          ? item?.paymentAmount
          : typeof item?.refundAmount == 'number'
          ? item?.refundAmount
          : 0;
      return total + amount;
    }, 0);

    setPaidToDate(paidToDate);
  };

  useEffect(() => {
    if (contract) {
      const contractID: string = contract?.customerDomain?.contract?.contractId ?? '';

      if (!dashboardRepaymentAPIData?.[contractID]) {
        setDashboardRepaymentAPIData(contractID, SET_LOADING_OBJ);
        getRepaymentsData(contractID);
      }

      if (!dashboardAccountDetailsAPIData?.[contractID]) {
        setDashboardAccountDetailsAPIData(contractID, SET_LOADING_OBJ);
        getAccountDetailsApi(contractID);
      }

      if (!dashboardPaidToDateAPIData?.[contractID]) {
        setDashboardPaidToDateAPIData(contractID, SET_LOADING_OBJ);
        getPaidToDateApi(contractID);
      }
    }
  }, [contract]);

  useEffect(() => {
    if (dashboardPaidToDateAPIData?.[contractID] && !dashboardPaidToDateAPIData?.[contractID]?.loading) {
      calculatePaidToDate(dashboardPaidToDateAPIData?.[contractID]);
    }
  }, [dashboardPaidToDateAPIData?.[contractID]]);

  const accountNumber = accountsData?.customerDomain?.contract?.contractId;
  const contractStartDate = accountsData?.customerDomain?.contract?.contractStartDate;
  const contractTerm = accountsData?.customerDomain?.contract?.contractTerm;
  const balanceOutstanding = accountsData?.customerDomain?.financeAccount?.balanceOutstanding;

  const monthsSinceStart = contractStartDate && calculateMonthsFromStart(new Date(contractStartDate));

  useEffect(() => {
    if (typeof paidToDate != 'number') return;

    const numberOfContracts = contractsData?.contracts?.length;

    // Set paid Percent only once all accounts api are loaded
    // To stop rerendering of the progress Arc
    if (Object.keys(dashboardAccountDetailsAPIData).length == numberOfContracts) {
      for (const key in dashboardAccountDetailsAPIData) {
        if (dashboardAccountDetailsAPIData[key]?.loading) return;
      }
      const paidPercent = (paidToDate / (paidToDate + balanceOutstanding)) * 100;
      setPaidPercent(paidPercent);
    }
  }, [contractsData, dashboardAccountDetailsAPIData, paidToDate]);

  const getTermCopy = () => {
    if (!repaymentData || repaymentData?.loading || !accountsData || accountsData?.loading) return '';
    return `${monthsSinceStart} of ${contractTerm} Months`;
  };

  return (
    <>
      <LoanProgressContainer>
        <AccountNumber>
          <ACLabel>{accountSummaryJson?.accountNumberTitle}</ACLabel>
          <ACNumber>{accountNumber}</ACNumber>
        </AccountNumber>
        <ArcContainer>
          <Arc percentage={paidPercent}>
            <ArcInfo>
              <ProgressTitle>{accountSummaryJson?.loanProgressTitle}</ProgressTitle>
              <ProgressCopy>{getTermCopy()}</ProgressCopy>
            </ArcInfo>
          </Arc>
          <LoanInfoContainer>
            <LoanInfo>
              <LoanInfoValue>{typeof paidToDate === 'number' && currencyFormatter(paidToDate)}</LoanInfoValue>
              <LoanInfoCopy>
                <LoanInfoLabelOne>{accountSummaryJson?.paidToDateTitle}</LoanInfoLabelOne>
                <IconWrapper>
                  <Icon
                    name={'info-circle'}
                    aria-label="Paid to date tooltip"
                    isFunctional={true}
                    fill="currentColor"
                    title={accountSummaryJson?.paidToDateTooltip}
                  />
                </IconWrapper>
              </LoanInfoCopy>
            </LoanInfo>
            <LoanInfo>
              <LoanInfoValue>{balanceOutstanding && currencyFormatter(balanceOutstanding)}</LoanInfoValue>
              <LoanInfoCopy>
                <LoanInfoLabel>{accountSummaryJson?.outstandingBalanceTitle}</LoanInfoLabel>
                <IconWrapper>
                  <Icon
                    name={'info-circle'}
                    aria-label="Outstandng Balance tooltip"
                    isFunctional={true}
                    fill="currentColor"
                    title={accountSummaryJson?.outstandingBalanceTooltip}
                  />
                </IconWrapper>
              </LoanInfoCopy>
            </LoanInfo>
          </LoanInfoContainer>
        </ArcContainer>
      </LoanProgressContainer>
    </>
  );
};

export default GraphicalLoanProgress;
