import React, { useEffect } from 'react';
// Read more at: https://react-table-v7.tanstack.com/docs/overview
import { usePagination, useTable } from 'react-table';

import Pagination from '@/utility/components/Pagination';
import Tables from '@/utility/components/Tables';

const UiBillingTable = ({ billingData }) => {
  if (!billingData?.length) {
    return null;
  }

  // const payments = [
  //   {
  //     paymentDate: '16/01/22',
  //     paymentAmount: '$311.55',
  //     adminFee: '$4.00',
  //     totalRepayment: '$315.55',
  //   },
  //   {
  //     paymentDate: '16/02/22',
  //     paymentAmount: '$311.55',
  //     adminFee: '$4.00',
  //     totalRepayment: '$315.55',
  //   },
  //   {
  //     paymentDate: '16/03/22',
  //     paymentAmount: '$311.55',
  //     adminFee: '$4.00',
  //     totalRepayment: '$315.55',
  //   },
  //   {
  //     paymentDate: '16/04/22',
  //     paymentAmount: '$311.55',
  //     adminFee: '$4.00',
  //     totalRepayment: '$315.55',
  //   },
  //   {
  //     paymentDate: '16/05/22',
  //     paymentAmount: '$311.55',
  //     adminFee: '$4.00',
  //     totalRepayment: '$315.55',
  //   },
  //   {
  //     paymentDate: '16/06/22',
  //     paymentAmount: '$311.55',
  //     adminFee: '$4.00',
  //     totalRepayment: '$315.55',
  //   },
  //   {
  //     paymentDate: '16/07/22',
  //     paymentAmount: '$311.55',
  //     adminFee: '$4.00',
  //     totalRepayment: '$315.55',
  //   },
  //   {
  //     paymentDate: '16/08/22',
  //     paymentAmount: '$311.55',
  //     adminFee: '$4.00',
  //     totalRepayment: '$315.55',
  //   },
  //   {
  //     paymentDate: '16/09/22',
  //     paymentAmount: '$311.55',
  //     adminFee: '$4.00',
  //     totalRepayment: '$315.55',
  //   },
  //   {
  //     paymentDate: '16/10/22',
  //     paymentAmount: '$311.55',
  //     adminFee: '$4.00',
  //     totalRepayment: '$315.55',
  //   },
  //   {
  //     paymentDate: '16/11/22',
  //     paymentAmount: '$311.55',
  //     adminFee: '$4.00',
  //     totalRepayment: '$315.55',
  //   },
  // ];

  const columns = React.useMemo(
    () => [
      {
        Header: 'Payment date',
        accessor: 'paymentDate', // accessor is the "key" in the data
      },
      {
        Header: 'Payment amount',
        accessor: 'paymentAmount',
      },
      {
        Header: 'Admin fee',
        accessor: 'adminFee',
      },
      {
        Header: 'Total repayment',
        accessor: 'totalRepayment',
      },
    ],
    [],
  );

  const tableInstance = useTable({ columns, data: billingData }, usePagination);

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
      <Pagination
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        gotoPage={gotoPage}
        nextPage={nextPage}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        previousPage={previousPage}
      />
    </>
  );
};

export default UiBillingTable;
