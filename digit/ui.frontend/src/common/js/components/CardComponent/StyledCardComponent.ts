import styled, { css } from 'styled-components';

import Grid from '@/utility/components/Grid';
import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { fixedBody16, headingH6 } from '@/utility/styles/text';

import { ImagePathProps } from './definitions';

export const CardGroup = styled.div`
`;

export const GridContainer = styled(Grid.Container)`
  ${mq('sm')}{
    ${({ theme }) => spacing({ theme, px: '0' })};
    width:auto;
  }

  ${mq.lessThan('lg')} {
    height: 100%;
    min-height: 100vh;
    padding-left: 0;
    padding-right: 0;
  }
`;

export const GridRowContainer = styled(Grid.Row)`
  ${mq.lessThan('lg')} {
    display: flex;
    flex-direction: column;
    margin-left: 0;
    margin-right: 0;
  }

  width:auto;
  max-width:auto;
`;

export const GridItemContainer = styled(Grid.Item)`
  display: flex;
  margin-bottom: 24px;

  ${mq.lessThan('lg')} {
    max-width: 100%;
    padding-left: 0;
    padding-right: 0;
  }
`;

export const CardContainer = styled.div`
  border: 1px solid #CACDD6;

  button {
    position: absolute;
    bottom: 0;
    float: left;
  }
`;

export const ButtonWrapper = styled.div`
  padding: 24px 30px;
  margin-top: 24px;
`;

export const BodyWrapper = styled.div`
`;

export const ContentWrapper = styled.div`
  padding: 24px 30px;
`;

const cssBgConfig = ({ backgroundImageUrl }: ImagePathProps) =>
  backgroundImageUrl &&
  css`
     background-image: url(${backgroundImageUrl});
     background-position: center;
     background-repeat: no-repeat;
     background-size: cover;
  `;

export const Image = styled.div<ImagePathProps>`
  width: 100%;
  height: 254px;
  border-bottom: 4px solid ${({ theme }) => theme.colors.border['divider-1']};

  ${cssBgConfig}
`;

export const Heading = styled.div`
  ${headingH6}
  margin-bottom: 16px !important;
`;

export const Description = styled.div`
  ${fixedBody16}
`;
