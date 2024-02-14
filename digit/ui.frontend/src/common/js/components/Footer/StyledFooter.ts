import styled from 'styled-components';

import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import Grid from '@/utility/components/Grid';

export const GridContainer = styled(Grid.Container)`
  display: block;
`;

export const GridRow = styled(Grid.Row)`
  display: inline;
  margin: 0 !important;
`;

export const FooterWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background['dark-2']};
  color: ${({ theme }) => theme.colors.link['light-1']};
  display: flex;
  ${({ theme }) => spacing({ theme, py: 'macro2', mt: 'macro1' })};
`;

export const Divider = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border['border-1']};
  ${({ theme }) =>
    spacing({
      theme,
      mb: { xs: 'macro2' },
      my: { md: 'micro3', xl: 'macro2' },
    })};
`;

export const Nav = styled.nav``;
