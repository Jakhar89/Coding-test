import React, { useEffect, useState } from 'react';

import { userStore } from '@/context/User/User';
import { AEMProps } from '@/types/global/aem-definition';
import DataList from '@/utility/components/DataList';
import FormSection from '@/utility/components/FormElement/FormSection';
import { HeadingWithDivider } from '@/utility/components/FormElement/StyledFormSection';
import { loginFlow, postCallAPI } from '@/utility/helpers/api';
import { TransactionsProps } from '@/utility/helpers/api/transactionsHistory/definitions';
import { formatDateUS } from '@/utility/helpers/dateTime';
import { currencyFormatter } from '@/utility/helpers/string';

import { AnnualInterestParsedProps } from './definitions';

const AnnualInterest = ({ attributes, errorSuccessMap }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }
  const annualInterestJson: AnnualInterestParsedProps = JSON.parse(attributes);
  const { apiResponse, addToAPIResponse, selectedContract, setSelectedContract } = userStore();
  const { contractsData, loginInfo } = apiResponse || {};

  const [dataList, setDataList] = useState<any[]>([]);

  const questApiKey = localStorage?.getItem('apiKey') ?? annualInterestJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? annualInterestJson?.globalConfig?.baseApiUrl;

  const transactionsData = (start, end) => {
    const postData = {
      customerDomain: {
        contract: {
          contractId: `${selectedContract?.customerDomain?.contract?.contractId}`,
          contractStartDate: `${start}`,
          contractEndDate: `${end}`,
        },
      },
    };
    return postCallAPI('transactions-history', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then(
      (res) => {
        const data: TransactionsProps = res?.data;
        return data;
      },
    );
  };

  const getFinancialYear = (startDate, todayDate) => {
    // Extract the year from the start date and today's date
    const startYear = startDate.getFullYear();
    const todayYear = todayDate.getFullYear();
    const financialStart = (year): any => `${year}-07-01`; // AU financial year starts from 1st July
    const financialEnd = (year): any => `${year}-06-30`; // AU financial year ends on 31st June

    // Get the financial year for the start date
    const startFinancialYear = startDate.getMonth() >= 6 ? startYear + 1 : startYear;

    // Get the last financial year for last date
    const todayFinancialYear = todayDate.getMonth() >= 6 ? todayYear + 1 : todayYear;

    // Generate the financial year based Array of objects
    const financialYearRange = () => {
      let yearsToCalculate: any[] = [];
      let totalFinancialYears = todayFinancialYear - startFinancialYear;

      //formatting the Start and END date as required by API
      startDate = formatDateUS(startDate);
      todayDate = formatDateUS(todayDate);

      /**Creating object as per DataList component to render */
      const dataToShow = (year: any, interest: any): any => ({
        title: annualInterestJson.setSuffixYear
          ? `${annualInterestJson.financialYearText} ${year}`
          : `${year} ${annualInterestJson.financialYearText}`,
        value: interest,
      });

      for (let years = 0; years <= totalFinancialYears; years++) {
        switch (years) {
          case 0:
            const endY: any = financialEnd(startFinancialYear);
            //Pushing Promises for first financial year
            yearsToCalculate.push(
              transactionsData(startDate, endY).then((data) => {
                if (data) {
                  const interestAccrued =
                    data?.customerDomain?.financialTransactionAccount?.interestAccruedPerDateRange;
                  const yearToMention = startFinancialYear;

                  return dataToShow(yearToMention, interestAccrued);
                }
              }),
            );

            break;
          default:
            //Pushing Promises for each financial year afterwards
            yearsToCalculate.push(
              transactionsData(
                financialStart(startFinancialYear + (years - 1)),
                financialEnd(startFinancialYear + years),
              ).then((data) => {
                if (data) {
                  const interestAccrued =
                    data?.customerDomain?.financialTransactionAccount?.interestAccruedPerDateRange;
                  const yearToMention = startFinancialYear + years;

                  return dataToShow(yearToMention, interestAccrued);
                }
              }),
            );

            break;
        }
      }
      return yearsToCalculate;
    };

    return financialYearRange();
  };
  useEffect(() => {
    if (contractsData && !selectedContract) {
      setSelectedContract(contractsData?.contracts?.[0]);
    }
    if (selectedContract) {
      const todayDate = new Date();
      const contractStartDate = new Date(`${selectedContract?.customerDomain?.contract?.contractStartDate}`);
      const contractEndDate =
        todayDate < new Date(`${selectedContract?.customerDomain?.contract?.contractEndDate}`)
          ? todayDate
          : new Date(`${selectedContract?.customerDomain?.contract?.contractEndDate}`);

      const financialYear = getFinancialYear(contractStartDate, contractEndDate);

      Promise.all([...financialYear]).then((val) => {
        //Setting final DataList to render
        const formattedValue = val.map((item) => {
          return {
            ...item,
            value: currencyFormatter(item?.value),
          };
        });
        setDataList(formattedValue);
      });
    }
  }, [contractsData, selectedContract]);

  useEffect(() => {
    if (!loginInfo && baseApiUrl && questApiKey) {
      loginFlow(baseApiUrl, questApiKey, errorSuccessMap, apiResponse, addToAPIResponse, true);
    }
  }, []);

  return (
    <FormSection
      spacingSize="macro2"
      sectionWidth="halfwidth"
    >
      <HeadingWithDivider>{annualInterestJson.annualInterestLabelText}</HeadingWithDivider>
      <DataList data={dataList} />
    </FormSection>
  );
};

export default AnnualInterest;
