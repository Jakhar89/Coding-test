import styled from 'styled-components';

import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { body1, boldBody1 } from '@/utility/styles/text';

export const TableWrapper = styled.div`
  position: relative;
  width: 100%;

  ${mq.lessThan('md')} {
    &::after {
      content: '';
      height: 100%;
      pointer-events: none;
      position: absolute;
      right: 0;
      top: 0;
      width: 45px;
    }
  }
`;

export const OverflowScroller = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const TableHead = styled.thead`
  width: 100%;
`;

export const TableHeadRow = styled.tr``;

export const TableHeading = styled.th`
  ${boldBody1}
  ${({ theme }) =>
    spacing({
      theme,
      pb: { xs: '12px', md: '25px' },
      pr: { xs: 'micro4', md: 'micro5', lg: 'micro3' },
    })};
  color: ${({ theme }) => theme.colors.text.heading['dark-1']};
  text-align: left;
  vertical-align: top;
  width: 33%;

  ${mq.lessThan('md')} {

    &:first-child {
      background-color: ${({ theme }) => theme.colors.background['light-1']};
      left: 0;
      position: sticky;
    }
  }

  ${mq('md')} {
    &:last-child {
      padding-right: 0;
    }
  }
  
  ${mq('lg')} {
    &:last-child {
      text-align: right;
    }
  }
`;

export const TableBody = styled.tbody`
  width: 100%;
`;

export const TableBodyRow = styled.tr`
  width: 100%;

  &:last-child {
    td {
      padding-bottom: 0 !important;
    }
  }
`;

export const TableData = styled.td`
  ${({ theme }) => spacing({ theme, pb: { xs: 'micro4', md: '29px' }, pr: { xs: '10px' } })};

  &:last-child {
    padding-right: 0;
    span {
      color: ${({ theme }) => theme.colors.text.body['dark-1']};
    }
  }

  ${mq('lg')} {
    &:last-child {
      text-align: right;
      span {
        font-weight: 700 !important;
      }
    }
  }

  ${mq.lessThan('md')} {
    &:first-child {
      background-color: ${({ theme }) => theme.colors.background['light-1']};
      left: 0;
      position: sticky;
    }
  }
`;

export const TableDataText = styled.span`
  ${body1}
  color: ${({ theme }) => theme.colors.text.body['dark-2']};

  ${mq('md')} {
    font-size: 16px;
  }

  ${mq('lg')} {
    font-size: 18px;
  }

  ${mq('xl')} {
    font-size: 20px;
  }
`;
