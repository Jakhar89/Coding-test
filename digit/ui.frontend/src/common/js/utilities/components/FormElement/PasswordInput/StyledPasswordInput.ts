import styled, { css } from 'styled-components';

import { spacing } from '@/utility/props';
import { fixedBody16 } from '@/utility/styles/text';

import { PasswordInputStylingProps } from './definitions';

export const PasswordInputField = styled.input<PasswordInputStylingProps>`
  ${fixedBody16}
  ${({ theme }) =>
    // prettier ignore
    spacing({
      theme,
      m: 0,
      px: '24px',
      py: '18px',
    })};
  background-color: ${({ theme }) => theme.colors.background['light-1']};
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.border['border-1']};
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.text.body['dark-1']};
  line-height: 24px;
  width: 100%;
  word-break: break-all;
  word-wrap: break-word;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border['border-2']};
  }

  &:focus {
    outline-color: ${({ theme }) => theme.colors.global['info-1']};
    outline-style: auto;
  }

  ${({ hasError }) =>
    hasError &&
    css`
    border: 2px solid ${({ theme }) => theme.colors.global['error-1']};

    &:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.global['error-1']};

      &:focus {
        outline-color: ${({ theme }) => theme.colors.global['error-1']};
      }
    }
  `}
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const IconWrapper = styled.button`
  ${({ theme }) => spacing({ theme, py: '18px', pr: '24px', pl: 0 })};
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;

  &:focus {
    outline: none;

    svg {
      outline: auto ${({ theme }) => theme.colors.global['info-1']};
    }
  }
`;
