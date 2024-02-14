import styled from 'styled-components';

import { spacing } from '@/utility/props';
import { body1, boldBody1 } from '@/utility/styles/text';
import { button } from '@/utility/styles/button';
import { ButtonStyleProps } from './definitions';

export const Timer = styled.span`
  ${boldBody1}
`;

export const Button = styled.button<ButtonStyleProps>`
  ${({ buttonStyle, buttonState }) => button(buttonStyle, buttonState)};
`;

export const ButtonWrapper = styled.div`
  ${({ theme }) => spacing({ theme, mb: 'macro2', mt: 'micro2' })};
  display: flex;
  justify-content: flex-end;
  margin-left: auto;

  button {
    margin-bottom: 0;

    :not(:last-child) {
      ${({ theme }) => spacing({ theme, mr: { xs: 'micro4', md: 'micro3' } })};
    }
  }
`;

export const Description = styled.div`
  ${body1}
`;
