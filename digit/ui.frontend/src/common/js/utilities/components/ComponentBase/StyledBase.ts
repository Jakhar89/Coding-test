import styled from 'styled-components';

import Grid from '@/utility/components/Grid2';
import { spacing } from '@/utility/props';

export const Wrapper = styled.div`

`;

export const GridContainer = styled(Grid.Container)`
  ${({ theme }) => spacing({ theme, px: 'micro5' })};
  justify-content: center;
  box-sizing: border-box;

`;

export const GridRow = styled(Grid.Row)`
  display:flex;
  flex-wrap:wrap;
  box-sizing: border-box;
  ${({ direction }) => direction && `flex-direction: ${direction}`}
`;

export const GridItem = styled(Grid.Item)`
  display:flex;
  box-sizing: border-box;
  padding:0;
  flex-wrap:wrap;

`;
