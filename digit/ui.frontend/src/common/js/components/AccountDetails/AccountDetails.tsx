import { toLower } from 'lodash';
import { useEffect, useRef } from 'react';

import { userStore } from '@/context/User/User';
import { AEMProps } from '@/types/global/aem-definition';
import DataList from '@/utility/components/DataList';
import ActionButton from '@/utility/components/FormElement/ActionButton';
import FormSection from '@/utility/components/FormElement/FormSection';
import { HeadingWithDivider } from '@/utility/components/FormElement/StyledFormSection';
import {
  ANALYTICS_NOT_APPLICABLE_URL,
  ANALYTICS_POSITION_INPAGE,
  emitTrackEvent,
  getFormattedPageName,
  handleAnalyticsClick,
} from '@/utility/helpers/analytics';
import { contractData, getCallAPI, loginFlow, postCallAPI } from '@/utility/helpers/api';
import {
  API_ACCOUNT_DETAILS,
  API_BORROWERS_DATA,
  API_REPAYMENTS_SUMMARY,
  API_VEHICLE_DETAILS,
  SET_LOADING_OBJ,
} from '@/utility/helpers/constants';
import { calculateMonths, calculateMonthsFromStart, formatDate } from '@/utility/helpers/dateTime';
import { currencyFormatter, replaceAuthoredBrackets } from '@/utility/helpers/string';

import { AccountDetailsParsedProps, FrequencyInterval } from './definitions';
import { ButtonContainer } from './StyledAccountDetails';

const frequencyIntervalMap: FrequencyInterval = {
  Annual: 'Years',
  Fortnightly: 'Fortnights',
  Monthly: 'Months',
  P1M: 'Months', //temporary
  Quarterly: 'Quarters',
  Structured: 'As per your contract',
  Weekly: 'Weeks',
};

