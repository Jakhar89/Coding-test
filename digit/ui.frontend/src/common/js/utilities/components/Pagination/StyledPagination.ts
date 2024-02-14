import styled, { css } from 'styled-components';

import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { boldFixedBody14 } from '@/utility/styles/text';

import { PaginationStyleProps } from '../../../components/BillingSchedule/definitions';

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  ${({ theme }) => spacing({ theme, mt: '32px' })};
`;

export const PreviousPageButton = styled.button<PaginationStyleProps>`
  ${({ theme }) => spacing({ theme, pl: 0, pr: '26px' })};
  background: transparent;
  border: none;
  cursor: pointer;

  ${mq.lessThan('md')} {
    ${({ canPreviousPage }) =>
      !canPreviousPage &&
      css`
      div {
        svg path {
          fill: ${({ theme }) => theme.colors.button.primary['disabled-1']};
        }
      }
    `}
  }

  ${mq('md')} {
    display: ${({ canPreviousPage }) => (!canPreviousPage ? 'none' : 'block')};
  }
`;

export const NextPageButton = styled.button<PaginationStyleProps>`
  ${({ theme }) => spacing({ theme, pl: '26px', pr: 0 })};
  background: transparent;
  border: none;
  cursor: pointer;

  ${mq.lessThan('md')} {
    ${({ canNextPage }) =>
      !canNextPage &&
      css`
      div {
        svg path {
          fill: ${({ theme }) => theme.colors.button.primary['disabled-1']};
        }
      }
    `}
  }

  ${mq('md')} {
    display: ${({ canNextPage }) => (!canNextPage ? 'none' : 'block')};
  }
`;

export const PageIndexButton = styled.button<PaginationStyleProps>`
  ${({ theme }) => spacing({ theme, px: '13px', py: '8px' })};
  background: transparent;
  border: none;
  cursor: pointer;

  ${({ isCurrentPage }) =>
    isCurrentPage &&
    css`
    background: ${({ theme }) => theme.colors.icon['light-2']};
    color: ${({ theme }) => theme.colors.text.body['light-1']};
  `}

  &:active, &:focus {
    background: ${({ theme }) => theme.colors.icon['light-2']};
    color: ${({ theme }) => theme.colors.text.body['light-1']};
  }

  ${mq.lessThan('md')} {
    display: none;
  }
`;

export const PageIndexButtonText = styled.span`
  ${boldFixedBody14}
`;

export const PageDisplayOptions = styled.span`
  ${boldFixedBody14}
  margin-bottom: 0 !important;

  ${mq('md')} {
    display: none;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 24px;

  svg {
    width: 24px;
  }
`;
