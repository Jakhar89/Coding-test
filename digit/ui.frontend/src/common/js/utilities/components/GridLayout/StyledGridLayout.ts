import styled from 'styled-components';

import Grid from '@/utility/components/Grid2';
import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';

export const Wrapper = styled.div`

`;

export const GridContainer = styled(Grid.Container)`
  ${({ theme }) => spacing({ theme, px: 'micro5' })};
  justify-content: center;
  box-sizing: border-box;

  {//just for showcase}
    &.GridContainer{
      padding-top:20px;
      padding-bottom:20px;width:100%;
      margin-bottom:50px;
      background:red;};
`;

export const GridRow = styled(Grid.Row)`
  display:flex;
  flex-wrap:wrap;
  box-sizing: border-box;
  
  {//just for showcase}
    &.GridRow{padding:20px 0;
      background:blue;};
`;

export const GridItem = styled(Grid.Item)`

  {//just for showcase}
    &.GridItem{border:1px solid black;
      background:orange;};

`;

export const OriginalContainer = styled(Grid.Container)`
background:yellow;
min-height:50px;
`;
export const OriginalRow = styled(Grid.Row)`
background:pink;
min-height:20px;
flex-wrap:wrap;
`;

export const OriginalItem = styled(Grid.Item)`
background:grey;
min-height:10px;`;
