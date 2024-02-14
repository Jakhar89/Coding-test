import React from 'react';

import Icon from '@/utility/components/Icon';

import {
  IconWrapper,
  NextPageButton,
  PageDisplayOptions,
  PageIndexButton,
  PageIndexButtonText,
  PaginationWrapper,
  PreviousPageButton,
} from './StyledPagination';

//prettier-ignore
const Pagination = ({ canNextPage, canPreviousPage, gotoPage, nextPage, pageIndex, pageOptions, previousPage }) => {
  const currentPage = pageIndex + 1;

  return (
    <PaginationWrapper className="pagination">
      <PreviousPageButton onClick={() => previousPage()} disabled={!canPreviousPage} canPreviousPage={canPreviousPage} aria-label="Go to Previous Page">
        <IconWrapper>
          <Icon name={'arrow-backward'} isFunctional={true} />
        </IconWrapper>
      </PreviousPageButton>
      <PageDisplayOptions>
        Page {currentPage} of {pageOptions.length}
      </PageDisplayOptions>
      {pageOptions.map((__, index) => {
        const displayIndex = index + 1;
        const page = index;
        const onClick = () => {
          gotoPage(page);
        };
        const isCurrentPage = currentPage === displayIndex;

        return (
          <PageIndexButton isCurrentPage={isCurrentPage} key={index} onClick={onClick} aria-label={`Go to Page ${displayIndex}`}>
            <PageIndexButtonText>{displayIndex}</PageIndexButtonText>
          </PageIndexButton>
        );
      })}
      <NextPageButton onClick={() => nextPage()} disabled={!canNextPage} canNextPage={canNextPage} aria-label="Go to Next Page">
        <IconWrapper>
          <Icon name={'arrow-forward'} isFunctional={true} />
        </IconWrapper>
      </NextPageButton>
    </PaginationWrapper>
  );
};

export default Pagination;
