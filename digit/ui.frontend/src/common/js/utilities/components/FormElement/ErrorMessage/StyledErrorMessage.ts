import styled from 'styled-components';

import { spacing } from '../../../props';
import { fixedBody16 } from '../../../styles/text';

export const InvalidMessage = styled.span`
  ${fixedBody16}
  color: ${({ theme }) => theme.colors.global['error-1']};
  display: block;
  ${({ theme }) => spacing({ theme, mt: '8px', mb: 0 })};
`;
