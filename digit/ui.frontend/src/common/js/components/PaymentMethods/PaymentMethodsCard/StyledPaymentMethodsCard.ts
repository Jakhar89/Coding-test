import styled from 'styled-components';

import Grid from '@/utility/components/Grid';
import { body2, boldBody2, fixedBody12, headingH5, headingWithDivider } from '@/utility/styles/text';
import { spacing } from '@/utility/props';

export const ContentContainer = styled(Grid.Item)`
  ${({ theme }) => spacing({ theme, p: { xs: '12px', md: 'micro3' } })};
`;

export const IconWrapper = styled.div`
  ${({ theme }) => spacing({ theme, mb: '12px' })};
  display: flex;
  justify-content: center;
  width: 64px;

  svg {
    height: 64px;
    width: 64px;
    &[name="bpay"] {
      transform: translateX(9px);
    }
  }
`;

export const Content = styled.div`
  ${body2}
`;

export const Title = styled.p`
  ${boldBody2}
  margin: 0 !important;

  &::after {
    content: "\\00a0"
  }
`;

export const Detail = styled.p`
  ${body2}
  margin: 0 !important;
`;

export const NoNextLineWrapper = styled.div`
  display: flex;
`;

export const AccountInfoWrapper = styled.div`
  ${({ theme }) => spacing({ theme, mb: { xs: '20px', sm: '24px' } })};
`;

export const HeadingWithSlimDivider = styled.h5`
  ${headingWithDivider(headingH5, 'slim')};
  ::before{
    background: ${({ theme }) => theme.colors.border['divider-2']};
  }
  margin-bottom: 12px !important;
`;
