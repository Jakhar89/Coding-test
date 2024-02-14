import styled, { createGlobalStyle, css } from 'styled-components';

import Grid from '@/utility/components/Grid2';
import { mq } from '@/utility/styles';
import {
  body1,
  boldBody1,
  boldFixedBody10,
  boldFixedBody12,
  fixedBody10,
  fixedBody14,
  fixedBody8,
  headingWithDivider,
} from '@/utility/styles/text';

const GlobalStyle = createGlobalStyle`
  .print-enabled {
    @page {
      margin: 0 !important;
    }
  }

  @media print {

    html, body {
      margin: 0 !important;
    }
    
    .print-enabled .container.bg--white .cmp-container--fixed {
      padding: 0 !important;
    }

    .print-enabled iframe,
    .print-enabled .hide-in-print {
        display: none !important;
    }
    
  }
`;

export const Wrapper = styled.div`
    display:grid;
    border-bottom: 2px solid ${({ theme }) => theme.colors.background['light-2']};
    margin-bottom: 30px;

    ${mq('lg')}{
        margin-bottom: 60px;
    }
`;

export const InnerWrapper = styled(Grid.Item)`
    ${mq('xs')}{
        max-width:none;
        width:auto;
    }
    
`;

export const GridItem = styled(Grid.Item)`
    & .filter-field{
        width:100%;
        margin-bottom: 16px;

        ${mq('lg')}{
            margin-bottom: 24px;
        }
    }
`;

export const PaginationContainer = styled.div<{ isActive: boolean }>`
    ${({ isActive }) => !isActive && `display: none;`}
`;

export const Title = styled(Grid.Item)`
  ${fixedBody14}
  color: ${({ theme }) => theme.colors.text.body['dark-2']}
  text-align:center;
  justify-content: center;
  padding:0!important;
  margin-bottom:0 !important;
`;

export const TblHeader = styled.div`
    display: flex;
    align-items: end;
    min-height: 36px;

    &.sortIcon {
        cursor: pointer;
    }
`;

export const IconContainer = styled.div`
    display: inline-block;
    line-height: 100%;
    
    svg {
        width: 28px;

        ${mq('md')}{
            width: 36px;
        }
    }
`;

export const TitleContainer = styled.div`
    margin-bottom: 24px;

    ${mq('lg')}{
        display: flex;
        margin-bottom: 36px;
    }

    ${mq.lessThan('lg')}{
        .transHistoryButton {
            margin-bottom: 0;
        }
    }
`;

export const NoDataText = styled.div`
  ${body1}
  color: ${({ theme }) => theme.colors.text.body['dark-2']};
`;

export const PrintWrapper = styled.div`
  display: none;

  @media print {
    display: block;
    zoom: 133.2%;
  }

  @page {
    margin: 0;
  }
}
`;

export const PrintPageWrapper = styled.div`
  width: 595px;
  height: 842px;
  padding: 20px 23px; 
  box-sizing: border-box;
  position: relative;
`;

export const PrintInfoWrapper = styled.div`
  padding: 16px 21px;
  border: 1px solid rgba(0, 0, 0, 1);
`;

export const PrintHeaderInfoWrapper = styled.div`
  text-align: right;
  max-width: 50%;
`;

export const PrintHeaderInfo = styled.p`
  ${fixedBody8}
  margin: 0;
`;

export const PrintInfo = styled.p`
  ${fixedBody10}
  margin: 0;
`;

export const PrintInfoCopy = styled.span`
  ${boldFixedBody10}
`;

export const PrintHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 15px;
`;

export const PrintTitleContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
`;

export const PrintTitle = styled.h2`
  ${headingWithDivider(boldBody1)};
  font-size: 20px !important;
  line-height: 28px !important;
  margin-bottom: 10px !important;
  word-break: break-word;

  &:before {
    margin-bottom: 10px !important;
  }
`;

export const PrintFooterWrapper = styled.div`
  display: block;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0 12px;
  box-sizing: border-box;
`;

export const PrintFooterPageNumber = styled.p`
  ${fixedBody8};
  color: rgba(0, 0, 0, 1);
  width: 100%;
  text-align: right;
  padding-right: 12px;
  box-sizing: border-box;
`;
export const PrintFooterCopyWrapper = styled.div`
  display: flex;
  height: 54px;
  justify-content: center;
  align-items: center
  margin: 12px 0 0;
  border-top: 1px solid rgba(204, 204, 204, 1);
`;
export const PrintFooterContent = styled.p`
  ${fixedBody8};
  margin: 0;
  color: ${({ theme }) => theme.colors.text.body['dark-2']};
`;

export const PrintPageContentTable = styled.table<{ isFirstPage: boolean }>`
  ${({ isFirstPage }) => !isFirstPage && 'margin-top: 44px;'};
  border-spacing: 0;
`;

export const PrintTableHeading = styled.th<{ isLast?: boolean }>`
  ${boldFixedBody12};
  color: ${({ theme }) => theme.colors.text.heading['dark-1']};
  ${({ isLast }) => !isLast && 'padding-right: 20px;'}
  text-align: left;
  padding-bottom: 15px;

  &.dateRow {
    width: 105px;
  }

  &.desctiptionRow {
    width: 179px;
  }

  &.amountRow {
    width: 125px;
  }

  &.balanceRow {
    width: 75px;
  }

`;

export const PrintTableContent = styled.td<{ isBoldBlack?: boolean; isLast?: boolean }>`
  ${fixedBody10};
  color: ${({ theme }) => theme.colors.text.body['dark-2']} !important;
  ${({ isBoldBlack, theme }) =>
    isBoldBlack &&
    `
    font-weight: bold;
    color: ${theme.colors.text.body['dark-1']} !important;
  `};
  height: 33px;
  margin-bottom: 5px;
  vertical-align: top;

  ${({ isLast }) => !isLast && 'padding-right: 15px;'}

  @media print {
    color: ${({ theme }) => theme.colors.text.body['dark-2']} !important;
    -webkit-print-color-adjust: exact; 

    ${({ isBoldBlack, theme }) =>
      isBoldBlack &&
      `
    font-weight: bold;
    color: ${theme.colors.text.body['dark-1']} !important;
  `};
  }
`;

export const TextPositive = styled.span<{ isGreen: boolean }>`
  ${({ isGreen, theme }) => isGreen && `color: ${theme.colors.global['text-green']};`}

  @media print {
    ${({ isGreen, theme }) => isGreen && `color: ${theme.colors.global['text-green']} !important;`}
    -webkit-print-color-adjust: exact; 
  }
`;

export default GlobalStyle;
