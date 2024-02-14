import { toLower } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
// Read more at: https://react-table-v7.tanstack.com/docs/overview
import { usePagination, useTable } from 'react-table';

import AccountSelector from '@/components/AccountSelector/AccountSelector';
import { Tab, TabList, TabPanel, Tabs } from '@/components/Tabs/StyledTabList';
import { userStore } from '@/context/User/User';
import { AEMProps } from '@/types/global/aem-definition';
import DataList from '@/utility/components/DataList';
import ActionButton from '@/utility/components/FormElement/ActionButton';
import FormDatePicker from '@/utility/components/FormElement/DatePicker';
import FormSection from '@/utility/components/FormElement/FormSection';
import FormLabel from '@/utility/components/FormElement/Label';
import { Field, HeadingWithDivider } from '@/utility/components/FormElement/StyledFormSection';
import Icon from '@/utility/components/Icon';
import Pagination from '@/utility/components/Pagination';
import Tables from '@/utility/components/Tables';
import { loginFlow, postCallAPI } from '@/utility/helpers/api';
// import {
//   ANALYTICS_NOT_APPLICABLE_URL,
//   ANALYTICS_POSITION_INPAGE,
//   emitTrackEvent,
//   getFormattedPageName,
//   handleAnalyticsClick,
// } from '@/utility/helpers/analytics';
// import { contractData, getCallAPI, loginFlow, postCallAPI } from '@/utility/helpers/api';
// import {
//   API_ACCOUNT_DETAILS,
//   API_BORROWERS_DATA,
//   API_REPAYMENTS_SUMMARY,
//   API_VEHICLE_DETAILS,
//   SET_LOADING_OBJ,
// } from '@/utility/helpers/constants';
import { calculateMonths, calculateMonthsFromStart, formatDate } from '@/utility/helpers/dateTime';
import { currencyFormatter, replaceAuthoredBrackets } from '@/utility/helpers/string';

import { AccountStatementParsedProps, FrequencyInterval } from './definitions';
import {
  ButtonContainer,
  DateFilterContainer,
  IconContainer,
  NoDataText,
  PaginationContainer,
  TblHeader,
} from './StyledAccountStatement';
import UiPaginatedTable from './UiPaginatedTable';

const AccountStatement = ({ attributes, errorSuccessMap }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const { apiResponse, addToAPIResponse, selectedContract, setSelectedContract } = userStore();
  const { accountsData, contractsData, loginInfo, repaymentData, borrowersData, vehicleData } = apiResponse || {};

  const accountStatementJson: AccountStatementParsedProps = JSON.parse(attributes);

  const {
    accountStatementTitle,
    accountToDateLabel,
    dateRangeLabel,
    dateFromLabel,
    dateToLabel,
    generateStatementCta,
    statementTitle,
    statementDownloadedLabel,
    statementGeneratedLabel,
    downloadedDescription,
    generatedDescription,
    noStatementLabel,
  } = accountStatementJson;

  const [filterDateFrom, setFilterDateFrom] = useState<Date | undefined>(undefined);
  const [filterDateTo, setFilterDateTo] = useState<Date>(new Date());
  const [isASCSort, setIsASCSort] = useState(false);

  const [rawStatementData, setRawStatementData] = useState<any>({});

  const questApiKey = localStorage?.getItem('apiKey') ?? accountStatementJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? accountStatementJson?.globalConfig?.baseApiUrl;

  const contractStartDate = selectedContract?.customerDomain?.contract?.contractStartDate;

  const getStatementData = () => {
    // TODO Update once api is ready
    const postData = {
      customerDomain: {
        contract: {
          contractId: `${selectedContract?.customerDomain?.contract?.contractId}`,
        },
      },
    };
    postCallAPI('account-statements', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((res) => {
      const data = res?.data;
      if (data) {
        setRawStatementData(data);
      }
    });
  };

  useEffect(() => {
    if (contractsData && !selectedContract) {
      setSelectedContract(contractsData?.contracts?.[0]);
    }
    if (selectedContract) {
      contractStartDate && setFilterDateFrom(new Date(contractStartDate));
      getStatementData();
    }
  }, [contractsData, selectedContract]);

  useEffect(() => {
    if (!loginInfo && baseApiUrl && questApiKey) {
      loginFlow(baseApiUrl, questApiKey, errorSuccessMap, apiResponse, addToAPIResponse, true);
    }
  }, []);

  const data = useMemo(
    () =>
      rawStatementData?.customerDomain?.accountStatements
        ?.sort((item1, item2) => {
          let sortCondition = new Date(item1?.effectiveDate) < new Date(item2?.effectiveDate) ? 1 : -1;
          if (isASCSort) {
            sortCondition = new Date(item1?.effectiveDate) > new Date(item2?.effectiveDate) ? 1 : -1;
          }
          return sortCondition;
        })
        ?.map((item) => ({
          ...item,
          formattedDate: formatDate(new Date(item?.effectiveDate)),
        })),
    [isASCSort, rawStatementData],
  );

  return (
    <>
      <FormSection
        spacingSize="macro1"
        sectionWidth="halfwidth"
      >
        {/* <DataList
        data={data}
        shouldHideEmptyValues={true}
        /> */}
        <Tabs
          defaultIndex={0}
          selectedTabClassName="is-selected"
          selectedTabPanelClassName="is-selected"
        >
          <TabList>
            <Tab>{accountToDateLabel}</Tab>
            <Tab>{dateRangeLabel}</Tab>
          </TabList>
          <TabPanel></TabPanel>
          <TabPanel>
            <DateFilterContainer>
              <Field className="filter-field">
                <FormLabel
                  htmlFor={'dateFrom'}
                  optional={false}
                >
                  {dateFromLabel}
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
              <Field className="filter-field">
                <FormLabel
                  htmlFor={'dateTo'}
                  optional={false}
                >
                  {dateToLabel}
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
            </DateFilterContainer>
          </TabPanel>
        </Tabs>
        <ButtonContainer>
          <ActionButton
            label={generateStatementCta}
            onClick={() => {
              console.log('CTA clicked');
              // handleAnalyticsClick('keyLinkInteraction', {
              //   keyLink: {
              //     // TODO: Update destinationURL once url is available
              //     linkDestinationURL: ANALYTICS_NOT_APPLICABLE_URL,
              //     linkOriginationPage: getFormattedPageName(),
              //     linkPosition: ANALYTICS_POSITION_INPAGE,
              //     linkTitle: accountDetailsJson.viewRepaymentsButtonText,
              //   },
            }}
          />
        </ButtonContainer>
        <HeadingWithDivider>{statementTitle}</HeadingWithDivider>
        {data?.length > 0 ? (
          <UiPaginatedTable
            accountStatementJson={accountStatementJson}
            data={data}
            isASCSort={isASCSort}
            setIsASCSort={setIsASCSort}
          />
        ) : (
          <NoDataText>{noStatementLabel}</NoDataText>
        )}
      </FormSection>
    </>
  );
};

export default AccountStatement;
