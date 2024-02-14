import styled from 'styled-components';

import Grid from '@/utility/components/Grid';
import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';

export const IconTextWrapper = styled.div`
display:flex;
`;

export const GridContainer = styled(Grid.Container)`
${({ theme }) => spacing({ theme, mx: { xs: 'micro5', lg: 'micro5' }, px: { xs: '0', lg: '0' } })};

`;

export const GridRow = styled(Grid.Row)`
  flex-direction: column;
`;

export const ContentWrapper = styled(Grid.Item)`
${({ theme }) => spacing({ theme, mb: { xs: 'macro2', lg: 'macro2' }, px: { xs: '0', lg: '0' } })};
display: flex;
flex-direction: column;
`;

export const IconHR = styled.hr`
width:100%;
border: 1px solid ${({ theme }) => theme.colors.border['divider-1']};
${({ theme }) => spacing({ theme, mt: { xs: 'micro4', lg: 'micro4' }, mb: { xs: 'micro5', lg: 'micro5' } })};
`;

export const IconContainer = styled.div`
    right: 0px;
    top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    flex-direction:column;

    svg{
      transform: scale(1.2);
    }
`;
