import { css } from 'styled-components';

import { Color } from './definitions';

export const globalColors: Color = {
  'error-1': '#EB0A1E',
  'error-2': '#FFEBEB',
  'info-1': '#38AFFF',
  'info-2': '#EBF7FF',
  'success-1': '#02E068',
  'success-2': '#EBFFEE',
  'warning-1': '#E0D702',
  'warning-2': '#FCFBE6',
  'text-green': '#3b8600',
};

export const buttonOrLinkFocusState = () => css`
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.global['info-1']};
    outline-offset: 0;
  }
`;