const AccountDetails = ({ attributes, errorSuccessMap }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const { apiResponse, addToAPIResponse, selectedContract, setSelectedContract } = userStore();
  const { accountsData, contractsData, loginInfo, repaymentData, borrowersData, vehicleData } = apiResponse || {};

  const accountDetailsJson: AccountDetailsParsedProps = JSON.parse(attributes);
  const frequencyInterval: string = repaymentData?.customerDomain?.financeAccount?.repaymentFrequency ?? '';
  const productTitleGFV: boolean = `${accountsData?.productDomain?.product?.productTitle}`.includes('GFV');
  const balloonPaymentAmount: boolean = accountsData
    ? accountsData?.customerDomain?.financeAccount?.balanceOutstanding > 0 ?? false
    : false;
  let guaranteeBalloonPaymentCaption: string = '';

  const frequencyIntervalRemaining = (interval: string): string => {
    if (interval && interval !== 'Structured') {
      return replaceAuthoredBrackets(
        `${frequencyIntervalMap?.[interval]} ${accountDetailsJson?.accountMonthsRunLabelText}`,
      );
    } else {
      return `${frequencyIntervalMap?.[interval]}`;
    }
  };

  const accountGuaranteedFutureVal = (): string => {
    if (productTitleGFV) {
      guaranteeBalloonPaymentCaption = accountDetailsJson?.accountGuaranteedFutureValCaptionText ?? '';

      return accountDetailsJson.accountGuaranteedFutureValLabelText;
    } else if (!productTitleGFV && balloonPaymentAmount) {
      guaranteeBalloonPaymentCaption = accountDetailsJson?.balloonPaymentAmountCaptionText ?? '';

      return accountDetailsJson.balloonPaymentAmountLabelText;
    }

    return '';
  };

  const getBorrowerNames = (): string => {
    let BorrowerNames = '';

    if (borrowersData) {
      borrowersData?.contracts.map((el, i) => {
        let custmerRole = el?.customerDomain?.customerRoleType?.customerRole?.toUpperCase();
        if (custmerRole === 'INVOICE_CUSTOMER' || custmerRole === 'BORROWER') {
          const borrower = el?.customerDomain?.financialDetailRetailFinance?.customer;
          const firstName = borrower.givenName1 ? (i > 0 ? `, ${borrower.givenName1}` : `${borrower.givenName1}`) : '';
          const middleName = borrower.givenName2 ? `${borrower.givenName2}` : '';
          const lastName = borrower.surname ? `${borrower.surname}` : '';

          BorrowerNames += `${firstName} ${middleName} ${lastName}`;
        }
      });
    }

    return `${BorrowerNames}`;
  };

  const dateConfirm = (nextPayDate): boolean => {
    const today = new Date();

    if (nextPayDate > today) {
      return true;
    } else {
      return false;
    }
  };

  const dateFormat = (el: string): string => {
    return formatDate(new Date(el));
  };

  const monthsRemaining = (): number | string | undefined => {
    if (!accountsData) return '';
    const { contractTerm, contractStartDate } = accountsData?.customerDomain?.contract;

    const monthsSinceStart = contractStartDate && calculateMonthsFromStart(new Date(contractStartDate));
    return contractTerm && monthsSinceStart ? contractTerm - monthsSinceStart : '';
  };

  const data = [
    {
      title: accountDetailsJson.accountNumberLabelText,
      value: selectedContract?.customerDomain?.contract.contractId ?? '',
    },
    {
      title: accountDetailsJson.accountNameLabelText,
      value: getBorrowerNames() ?? '',
    },
    {
      title: accountDetailsJson.accountProductTypeLabelText,
      value: accountsData?.productDomain?.product?.productTitle ?? '',
    },
    {
      title: accountDetailsJson.accountStartDateLabelText,
      value: selectedContract ? dateFormat(selectedContract?.customerDomain?.contract?.contractStartDate) : '',
    },
    {
      title: accountDetailsJson.accountEndDateLabelText,
      value: selectedContract ? dateFormat(selectedContract.customerDomain?.contract?.contractEndDate) : '',
    },
    {
      title: accountDetailsJson.accountTermLabelText,
      value: accountsData?.customerDomain?.contract?.contractTerm ?? '',
      disclaimer: accountDetailsJson?.accountTermCaptionText,
    },
    {
      title: accountDetailsJson.accountMonthsRunLabelText,
      value: monthsRemaining() ?? '',
      disclaimer: accountDetailsJson?.accountMonthsRunCaptionText,
    },
    {
      title: accountDetailsJson.accountStatusLabelText,
      value: selectedContract
        ? selectedContract?.customerDomain?.contract?.contractStatus === ('LIVE' || 'MATURED')
          ? 'Active'
          : 'Closed'
        : '',
      disclaimer: accountDetailsJson?.accountStatusCaptionText,
    },
    {
      title: accountDetailsJson.accountFinancedAmountLabelText,
      value: accountsData
        ? `${currencyFormatter(accountsData.customerDomain?.financeAccount?.totalAmountFinanced)}`
        : '',
      disclaimer: accountDetailsJson?.accountFinancedAmountCaptionText,
    },
    {
      title: accountDetailsJson.accountCurrentBalanceLabelText,
      value: accountsData
        ? `${currencyFormatter(accountsData.customerDomain?.financeAccount?.balanceOutstanding)}`
        : '',
      disclaimer: accountDetailsJson?.accountCurrentBalanceCaptionText,
    },
    {
      title: accountDetailsJson.accountInterestRateLabelText,
      value: accountsData ? `${accountsData?.customerDomain?.contract?.contractRate} %` : '',
    },
    // Not Required for MVP
    //{
    //   title: accountDetailsJson.accountMaturityOptionLabelText,
    //   value: 'Trade in',
    // },
    {
      title: productTitleGFV ? accountDetailsJson.accountVehEndOdoLabelText : '',
      value: productTitleGFV
        ? vehicleData?.assets[0]?.customerDomain?.financialDetailRetailFinance?.gfvDetail?.endOdometer ?? ''
        : '',
      disclaimer: accountDetailsJson?.accountVehEndOdoCaptionText,
    },
    {
      title: accountsData ? accountGuaranteedFutureVal() : '',
      value: accountsData?.customerDomain?.financialDetailRetailFinance?.balloonAmount
        ? `${currencyFormatter(accountsData.customerDomain?.financialDetailRetailFinance?.balloonAmount)}`
        : '',
      disclaimer: guaranteeBalloonPaymentCaption,
    },
    {
      title: accountDetailsJson.dealershipNameLabelText,
      value: accountsData?.dealerDomain?.dealer?.dealershipName ?? '',
      disclaimer: accountDetailsJson?.dealershipNameCaptionText,
    },
  ];

  /**
   * Need to replace these local storage variables
   * Create a call to fetch vehicle details if GFV
   * */
  const questApiKey = localStorage?.getItem('apiKey') ?? accountDetailsJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? accountDetailsJson?.globalConfig?.baseApiUrl;

  const getVehicleDetails = (contractId: string) => {
    const postData = contractData(contractId);

    postCallAPI('vehicle-details', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((response) => {
      if (response?.data) {
        addToAPIResponse(API_VEHICLE_DETAILS, response.data);
      }
    });
  };

  const getAccountDetailsApi = (contractId: string) => {
    const postData = contractData(contractId);

    postCallAPI('account-details', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((response) => {
      if (response?.data) {
        addToAPIResponse(API_ACCOUNT_DETAILS, response.data);
      }
    });
  };

  const getRepaymentsData = (contractId: string) => {
    const postData = contractData(contractId);

    postCallAPI('repayment', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((response) => {
      if (data) {
        addToAPIResponse(API_REPAYMENTS_SUMMARY, response?.data);
      }
    });
  };

  const getBorrowersData = (contractId: string) => {
    const postData = contractData(contractId);

    postCallAPI('borrowers', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((response) => {
      const data = response?.data;

      if (data) {
        addToAPIResponse(API_BORROWERS_DATA, data);
      }
    });
  };

  useEffect(() => {
    if (contractsData && !selectedContract) {
      setSelectedContract(contractsData?.contracts?.[0]);
    }
    /**
     * When contract is selected
     * Load data based upon the contractID
     */
    if (selectedContract) {
      const contractID: string = selectedContract?.customerDomain?.contract?.contractId ?? '';
      getRepaymentsData(contractID);
      getAccountDetailsApi(contractID);
      getBorrowersData(contractID);
      productTitleGFV && getVehicleDetails(contractID);
    }
  }, [contractsData, selectedContract]);

  useEffect(() => {
    if (!loginInfo && baseApiUrl && questApiKey) {
      loginFlow(baseApiUrl, questApiKey, errorSuccessMap, apiResponse, addToAPIResponse, true);
    }
  }, []);

  // On contract change account details api gets called
  // Tacking event have to wait for product type for calling 'accountSwitch'
  useEffect(() => {
    if (accountsData) {
      const accountDetailsData = {
        page: {
          accountProductType: accountsData?.productDomain?.product?.productTitle,
          accountStatus: selectedContract?.customerDomain?.contract?.contractStatus,
          accountStartDate: selectedContract?.customerDomain?.contract?.contractStartDate,
        },
      };

      const currentData = window.digitalData;
      window.digitalData.page = { ...currentData?.page, ...accountDetailsData.page };

      emitTrackEvent({ name: 'accountSwitch', data: { page: accountDetailsData.page } });
    }
  }, [accountsData]);

  return (
    <FormSection
      spacingSize="macro1"
      sectionWidth="halfwidth"
    >
      <HeadingWithDivider>{accountDetailsJson.accountDetailsLabelText}</HeadingWithDivider>
      <DataList
        data={data}
        shouldHideEmptyValues={true}
      />
      {/* <ButtonContainer>
        <ActionButton
          icon="arrow-forward"
          label={accountDetailsJson.viewRepaymentsButtonText}
          onClick={() =>
            handleAnalyticsClick('keyLinkInteraction', {
              keyLink: {
                // TODO: Update destinationURL once url is available
                linkDestinationURL: ANALYTICS_NOT_APPLICABLE_URL,
                linkOriginationPage: getFormattedPageName(),
                linkPosition: ANALYTICS_POSITION_INPAGE,
                linkTitle: accountDetailsJson.viewRepaymentsButtonText,
              },
            })
          }
        />
      </ButtonContainer> */}
    </FormSection>
  );
};

export default AccountDetails;
