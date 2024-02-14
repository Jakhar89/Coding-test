import React from 'react';
import { usePagination, useTable } from 'react-table';

import Tables from './Tables';

const RecentTransactionsTable = ({ attributes, data }) => {
  if (!data?.length) {
    return null;
  }

  const columns = [
    {
      Header: attributes?.date,
      accessor: 'transactionDate', // accessor is the "key" in the data
    },
    {
      Header: attributes?.paymentAmount,
      accessor: 'transactionAmount',
    },
    {
      Header: attributes?.balance,
      accessor: 'balance',
    },
  ];

  const tableInstance = useTable({ columns, data: data, autoResetHiddenColumns: false }, usePagination);

  // @ts-ignore
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups, // @ts-ignore
    page, // @ts-ignore
    prepareRow, // @ts-ignore
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
    </>
  );
};

export default RecentTransactionsTable;
