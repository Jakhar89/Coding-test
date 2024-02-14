import React, { useEffect } from 'react';

import { userStore } from '@/context/User/User';
import { AEMProps } from '@/types/global/aem-definition';

import { HeadingWithDivider } from '@/utility/components/FormElement/StyledFormSection';
import { API_BILLING_SCHEDULE_DATA } from '@/utility/helpers/constants';
import { loginFlow, postCallAPI } from '@/utility/helpers/api';
import { currencyFormatter } from '@/utility/helpers/string';
import { formatDate } from '@/utility/helpers/dateTime';

import { BillingScheduleParsedProps } from './definitions';
import { Container, FormSectionContainer } from './StyledBillingSchedule';
import UiBillingTable from './UiBillingTable';

const BillingSchedule = ({ attributes, errorSuccessMap }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const { apiResponse, addToAPIResponse, selectedContract, setSelectedContract } = userStore();
  const { accountsData, contractsData, loginInfo, billingScheduleApiData } = apiResponse || {};

  const billingScheduleJson: BillingScheduleParsedProps = JSON.parse(attributes);

  const questApiKey = localStorage?.getItem('apiKey') ?? billingScheduleJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? billingScheduleJson?.globalConfig?.baseApiUrl;

  const contractData = (contractID: string) => ({
    customerDomain: {
      contract: {
        contractId: contractID,
      },
    },
  });

  const getAccountDetailsApi = (contractId: string) => {
    const postData = contractData(contractId);

    !accountsData &&
      postCallAPI('account-details', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((response) => {
        if (response?.data) {
          addToAPIResponse('accountsData', response.data);
        }
      });
  };

  const formatBillingScheduleData = (billingScheduleRawData) => {
    if (!billingScheduleRawData) {
      return [];
    }

    const formattedData = {};

    // Create repayment object combining admin fee and repayment amount
    billingScheduleRawData?.customerDomain?.repaymentScheduleItems?.map((item) => {
      const objKey = item?.scheduledItemDescription?.replace(' ', '');

      if (formattedData?.[item?.scheduledDueDate]) {
        formattedData[item.scheduledDueDate][objKey] = item?.scheduledAmount;
      } else {
        formattedData[item.scheduledDueDate] = {
          [objKey]: item?.scheduledAmount,
          scheduledDueDate: item.scheduledDueDate,
        };
      }
    });

    const repaymentArray: any = [];

    // Map and format data for UI mapping
    for (let key in formattedData) {
      const uiDate = new Date(formattedData[key]?.scheduledDueDate);
      const paymentAmount = currencyFormatter(formattedData[key]?.InstallmentAmount);
      const adminFee = currencyFormatter(formattedData[key]?.AdminFee);
      const totalRepayment = currencyFormatter(formattedData[key]?.InstallmentAmount + formattedData[key]?.AdminFee);

      const repayment = {
        paymentDate: uiDate,
        paymentAmount,
        adminFee,
        totalRepayment,
      };
      repaymentArray.push(repayment);
    }

    // Sort repayments by Date
    // Then format the date for UI
    const sortedRepayments = repaymentArray
      ?.sort((repaymentOne, repaymentTwo) => {
        return repaymentOne?.paymentDate < repaymentTwo?.paymentDate ? -1 : 1;
      })
      ?.map((repayment) => {
        return {
          ...repayment,
          paymentDate: formatDate(repayment?.paymentDate),
        };
      });

    return sortedRepayments;
  };

  const getBillingData = (contractId: string) => {
    const postData = contractData(contractId);
    !billingScheduleApiData &&
      postCallAPI('billing-schedule', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((response) => {
        const data = response?.data;

        if (data) {
          addToAPIResponse(API_BILLING_SCHEDULE_DATA, data);
        }
      });
  };

  useEffect(() => {
    if (contractsData && !selectedContract) {
      setSelectedContract(contractsData?.contracts?.[0]);
    }
    if (selectedContract) {
      const contractID: string = selectedContract?.customerDomain?.contract?.contractId ?? '';
      getBillingData(contractID);
      getAccountDetailsApi(contractID);
    }
  }, [contractsData, selectedContract]);

  useEffect(() => {
    if (!loginInfo && baseApiUrl && questApiKey) {
      loginFlow(baseApiUrl, questApiKey, errorSuccessMap, apiResponse, addToAPIResponse, true);
    }
  }, []);

  return (
    <FormSectionContainer
      spacingSize="macro2"
      sectionWidth="fullwidth"
      className="form-section"
    >
      <HeadingWithDivider>{billingScheduleJson?.billingScheduleLabelText}</HeadingWithDivider>
      <Container>
        {billingScheduleApiData && <UiBillingTable billingData={formatBillingScheduleData(billingScheduleApiData)} />}
      </Container>
    </FormSectionContainer>
  );
};

export default BillingSchedule;
