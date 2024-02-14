import styled from 'styled-components';

import { fixedBody16 } from '@/utility/styles/text';
import { mq } from '@/utility/styles';
import { spacing } from '@/utility/props';

import { CheckboxStyleProps } from './definitions';

export const CheckboxLabel = styled.label<CheckboxStyleProps>`
  ${fixedBody16}
  ${({ theme, marginTopSize }) => spacing({ theme, mr: '32px', mt: marginTopSize, mb: 0 })};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};;
  color: ${({ isDisabled, theme }) => (isDisabled ? theme.colors.button.primary['disabled-1'] : 'inherit')};
  cursor: pointer;
  display: inline-flex;
  position: relative;
  user-select: none;
  vertical-align: top;
  width: 100%;

  &:last-child {
    ${({ theme }) => spacing({ theme, mr: 0 })};
  }

  input,
  &.dropdown {
    &.formik-field-checkbox {
      ${({ theme }) => spacing({ theme, my: '2px', mr: '13px', ml: '2px' })};
      color: black;
      cursor: pointer;
      flex-shrink: 0;
      height: 24px;
      overflow: visible;
      position: relative;
      width: 24px;

      &:focus {
        outline-color: transparent;
      }

      ::before {
        ${({ theme }) => spacing({ theme, mr: '12px' })};
        background-color: ${({ theme }) => theme.colors.background['light-1']};
        border-radius: 2px;
        border: 2px solid ${({ theme }) => theme.colors.border['border-1']};
        content: '';
        height: 24px;
        left: -1px;
        position: absolute;
        top: -1px;
        width: 24px;
      }

      &:checked::after,
      &.checked::after {
        border-width: 0 2px 2px 0 !important;
        border: solid ${({ theme }) => theme.colors.icon['dark-1']};
        content: '';
        height: 15px;
        left: 9px;
        position: absolute;
        top: 2px;
        transform: rotate(45deg);
        width: 6px;
      }

      &:hover::before {
        border-color: ${({ theme }) => theme.colors.border['border-2']};
        border-width: 2px;
      }

      &:focus::before {
        border-color: ${({ theme }) => theme.colors.global['info-1']};
        border-width: 2px;
      }

      &:checked::before,
      &.checked::before {
        background-color: ${({ theme }) => theme.colors.background['light-1']};
        border-color: ${({ theme }) => theme.colors.border['border-1']};
      }

      &:hover:checked::before {
        background-color: ${({ theme }) => theme.colors.background['light-1']};
        border-color: ${({ theme }) => theme.colors.border['border-2']};
      }

      &:checked:focus::before {
        background-color: ${({ theme }) => theme.colors.background['light-1']};
        border-color: ${({ theme }) => theme.colors.border['border-1']};
      }

      &:disabled::before {
        background-color: ${({ theme }) => theme.colors.background['light-2']}!important;
        border-color: ${({ theme }) => theme.colors.border['border-1']}!important;
        border-width: 1px !important;
      }

      &:disabled:checked::after {
        border-color: ${({ theme }) => theme.colors.border['border-1']};
      }

      &.error-border::before {
        background-color: ${({ theme }) => theme.colors.global['error-1']};
        border-color: ${({ theme }) => theme.colors.global['error-1']};
      }
    }
  }
`;
