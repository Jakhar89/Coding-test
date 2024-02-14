import styled from 'styled-components';

import { body3 } from '@/utility/styles/text';
import { mq, svg } from '@/utility/styles';
import { spacing } from '@/utility/props';

export const Container = styled.div`
  ${({ theme }) => spacing({ theme, py: 'micro3', px: 'micro1' })};
  align-items: flex-start;
  box-sizing: border-box;
  display: flex;
  width: 100%;

  &.error {
    background-color: ${({ theme }) => theme.colors.global['error-2']};
    border-bottom: 2px solid ${({ theme }) => theme.colors.global['error-1']};
  }

  &.info {
    background-color: ${({ theme }) => theme.colors.global['info-2']};
    border-bottom: 2px solid ${({ theme }) => theme.colors.global['info-1']};
  }

  &.success {
    background-color: ${({ theme }) => theme.colors.global['success-2']};
    border-bottom: 2px solid ${({ theme }) => theme.colors.global['success-1']};
  }

  &.warning {
    background-color: ${({ theme }) => theme.colors.global['warning-2']};
    border-bottom: 2px solid ${({ theme }) => theme.colors.global['warning-1']};
  }

  ${mq('md')} {
    align-items: center;
  }
`;

export const Description = styled.span`
  ${body3}
  margin-bottom: 0 !important;
  word-break: break-word;
`;

export const IconWrapper = styled.div`
  ${({ theme }) => spacing({ theme, pr: '12px' })};
  ${svg(22, 19)};
  min-width: 24px;
  width: 24px;

  ${mq('md')} {
    ${svg(29, 25)};
    min-width: 32px;
    width: 32px;
  }
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: auto;
  padding: 0;

  svg {
    ${svg(14, 14)};
    min-width: 24px;
    width: 24px;
  }
`;
