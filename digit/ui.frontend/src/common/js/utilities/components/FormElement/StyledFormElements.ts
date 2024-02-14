import styled from 'styled-components';

import spacing from '@/utility/props/spacing';
import { fixedBody16 } from '@/utility/styles/text';

export const StyledGridContainer = styled.div``;

export const FormElementWrapper = styled.div`
  flex-basis: 100%;
  margin-top: 12px;
`;

export const DisclaimerText = styled.span`
  ${fixedBody16}
  color: ${({ theme }) => theme.colors.text.body['dark-2']};
  display: block;
  ${({ theme }) => spacing({ theme, mb: 0, mt: '8px' })};
`;
