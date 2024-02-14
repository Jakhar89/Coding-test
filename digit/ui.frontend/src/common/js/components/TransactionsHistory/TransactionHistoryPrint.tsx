import React, { useEffect, useState } from 'react';

import { default as UtilLogo } from '@/utility/components/Logo';
import { postCallAPI } from '@/utility/helpers/api';
import { formatDate } from '@/utility/helpers/dateTime';
import { capitalizeFirstLetter, currencyFormatter } from '@/utility/helpers/string';

import {
  PrintFooterContent,
  PrintFooterCopyWrapper,
  PrintFooterPageNumber,
  PrintFooterWrapper,
  PrintHeaderInfo,
  PrintHeaderInfoWrapper,
  PrintHeaderWrapper,
  PrintInfo,
  PrintInfoCopy,
  PrintInfoWrapper,
  PrintPageContentTable,
  PrintPageWrapper,
  PrintTableContent,
  PrintTableHeading,
  PrintTitle,
  PrintTitleContainer,
  PrintWrapper,
  TextPositive,
} from './StyledTransactionsHistory';

const TransactionHistoryPrint = ({
  data,
  selectedContract,
  transactionsHistoryJson,
  errorSuccessMap,
  filterDescription,
  filterSelect,
  filterDateFrom,
  filterDateTo,
  site,
}) => {
  const selectedContractId = selectedContract?.customerDomain?.contract?.contractId;

  const { brandPhNumber1, brandEmail1, brandPostalAddress, brandTransactionHistoryFooter } =
    transactionsHistoryJson?.brandVariablesConfig || {};

  const [vehicleData, setVehicleData] = useState<any>();
  const [rowDataByPage, setRowDataByPage] = useState<any>();
  const totalPages = data?.length > 12 ? Math.ceil((data?.length - 12) / 17) + 1 : 1;

  const dataBrokenIntoPages = () => {
    let currentPage = 1;
    const pagesData: any = { page1: [] };

    data.map((row, index) => {
      if (index < 12) {
        pagesData.page1.push(row);
      } else {
        if ((index - 11) % 17 === 1) {
          currentPage++;
          pagesData[`page${currentPage}`] = [];
        }
        pagesData[`page${currentPage}`].push(row);
      }
    });

    setRowDataByPage(pagesData);
  };

  useEffect(() => {
    dataBrokenIntoPages();
  }, [data]);

  const transformedDataFromAPI = (vehicle) => ({
    make: capitalizeFirstLetter(vehicle.vehicleSpecification.vehicleMake) ?? '',
    model: capitalizeFirstLetter(vehicle.vehicleSpecification.vehicleModel) ?? '',
    variant: vehicle.vehicleSpecification.vehicleModelVariant ?? '',
    year: vehicle.vehicleSpecification.vehicleYear ?? '',
    vin: vehicle.vehicle.vehicleIdentificationNumber ?? '',
    engineNum: vehicle.vehicleEngine.vehicleEngineNumber ?? '',
    vehicleRegNum: vehicle.vehicleRegistration.vehicleRegistrationNumber ?? '',
    vehicleRegState: vehicle.vehicleRegistration.vehicleRegistrationState ?? '',
  });

  useEffect(() => {
    if (!selectedContractId) return;
    const postData = {
      customerDomain: {
        contract: {
          contractId: selectedContractId,
        },
      },
    };

    const questApiKey = localStorage?.getItem('apiKey') ?? transactionsHistoryJson?.globalConfig?.questApiKey;
    const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? transactionsHistoryJson?.globalConfig?.baseApiUrl;

    postCallAPI('vehicle-details', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((response) => {
      if (response?.data) {
        const vehicle = response?.data?.assets[0]?.vehicleDomain;
        const data = transformedDataFromAPI(vehicle);
        setVehicleData(data);
      }
    });
  }, [selectedContract]);

  const PrintHeader = () => (
    <PrintHeaderWrapper>
      <UtilLogo
        site={site?.toLowerCase()}
        reversed={false}
      />
      <PrintHeaderInfoWrapper>
        <PrintHeaderInfo>{brandPhNumber1}</PrintHeaderInfo>
        <PrintHeaderInfo>Mon-Fri 8:30am - 7:00pm AEST</PrintHeaderInfo>
        <PrintHeaderInfo>{brandEmail1}</PrintHeaderInfo>
        <PrintHeaderInfo>{brandPostalAddress}</PrintHeaderInfo>
      </PrintHeaderInfoWrapper>
    </PrintHeaderWrapper>
  );

  const PrintPageOneContentBlock = () => (
    <PrintInfoWrapper>
      <PrintInfo>
        {`${transactionsHistoryJson?.accountNumberText}: `}
        <PrintInfoCopy>{selectedContractId}</PrintInfoCopy>
      </PrintInfo>
      <PrintInfo>
        <PrintInfoCopy>
          {`${vehicleData?.make ?? ''} ${vehicleData?.model ?? ''} ${vehicleData?.year ?? ''}`}
        </PrintInfoCopy>
      </PrintInfo>
      <PrintInfo>
        {`${transactionsHistoryJson?.transactionPeriodText}: `}
        <PrintInfoCopy>{`${filterDateFrom} to ${filterDateTo}`}</PrintInfoCopy>
      </PrintInfo>
      <PrintInfo>
        {`${transactionsHistoryJson?.filtersText}: `}
        <PrintInfoCopy>
          {filterSelect}
          {filterDescription ? ` / ${filterDescription}` : ''}
        </PrintInfoCopy>
      </PrintInfo>
      <PrintInfo>Page 1 of {totalPages}</PrintInfo>
    </PrintInfoWrapper>
  );

  const PrintFooter = ({ page = 1 }) => (
    <PrintFooterWrapper>
      <PrintFooterPageNumber>
        Page {page} of {totalPages}
      </PrintFooterPageNumber>
      <PrintFooterCopyWrapper>
        <PrintFooterContent>{brandTransactionHistoryFooter}</PrintFooterContent>
      </PrintFooterCopyWrapper>
    </PrintFooterWrapper>
  );

  const formatDateString = (date) => {
    return formatDate(new Date(date))
      .split('/')
      .map((item, index) => (index === 2 ? item.slice(2) : item))
      .join('/');
  };

  const processTransactionAmount = (amount) => {
    return <TextPositive isGreen={amount < 0 ? true : false}>{currencyFormatter(amount)}</TextPositive>;
  };

  const PrintPageTable = ({ pageData, page }) => {
    return (
      <PrintPageContentTable isFirstPage={page === 1}>
        <tbody>
          <tr>
            <PrintTableHeading className="dateRow">Date</PrintTableHeading>
            <PrintTableHeading className="desctiptionRow">Description</PrintTableHeading>
            <PrintTableHeading className="amountRow">Amount</PrintTableHeading>
            <PrintTableHeading
              className="balanceRow"
              isLast={true}
            >
              Balance
            </PrintTableHeading>
          </tr>
          {pageData &&
            pageData?.map((row, index) => {
              return (
                <tr key={index}>
                  <PrintTableContent>{formatDateString(row?.date)}</PrintTableContent>
                  <PrintTableContent>{row?.description}</PrintTableContent>
                  <PrintTableContent>{processTransactionAmount(row?.amount ? row?.amount : 0)}</PrintTableContent>
                  <PrintTableContent
                    isBoldBlack={true}
                    isLast={true}
                  >
                    {currencyFormatter(row?.principalOutstanding)}
                  </PrintTableContent>
                </tr>
              );
            })}
        </tbody>
      </PrintPageContentTable>
    );
  };

  return (
    <PrintWrapper className="transaction-history-print-area">
      {rowDataByPage &&
        Object.keys(rowDataByPage).map((key, index) => {
          return (
            <PrintPageWrapper key={index}>
              <PrintHeader />
              {index === 0 && (
                <>
                  <PrintPageOneContentBlock />
                  <PrintTitleContainer>
                    <PrintTitle>{transactionsHistoryJson?.transactionTitle}</PrintTitle>
                  </PrintTitleContainer>
                </>
              )}
              <PrintPageTable
                pageData={rowDataByPage[key]}
                page={index + 1}
              />
              <PrintFooter page={index + 1} />
            </PrintPageWrapper>
          );
        })}
    </PrintWrapper>
  );
};

export default TransactionHistoryPrint;
