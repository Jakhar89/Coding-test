import React, { useEffect, useMemo, useState } from 'react';
// Read more at: https://react-table-v7.tanstack.com/docs/overview
import { usePagination, useTable } from 'react-table';

import Icon from '@/utility/components/Icon';
import Pagination from '@/utility/components/Pagination';
import Tables from '@/utility/components/Tables';
import { currencyFormatter } from '@/utility/helpers/string';

import { IconContainer, PaginationContainer, TableWrapper, TblHeader } from './StyledAccountStatement';

const UiPaginatedTable = ({ accountStatementJson, data, isASCSort, setIsASCSort }) => {
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

  const columns = useMemo(
    () => [
      {
        id: 'date',
        Header: (
          <TblHeader
            className="sortIcon"
            onClick={() => setIsASCSort((prevSort) => !prevSort)}
          >
            {accountStatementJson?.statementTableHeader1}
            {sortContainer}
          </TblHeader>
        ),
        accessor: (d) => <span className="tableData date">{d?.formattedDate}</span>,
      },
      {
        id: 'statement',
        Header: <TblHeader>{accountStatementJson?.statementTableHeader2}</TblHeader>,
        accessor: (d) => (
          <span className="tableData file">
            <a href={d?.url}>{d?.file}</a>
          </span>
        ),
      },
    ],
    [isASCSort],
  );

  // @ts-ignore
  const tableInstance = useTable({ columns, data: data, initialState: { pageSize: 7 } }, usePagination);

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
    <TableWrapper>
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
    </TableWrapper>
  );
};

export default UiPaginatedTable;
