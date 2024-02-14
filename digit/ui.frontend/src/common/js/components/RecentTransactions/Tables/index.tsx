import React, { useRef, useState } from 'react';

import {
  OverflowScroller,
  Table,
  TableBody,
  TableBodyRow,
  TableData,
  TableDataText,
  TableHead,
  TableHeading,
  TableHeadRow,
  TableWrapper,
} from './StyledTables';

const Tables = ({ getTableBodyProps, getTableProps, headerGroups, page, prepareRow }) => {
  const tableRef = useRef<null | HTMLElement>(null);
  const [shouldShowGradient, setShouldShowGradient] = useState(false);

  const onScroll = () => {
    const scrollLeft = tableRef?.current?.scrollLeft;
    scrollLeft && scrollLeft > 0 ? setShouldShowGradient(true) : setShouldShowGradient(false);
  };

  return (
    <TableWrapper tabIndex={0}>
      <OverflowScroller
        onScroll={onScroll}
        ref={tableRef as React.RefObject<HTMLDivElement>}
      >
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups?.map((headerGroup) => (
              <TableHeadRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup?.headers?.map((column) => (
                  <TableHeading
                    shouldShowGradient={shouldShowGradient}
                    {...column.getHeaderProps()}
                  >
                    {column.render('Header')}
                  </TableHeading>
                ))}
              </TableHeadRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page?.map((row) => {
              prepareRow(row);
              return (
                <TableBodyRow {...row.getRowProps()}>
                  {row?.cells?.map((cell) => {
                    return (
                      <TableData
                        shouldShowGradient={shouldShowGradient}
                        {...cell.getCellProps()}
                      >
                        <TableDataText>{cell.render('Cell')}</TableDataText>
                      </TableData>
                    );
                  })}
                </TableBodyRow>
              );
            })}
          </TableBody>
        </Table>
      </OverflowScroller>
    </TableWrapper>
  );
};

export default Tables;
