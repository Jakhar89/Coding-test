import styled, { css } from 'styled-components';

import { spacing } from '@/utility/props';
import { fixedBody16 } from '@/utility/styles/text';

import { RadioStylingProps } from './definitions';

export const RadioContainer = styled.div<RadioStylingProps>`
  ${({ hasError }) =>
    hasError &&
    css`
    ${({ theme }) => spacing({ theme, p: '8px' })};
    border-radius: 6px;
    border: 2px solid ${({ theme }) => theme.colors.global['error-1']};
  `}

  ${({ verticalAlign }) =>
    verticalAlign &&
    css`
      display: flex;
      flex-direction: column;
  `}

  ${({ gridChilds }) =>
    gridChilds &&
    css`
      display: grid;
      grid-template-columns: repeat(${gridChilds}, 1fr)
  `}
`;

export const RadioLabel = styled.label<RadioStylingProps>`
  ${fixedBody16}
  ${({ theme }) => spacing({ theme, mr: '32px', mb: '6px' })};
  align-items: center;
  display: inline-flex;
  max-width: 148px;
  max-width: ${({ isFullWidth }) => (isFullWidth ? '100%' : '148px')};;
  position: relative;
  user-select: none;
  vertical-align: top;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ disabled, theme }) =>
    disabled ? theme.colors.button.primary['disabled-1'] : theme.colors.text.body['dark-1']};

  &:last-child {
    ${({ theme }) => spacing({ theme, mr: 0 })};
  }

  ${({ verticalAlign }) =>
    verticalAlign &&
    css`
     ${({ theme }) => spacing({ theme, mr: 0, mb: '20px' })};
      
     &:last-child {
       ${({ theme }) => spacing({ theme, mb: 0 })};
     }
  `}

  input {
    &.formik-field-radio {
      ${({ theme }) => spacing({ theme, my: '2px', mr: '13px', ml: '1px' })};
      flex-shrink: 0;
      height: 24px;
      overflow: visible;
      position: relative;
      width: 24px;
      cursor: pointer;

      &:focus {
        outline-color: transparent;
      }

      ::before {
        ${({ theme }) => spacing({ theme, mr: '12px' })};
        background-color: ${({ theme }) => theme.colors.background['light-1']};
        border-radius: 50%;
        border: 2px solid ${({ theme }) => theme.colors.border['border-1']};
        content: '';
        height: 24px;
        left: -1px;
        position: absolute;
        top: -1px;
        width: 24px;
      }

      &:checked::after {
        border-radius: 50%;
        border-width: 8px !important;
        border: 5px solid ${({ theme }) => theme.colors.icon['dark-1']};
        content: '';
        left: 5px;
        position: absolute;
        top: 5px;
      }

      &:hover::before {
        border-color: ${({ theme }) => theme.colors.border['border-2']};
        border-width: 2px;
      }

      &:focus::before {
        border-color: ${({ theme }) => theme.colors.global['info-1']};
        border-width: 2px;
      }

      &:checked::before {
        background-color: ${({ theme }) => theme.colors.background['light-1']};
        border-color: ${({ theme }) => theme.colors.border['border-1']};
        border-radius: 50%;
      }

      &:hover:checked::before {
        background-color: ${({ theme }) => theme.colors.background['light-1']};
        border-color: ${({ theme }) => theme.colors.border['border-2']};
      }

      &:hover:checked::after {
        border-color: ${({ theme }) => theme.colors.border['border-2']};
      }

      &:checked:focus::before {
        background-color: ${({ theme }) => theme.colors.background['light-1']};
        border-color: ${({ theme }) => theme.colors.global['info-1']};
      }

      &:disabled {
        cursor: default;
      }

      &:disabled::before {
        background-color: ${({ theme }) => theme.colors.background['light-2']} !important;
        border-color: ${({ theme }) => theme.colors.border['border-1']} !important;
        border-width: 2px !important;
      }

      &:disabled:checked::after {
        border-color: ${({ theme }) => theme.colors.border['border-1']};
      }

      &.error-border::before {
        background-color: ${({ theme }) => theme.colors.background['light-1']};
        border-color: ${({ theme }) => theme.colors.border['border-1']};
      }
    }
  }
`;
