import styled from 'styled-components';

import { spacing } from '@/utility/props';

export const TextContainer = styled.div`
  ${({ theme }) => spacing({ theme, my: 'macro2' })}
`;
