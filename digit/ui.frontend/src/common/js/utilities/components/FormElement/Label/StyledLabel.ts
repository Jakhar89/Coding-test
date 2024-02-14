import styled, { css } from 'styled-components';

import { spacing } from '../../../props';
import { label3 } from '../../../styles/text';

interface Props {
  optional?: boolean;
}

export const FormElementLabel = styled.label`
  ${label3}
  ${({ theme }) => spacing({ theme, mb: '10px' })};
  color: ${({ theme }) => theme.colors.text.body['dark-1']};
  display: inline-block;
  font-weight: bold;
  line-height: 24px;
  text-transform: uppercase;
`;

export const FormElementTitle = styled.span<Props>`
  ${label3}
  ${({ theme }) => spacing({ theme, mb: 0 })};
  ${({ optional }) =>
    optional &&
    css`
    // leave space for word 'optional' below
    padding-right: 90px;

    &:after {
      content: '\\00a0(optional)';
      display: inline-block;
      position: absolute;
      right: 0;
    }
  `};
`;
