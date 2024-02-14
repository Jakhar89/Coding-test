import OtpInput from 'react-otp-input';
import styled, { css } from 'styled-components';

import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { headingH6 } from '@/utility/styles/text';

import { OneTimePasswordInputStyleProps } from '../definitions';

export const OneTimePasswordInputField = styled(OtpInput)<OneTimePasswordInputStyleProps>`
   ${({ theme }) => spacing({ theme, mr: { xs: '7px', md: '24px' } })};
   height: 48px;
   width: 48px !important;

  input {
    ${headingH6}
    ${({ theme }) => spacing({ theme, mb: `0 !important` })};
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.border['border-1']};
    box-sizing: border-box;
    height: 48px;
    padding: 0;
    width: 48px !important;

    &:hover {
      border-color: ${({ theme }) => theme.colors.border['border-2']};
    }

    &:focus {
      outline-color: ${({ theme }) => theme.colors.global['info-1']};
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

    ${mq('md')} {
      height: 60px;
      width: 60px !important;
    }
  }

  ${mq('md')} {
    height: 60px;
    width: 60px !important;
  }
`;
