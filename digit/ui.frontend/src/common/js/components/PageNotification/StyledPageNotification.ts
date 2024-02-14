import styled from 'styled-components';

import Grid from '@/utility/components/Grid';
import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { body1, headingH1 } from '@/utility/styles/text';

import { SpacingProps } from './definitions';

export const PageNotificationContainer = styled(Grid.Row)<SpacingProps>`
  ${({ isMaintainencePage, removeMarginTopSpacing, theme }) =>
    spacing({
      theme,
      mt: isMaintainencePage ? 'macro2' : removeMarginTopSpacing ? '0' : 'macro1',
      py: { md: isMaintainencePage || removeMarginTopSpacing ? '0' : '70px' },
    })};
`;

export const ContentWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

export const GridGap = styled(Grid.Item)`
  ${mq.lessThan('md')} {
    display: none;
  }
`;

export const IconWrapper = styled.div`
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.colors.border['border-1']};
  ${({ theme }) => spacing({ theme, p: { xs: '21px', md: '42px' }, mb: { xs: 'macro2', md: 'micro2' } })};

  ${mq('md')} {
    border-width: 8px;
  }

  svg {
    height: 50px;
    width: 50px;

    ${mq('md')} {
      height: 100px;
      width: 100px;
    }
  }
`;

export const Title = styled.h1`
  ${headingH1};
  color: ${({ theme }) => theme.colors.text.heading['dark-1']};
  ${({ theme }) => spacing({ theme, mb: { xs: 'macro2', md: 'micro2' } })};
`;

export const Description = styled.div`
  ${body1}
  color: ${({ theme }) => theme.colors.text.body['dark-2']};
  ${({ theme }) => spacing({ theme, mb: { xs: 'macro2', md: 'micro2' } })};
`;

export const ButtonWrapper = styled.div`
  button {
    margin-bottom: 0;
  }
`;

export const LogoContainer = styled.div`
  div {
    justify-content: center;
    padding: 0;
    ${({ theme }) => spacing({ theme, mb: 'macro1' })};

    div {
      margin: 0;
      padding: 0;
    }
  }
`;
