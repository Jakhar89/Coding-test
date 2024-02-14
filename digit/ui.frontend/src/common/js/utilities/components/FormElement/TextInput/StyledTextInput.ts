import styled, { css } from 'styled-components';

import { spacing } from '@/utility/props';
import { fixedBody16 } from '@/utility/styles/text';

import { TextInputStylingProps, TextInputProps } from './definitions';
import { createImportSpecifier } from 'typescript';

export const TextBoxInput = styled.input<TextInputStylingProps>`
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
  outline-offset: 0px;
  width: 100%;
  word-break: break-all;
  word-wrap: break-word;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border['border-2']};
  }

  &:focus {
    outline-color: ${({ theme }) => theme.colors.global['info-1']};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background['light-2']};
    pointer-events: none;
  }

  &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: ${({ theme }) => theme.colors.text.body['dark-2']};;
}

  &:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: ${({ theme }) => theme.colors.text.body['dark-2']};;
  }

  &:-ms-input-placeholder { /* Microsoft Edge */
    color: ${({ theme }) => theme.colors.text.body['dark-2']};;
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

export const TextArea = styled.textarea<TextInputProps>`
  ${fixedBody16}
  ${({ theme, isExtraSpacing }) =>
    isExtraSpacing
      ? spacing({ theme, py: '18px', px: '24px', mb: 0 })
      : spacing({ theme, py: '12px', px: '16px', m: 0 })};
  background-color: ${({ theme }) => theme.colors.background['light-1']};
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.border['border-1']};
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.text.body['dark-1']};
  height: 125px;
  line-height: 24px;
  outline-offset: 0px;
  resize: none;
  width: 100%;
  word-break: break-all;
  word-wrap: break-word;

  ${({ breakWord }) =>
    breakWord === false &&
    `
    word-break: unset;
    word-wrap: unset;
  `}

  &:hover {
    border-color: ${({ theme }) => theme.colors.border['border-2']};
  }

  &:focus {
    outline-color: ${({ theme }) => theme.colors.global['info-1']};
  }
`;
