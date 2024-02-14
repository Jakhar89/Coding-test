import { Form, Formik, useFormikContext } from 'formik';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from 'styled-components';
import * as Yup from 'yup';

import TitleComponent from '@/components/TitleComponent/TitleComponent';
import { userStore } from '@/context/User/User';
import { AEMProps } from '@/types/global/aem-definition';
import Base from '@/utility/components/ComponentBase/Base';
import AccordionXS from '@/utility/components/FormElement/AccordionXS';
import ActionButton from '@/utility/components/FormElement/ActionButton';
import FormDatePicker from '@/utility/components/FormElement/DatePicker';
import FormLabel from '@/utility/components/FormElement/Label';
import SearchField from '@/utility/components/FormElement/SearchField';
import Select from '@/utility/components/FormElement/Select';
import { Field } from '@/utility/components/FormElement/StyledFormSection';
import {
  ANALYTICS_POSITION_CONTEXTUAL_CONTENT,
  ANALYTICS_POSITION_INPAGE,
  getFormattedPageName,
  handleAnalyticsClick,
} from '@/utility/helpers/analytics';
import { loginFlow, postCallAPI } from '@/utility/helpers/api';
import { Transaction, TransactionsProps } from '@/utility/helpers/api/transactionsHistory/definitions';
import { API_TRANSACTIONS_HISTORY } from '@/utility/helpers/constants';
import { formatDate } from '@/utility/helpers/dateTime';

import { TransactionsHistoryProps } from './definitions';
import { managePrintTags } from './printHelpers';
import GlobalStyle, {
  GridItem,
  IconContainer,
  InnerWrapper,
  NoDataText,
  Title,
  TitleContainer,
  Wrapper,
} from './StyledTransactionsHistory';
import TransactionsHistoryPrint from './TransactionHistoryPrint';
import UiPaginatedTable from './UiPaginatedTable';

