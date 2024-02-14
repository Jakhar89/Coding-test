import styled, { css } from 'styled-components';

import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { body0, body1, headingH6 } from '@/utility/styles/text';

import { TablesStyleProps } from '../../../components/BillingSchedule/definitions';

export const TableWrapper = styled.div<TablesStyleProps>`
  position: relative;
  width: 100%;

  ${mq.lessThan('md')} {
    &::after {
      content: '';
      background: linear-gradient(270deg, #FFFFFF 20.83%, rgba(255, 255, 255, 0) 100%);
      height: 100%;
      pointer-events: none;
      position: absolute;
      right: 0;
      top: 0;
      width: 45px;
    }
  }
`;

export const OverflowScroller = styled.div<TablesStyleProps>`
  overflow-x: auto;
  overflow-y: clip;
`;

export const Table = styled.table`
  border-collapse: collapse;

  ${mq('xl')} {
    width: 100%;
  }
`;

export const TableHead = styled.thead`
  width: 100%;
`;

export const TableHeadRow = styled.tr``;

export const TableHeading = styled.th<TablesStyleProps>`
  ${headingH6}
  ${({ theme }) =>
    spacing({
      theme,
      pb: { xs: '12px', md: '20px' },
      pr: { xs: 'micro4', md: 'micro5', lg: 'micro3' },
    })};
  color: ${({ theme }) => theme.colors.text.heading['dark-1']};
  text-align: left;
  vertical-align: top;

  ${mq.lessThan('md')} {
    min-width: 86px;

    &:first-child {
      background-color: ${({ theme }) => theme.colors.background['light-1']};
      left: 0;
      position: sticky;

      ${({ shouldShowGradient }) =>
        shouldShowGradient &&
        css`
         &::after {
          background: linear-gradient(90deg, #C4C4C4 -50%, rgba(196, 196, 196, 0) 58.66%);
          content: '';
          height: 100%;
          position: absolute;
          right: -9px;
          top: 0;
          width: 9px;
        }
     `}
    }
  }

  ${mq('md')} {
    &:last-child {
      padding-right: 0;
    }
  }

  ${mq.between('lg', 'xl')} {
    min-width: 210px;
  }

  ${mq.between('md', 'lg')} {
    min-width: 150px;
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

export const TableData = styled.td<TablesStyleProps>`
  ${({ theme }) => spacing({ theme, pb: { xs: 'micro4', md: '20px' }, pr: { xs: 'micro4', md: '20px' } })};

  &:last-child {
    padding-right: 0;

    span {
      ${body0}
      color: ${({ theme }) => theme.colors.text.body['dark-1']};
    }
  }

  ${mq.lessThan('md')} {
    &:first-child {
      background-color: ${({ theme }) => theme.colors.background['light-1']};
      left: 0;
      position: sticky;

      ${({ shouldShowGradient }) =>
        shouldShowGradient &&
        css`
          &::after {
            background: linear-gradient(90deg, #C4C4C4 -50%, rgba(196, 196, 196, 0) 58.66%);
            content: '';
            height: 100%;
            position: absolute;
            right: -9px;
            top: 0;
            width: 9px;
        }
     `}
    }
  }
`;

export const TableDataText = styled.span`
  ${body1}
  color: ${({ theme }) => theme.colors.text.body['dark-2']};
`;
