import React, { useEffect, useState } from 'react';

import { userStore } from '@/context/User/User';
import { AEMErrorSuccessProps } from '@/types/global/aem-definition';
import ActionButton from '@/utility/components/FormElement/ActionButton';
import Icon from '@/utility/components/Icon';
import RichText from '@/utility/components/RichText';
import { ANALYTICS_POSITION_INPAGE, getFormattedPageName, handleAnalyticsClick } from '@/utility/helpers/analytics';
import { contractData, postCallAPI } from '@/utility/helpers/api';
import { SET_LOADING_OBJ } from '@/utility/helpers/constants';
import { formatDate } from '@/utility/helpers/dateTime';
import { currencyFormatter } from '@/utility/helpers/string';

import { RecentTransactionProps } from './definitions';
import RecentTransactionsTable from './RecentTransactionsTable';
import {
  ButtonContainer,
  CardTitle,
  IconWrapper,
  InnerContainer,
  TextPositive,
  Title,
  TransactionsContainer,
} from './StyledRecentTransactions';

type RecentTransactionComponentProps = {
  isMulti: boolean;
  contract: any;
  accountSummaryJson: RecentTransactionProps;
  errorSuccessMap: AEMErrorSuccessProps;
};

const RecentTransactions = ({
  accountSummaryJson,
  errorSuccessMap,
  isMulti,
  contract,
}: RecentTransactionComponentProps) => {
  const { dashboardRecentTransactionsAPIData, setDashboardRecentTransactionsAPIData } = userStore();

  const contractID: string = contract?.customerDomain?.contract?.contractId ?? '';

  const questApiKey = localStorage?.getItem('apiKey') ?? accountSummaryJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? accountSummaryJson?.globalConfig?.baseApiUrl;

  const getRecentTransactionsData = (contractId: string) => {
    const postData = contractData(contractId);

    postCallAPI('account-statement', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((response) => {
      if (response?.data) {
        setDashboardRecentTransactionsAPIData(contractId, response?.data);
      }
    });
  };

  useEffect(() => {
    if (contract) {
      const contractID: string = contract?.customerDomain?.contract?.contractId ?? '';

      if (!dashboardRecentTransactionsAPIData?.[contractID]) {
        setDashboardRecentTransactionsAPIData(contractID, SET_LOADING_OBJ);
        getRecentTransactionsData(contractID);
      }
    }
  }, [contract]);

  const formatDateString = (date) => {
    return formatDate(new Date(date))
      .split('/')
      .map((item, index) => (index === 2 ? item.slice(2) : item))
      .join('/');
  };

  const processTransactionAmount = (amount) => {
    return <TextPositive isGreen={amount < 0 ? true : false}>{currencyFormatter(amount)}</TextPositive>;
  };

  const formattedRecentTransactionsData = (data) => {
    if (!data || data?.loading) return;

    const totalTransactions = data?.customerDomain?.accountStatementLines
      ?.map((transactionItem) => {
        transactionItem.date = new Date(transactionItem?.effectiveDate);
        return transactionItem;
      })
      .sort((el1, el2) => {
        return el1?.date! > el2?.date! ? -1 : el1?.date! < el2?.date! ? 1 : 0;
      })
      .slice(0, 5)
      ?.map((transaction) => {
        return {
          transactionDate: formatDateString(transaction?.date),
          transactionAmount: processTransactionAmount(transaction?.amount),
          balance: currencyFormatter(transaction?.totalAmountOutstanding),
        };
      });

    return totalTransactions;
  };

  const handleOnClick = (title, path) => {
    handleAnalyticsClick('keyLinkInteraction', {
      keyLink: {
        linkDestinationURL: path,
        linkOriginationPage: getFormattedPageName(),
        linkPosition: ANALYTICS_POSITION_INPAGE,
        linkTitle: title,
      },
    });
    window.location.href = `${path}.html?contract=${contractID}`;
  };

  return (
    <InnerContainer isMulti={isMulti}>
      <Title>
        <CardTitle>{accountSummaryJson?.recentTransactionsTitle}</CardTitle>
        <IconWrapper>
          <Icon
            name={'info-circle'}
            aria-label="hide navigation"
            isFunctional={true}
            fill="currentColor"
            title={accountSummaryJson?.recentTransactionsTooltip}
          />
        </IconWrapper>
      </Title>
      <TransactionsContainer>
        {formattedRecentTransactionsData(dashboardRecentTransactionsAPIData?.[contractID])?.length && (
          <RecentTransactionsTable
            attributes={accountSummaryJson}
            data={formattedRecentTransactionsData(dashboardRecentTransactionsAPIData?.[contractID])}
          />
        )}
        {formattedRecentTransactionsData(dashboardRecentTransactionsAPIData?.[contractID])?.length === 0 && (
          <RichText>{accountSummaryJson?.noTransactionsText}</RichText>
        )}
      </TransactionsContainer>
      <ButtonContainer>
        <ActionButton
          onClick={() => {
            handleOnClick(accountSummaryJson?.buttonLabel, accountSummaryJson?.buttonLink);
          }}
          label={accountSummaryJson?.buttonLabel}
          type="submit"
          buttonType={'secondary'}
        />
      </ButtonContainer>
    </InnerContainer>
  );
};

export default RecentTransactions;