const TransactionsHistory = ({ attributes, errorSuccessMap, site }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const transactionsHistoryJson: TransactionsHistoryProps = JSON.parse(attributes);
  const Theme = useContext(ThemeContext);

  const { apiResponse, addToAPIResponse, selectedContract, setSelectedContract } = userStore();
  const { contractsData, loginInfo, transactionsHistoryData } = apiResponse || {};
  const contractStartDate = selectedContract?.customerDomain?.contract?.contractStartDate;

  const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]);
  const [processedTransactions, setProcessedTransactions] = useState<Transaction[]>([]);

  const [filterDescription, setFilterDescription] = useState<string>('');
  const [filterSelect, setFilterSelect] = useState<string | undefined>(
    transactionsHistoryJson?.transactionTypes?.[0]?.type,
  );
  const [filterDateFrom, setFilterDateFrom] = useState<Date | undefined>(undefined);
  const [filterDateTo, setFilterDateTo] = useState<Date>(new Date());

  const [isASCSort, setIsASCSort] = useState<boolean>(false);

  const questApiKey = localStorage?.getItem('apiKey') ?? transactionsHistoryJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? transactionsHistoryJson?.globalConfig?.baseApiUrl;

  const gridConfig = {
    innerWrapper: {
      col: 12,
      gutters: 0,
      spaces: { mb: { xs: 'micro4', md: 'micro4', lg: 'macro3' }, mx: { md: '-15px' } },
    },
    filter: { gutters: { xs: '0', md: 30, lg: 30 }, spaces: { mx: { xs: '0', md: '15px' } } },
  };

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const transactionsData = () => {
    const postData = {
      customerDomain: {
        contract: {
          contractId: `${selectedContract?.customerDomain?.contract?.contractId}`,
          contractStartDate: `${selectedContract?.customerDomain?.contract?.contractStartDate}`,
          contractEndDate: `${selectedContract?.customerDomain?.contract?.contractEndDate}`,
        },
      },
    };
    postCallAPI('account-statement', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((res) => {
      const data = res?.data;
      if (data) {
        addToAPIResponse(API_TRANSACTIONS_HISTORY, data);
      }
    });
  };

  const formatDateString = (date) => {
    if (!date) return null;
    return formatDate(new Date(date))
      .split('/')
      .map((item, index) => (index === 2 ? item.slice(2) : item))
      .join('/');
  };

  // Process Raw transaction data from API
  const processData = () => {
    if (!transactionsHistoryData) return;

    const totalTransactions = transactionsHistoryData?.customerDomain?.accountStatementLines?.map((transactionItem) => {
      const date = new Date(transactionItem?.effectiveDate);
      const formattedDate = formatDateString(date);

      return {
        date,
        formattedDate,
        ...transactionItem,
      };
    });

    setProcessedTransactions(totalTransactions);
  };

  useEffect(() => {
    processData();
  }, [transactionsHistoryData]);

  const processDisplayTransactions = () => {
    if (!processedTransactions?.length) return;

    // Filtering transaction based on condition
    const filteredTransactions = processedTransactions?.filter((transaction) => {
      // From and to date condition
      if (
        (filterDateFrom && transaction?.date! < filterDateFrom) ||
        (filterDateTo && transaction?.date! > filterDateTo)
      ) {
        return false;
      }

      // Description condition
      if (filterDescription && filterDescription?.length > 1) {
        const lowerCaseDescription = transaction?.description?.toLowerCase();

        if (!lowerCaseDescription?.includes(filterDescription.toLowerCase())) {
          return false;
        }
      }

      // Transaction type Condition
      if (filterSelect) {
        const isDebit = filterSelect?.toLowerCase().includes('debit');
        const isCredit = filterSelect?.toLowerCase().includes('credit');

        if (isDebit && transaction?.amount < 0) {
          return false;
        } else if (isCredit && transaction?.amount >= 0) {
          return false;
        }
      }

      return true;
    });

    // Sorting Transaction ASC/DESC order based on state
    const sortedTransactions = filteredTransactions.sort((el1, el2) => {
      if (isASCSort) {
        return el1?.date! < el2?.date! ? -1 : el1?.date! > el2?.date! ? 1 : 0;
      }

      return el1?.date! > el2?.date! ? -1 : el1?.date! < el2?.date! ? 1 : 0;
    });

    setDisplayTransactions([...sortedTransactions]);
  };

  useEffect(() => {
    if (processedTransactions) {
      processDisplayTransactions();
    }
  }, [processedTransactions, isASCSort, filterDateFrom, filterDateTo, filterSelect, filterDescription]);

  useEffect(() => {
    if (contractsData && !selectedContract) {
      setSelectedContract(contractsData?.contracts?.[0]);
    }
    if (selectedContract) {
      contractStartDate && setFilterDateFrom(new Date(contractStartDate));
      const contractID: string = selectedContract?.customerDomain?.contract?.contractId ?? '';
      transactionsData();
    }
  }, [contractsData, selectedContract]);

  useEffect(() => {
    if (!loginInfo && baseApiUrl && questApiKey) {
      loginFlow(baseApiUrl, questApiKey, errorSuccessMap, apiResponse, addToAPIResponse, true);
    }

    document.querySelector('body')?.classList.add('print-enabled');

    managePrintTags();

    return () => {
      managePrintTags('remove');
    };
  }, []);

  const triggerAnalytics = (title) => {
    handleAnalyticsClick('keyLinkInteraction', {
      keyLink: {
        linkOriginationPage: getFormattedPageName(),
        linkPosition: ANALYTICS_POSITION_INPAGE,
        linkTitle: title,
      },
    });
  };

  const genDropDown = (list) => {
    let finalDropDown = list.map((el) => ({
      label: `${el.type}`,
      value: `${el.type}`,
    }));

    return finalDropDown;
  };

  return (
    <Base
      data-testid="transactions-history"
      direction="column"
    >
      <GlobalStyle />
      <Wrapper>
        <AccordionXS title={'Search & filters'}>
          <InnerWrapper config={gridConfig.innerWrapper}>
            <GridItem config={{ col: { xs: 12, md: 6, lg: 3 }, ...gridConfig.filter, order: { md: 0, lg: 1 } }}>
              <Field className="filter-field">
                <FormLabel
                  className="hideXS"
                  htmlFor="searchField"
                >
                  {transactionsHistoryJson?.filter1}
                </FormLabel>
                <SearchField
                  name="searchField"
                  value={filterDescription}
                  setFieldValue={(fieldName, value) => setFilterDescription(value)}
                  placeholder={transactionsHistoryJson?.filter1Placeholder}
                />
              </Field>
            </GridItem>
            <GridItem config={{ col: { xs: 12, md: 6, lg: 3 }, ...gridConfig.filter, order: { md: 2, lg: 2 } }}>
              <Field className="filter-field">
                <FormLabel
                  htmlFor={'dateFrom'}
                  optional={false}
                >
                  {transactionsHistoryJson.filter2}
                </FormLabel>
                <FormDatePicker
                  handleDateChange={(value) => {
                    setFilterDateFrom(value);
                  }}
                  name={'dateFrom'}
                  minDate={contractStartDate ? new Date(contractStartDate) : undefined}
                  maxDate={new Date()}
                  alignLeft={true}
                  isInFormik={false}
                  value={filterDateFrom}
                />
              </Field>
            </GridItem>

            <GridItem config={{ col: { xs: 12, md: 6, lg: 3 }, ...gridConfig.filter, order: { md: 3, lg: 3 } }}>
              <Field className="filter-field">
                <FormLabel
                  htmlFor={'dateTo'}
                  optional={false}
                >
                  {transactionsHistoryJson.filter3}
                </FormLabel>
                <FormDatePicker
                  handleDateChange={(value) => {
                    setFilterDateTo(value);
                  }}
                  name={'dateTo'}
                  minDate={filterDateFrom ? filterDateFrom : undefined}
                  maxDate={new Date()}
                  alignLeft={true}
                  isInFormik={false}
                  value={filterDateTo}
                />
              </Field>
            </GridItem>

            <GridItem config={{ col: { xs: 12, md: 6, lg: 3 }, ...gridConfig.filter, order: { md: 1, lg: 4 } }}>
              <Field className="filter-field">
                <FormLabel htmlFor={'tansactionType'}>{transactionsHistoryJson?.filter4}</FormLabel>
                <Select
                  setFieldValue={(fieldName, value) => setFilterSelect(value)}
                  value={filterSelect ?? transactionsHistoryJson?.transactionTypes?.[0]?.type}
                  name={'tansactionType'}
                  placeholder={transactionsHistoryJson?.filter4Placeholder}
                  options={genDropDown(transactionsHistoryJson?.transactionTypes)}
                  isInFormik={false}
                ></Select>
              </Field>
            </GridItem>
          </InnerWrapper>
        </AccordionXS>
      </Wrapper>
      <TitleContainer>
        <TitleComponent attributes={`{"titleText":"${transactionsHistoryJson?.transactionTitle}"}`} />
        <ActionButton
          className="transHistoryButton"
          buttonType={'secondary'}
          type={'button'}
          label={transactionsHistoryJson?.exportButtonLabel}
          onClick={() => {
            window.print();
            triggerAnalytics('Title: Transaction History - Export');
            return false;
          }}
        />
      </TitleContainer>
      <GridItem config={{ col: 12, gutters: 0, spaces: { px: '0' } }}>
        {displayTransactions.length > 0 ? (
          <UiPaginatedTable
            transactionsHistoryJson={transactionsHistoryJson}
            data={displayTransactions}
            isASCSort={isASCSort}
            setIsASCSort={setIsASCSort}
          />
        ) : processedTransactions?.length ? (
          <NoDataText>{transactionsHistoryJson?.noTransactions}</NoDataText>
        ) : null}
      </GridItem>
      <TransactionsHistoryPrint
        transactionsHistoryJson={transactionsHistoryJson}
        data={displayTransactions}
        selectedContract={selectedContract}
        errorSuccessMap={errorSuccessMap}
        filterDescription={filterDescription}
        filterSelect={filterSelect}
        filterDateFrom={formatDateString(filterDateFrom)}
        filterDateTo={formatDateString(filterDateTo)}
        site={site}
      />
    </Base>
  );
};

export default TransactionsHistory;
