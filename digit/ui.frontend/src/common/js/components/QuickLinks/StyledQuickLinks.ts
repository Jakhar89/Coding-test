import styled, { css } from 'styled-components';

import Grid from '@/utility/components/Grid2';
import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { body1, boldFixedBody16, fixedBody14, fixedBody16, headingH1, headingH4 } from '@/utility/styles/text';
import { globalColors } from '@/utility/theme/global/colors';

export const QuickLinksWrapper = styled.div`
    width:100%;
    ${({ theme }) => spacing({ theme, pb: { xs: 'macro2', md: 'macro2' } })}
`;

export const InnerWrapper = styled(Grid.Item)`
    ${mq('xs')}{
        padding:0 !important;
    width:auto;
    margin:0 -12px;
    }
    
`;

export const GridItem = styled(Grid.Item)`
    box-shadow:0px 4px 20px rgba(0,0,0,0.12);
    ${({ theme }) => spacing({ theme, my: { xs: 'micro2', md: 'micro5' } })}
    padding:24px !important;
    margin-left:12px;
    margin-right:12px;
    min-width:150px;
    cursor: pointer;
`;

export const Wrapper = styled(Grid.Item)`
    padding:0;
    justify-content:center;
    color: ${({ theme }) => theme.colors.icon['light-2']}
    ${({ theme }) => spacing({ theme, mb: { xs: 'macro3', md: 'micro4' } })}

    svg{
        path{
            stroke:none;
            fill:inherit;
        }
    }
`;

export const Title = styled(Grid.Item)`
  ${fixedBody14}
  color: ${({ theme }) => theme.colors.text.body['dark-2']}
  text-align:center;
  justify-content: center;
  padding:0!important;
  margin-bottom:0 !important;
`;
