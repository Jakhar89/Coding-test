import React, { useEffect } from 'react';
// Read more at: https://react-table-v7.tanstack.com/docs/overview
import { usePagination, useTable } from 'react-table';

import Icon from '@/utility/components/Icon';
import Pagination from '@/utility/components/Pagination';
import Tables from '@/utility/components/Tables';
import { currencyFormatter } from '@/utility/helpers/string';

import { IconContainer, PaginationContainer, TblHeader, TextPositive } from './StyledTransactionsHistory';

const UiPaginatedTable = ({ transactionsHistoryJson, data, isASCSort, setIsASCSort }) => {
  if (!data?.length) {
    return null;
  }

  const sortContainer = (
    <IconContainer>
      <Icon
        name={isASCSort ? 'sorting2' : 'sorting1'}
        isFunctional={true}
        fill="currentColor"
      />
    </IconContainer>
  );

  const processTransactionAmount = (amount) => {
    return <TextPositive isGreen={amount < 0 ? true : false}>{currencyFormatter(amount)}</TextPositive>;
  };

  const columns = React.useMemo(
    () => [
      {
        id: 'date',
        Header: (
          <TblHeader
            className="sortIcon"
            onClick={() => setIsASCSort((prevSort) => !prevSort)}
          >
            {transactionsHistoryJson?.tableHeader1}
            {sortContainer}
          </TblHeader>
        ),
        accessor: (d) => d?.formattedDate,
      },
      {
        id: 'description',
        Header: <TblHeader>{transactionsHistoryJson?.tableHeader2}</TblHeader>,
        accessor: 'description',
      },
      {
        id: 'Amount',
        Header: <TblHeader>{transactionsHistoryJson?.tableHeader3}</TblHeader>,
        accessor: (d) => processTransactionAmount(d?.amount),
      },
      {
        id: 'balance',
        Header: <TblHeader>{transactionsHistoryJson?.tableHeader4}</TblHeader>,
        accessor: (d) => currencyFormatter(d?.principalOutstanding),
      },
    ],
    [isASCSort],
  );

  const tableInstance = useTable({ columns, data: data }, usePagination);

  // @ts-ignore
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups, // @ts-ignore
    page, // @ts-ignore
    prepareRow, // @ts-ignore
    canPreviousPage, // @ts-ignore
    canNextPage, // @ts-ignore
    pageOptions, // @ts-ignore
    gotoPage, // @ts-ignore
    nextPage, // @ts-ignore
    previousPage, // @ts-ignore
    state: { pageIndex },
  } = tableInstance;

  return (
    <>
      <Tables
        getTableBodyProps={getTableBodyProps}
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        page={page}
        prepareRow={prepareRow}
      />
      <PaginationContainer
        className="filter-field"
        isActive={data?.length > 10}
      >
        <Pagination
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
          gotoPage={gotoPage}
          nextPage={nextPage}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          previousPage={previousPage}
        />
      </PaginationContainer>
    </>
  );
};

export default UiPaginatedTable;
