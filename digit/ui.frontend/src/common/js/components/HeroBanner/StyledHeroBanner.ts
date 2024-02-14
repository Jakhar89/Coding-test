import styled, { css } from 'styled-components';

import Grid from '@/utility/components/Grid';
import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { body1, headingH1 } from '@/utility/styles/text';

import { HeroBannerWrapperStylingProps } from './definitions';

const cssBgConfig = ({ backgroundImageUrl }: HeroBannerWrapperStylingProps) =>
  backgroundImageUrl &&
  css`
     background-image: url(${backgroundImageUrl});
     background-position: center;
     background-repeat: no-repeat;
     background-size: cover;
  `;

export const GridContainer = styled(Grid.Container)`
  max-width: 1152px;
  z-index: 1;
`;

export const GridRow = styled(Grid.Row)`
  margin: 0;

  ${mq.lessThan('md')} {
    flex-direction: column;
  }

  ${mq('lg')} {
    margin-right: -23px;
  }

  ${mq('xl')} {
    margin-right: -34px;
  }
`;

export const HeroBannerWrapper = styled.div<HeroBannerWrapperStylingProps>`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background['dark-1']};
  box-sizing: border-box;
  display: flex;
  height: auto;
  max-width: 100%;
  overflow: visible;
  position: relative;
  width: 100%;

  ${mq('md')} {
    ${({ theme }) => spacing({ theme, py: 'macro2' })}
  }

  &.is-half-width {
    align-items: flex-start;
    // as per Design System in Figma, but bg come from page template in reality
    background-color: ${({ theme }) => theme.colors.background['light-2']};
    ${({ theme }) => spacing({ theme, py: 'macro2' })}
  }

  ${cssBgConfig}

  .background-grey-overlay & {
    ::after {
      background-color: rgba(0,0,0,0.45);
      content: "";
      display: block;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }
`;

export const Heading = styled.h1`
  ${headingH1}
  color: ${({ theme }) => theme.colors.text.heading['light-1']};
  ${({ theme }) => spacing({ theme, mt: 'macro1' })}
  
  .is-half-width & {
    color: ${({ theme }) => theme.colors.text.body['dark-1']};
  }

  ${mq('lg')} {
    ${({ theme }) => spacing({ theme, my: 'micro2', pt: 'micro2' })}
  }
`;

export const Description = styled.div`
  ${body1}
  color: ${({ theme }) => theme.colors.text.body['light-1']};
  ${({ theme }) => spacing({ theme, mb: 'micro2' })}

  .is-half-width & {
    color: ${({ theme }) => theme.colors.text.body['dark-1']};
  }

  ${mq('lg')} {
    ${({ theme }) => spacing({ theme, pb: 'micro2' })}
  }

`;

export const ImageContainer = styled(Grid.Item)<HeroBannerWrapperStylingProps>`
  height: auto;
  min-height: 170px;
  padding: 0 !important;
  width: calc(100vw - 24px);

  ${mq('sm')} {
    min-height: 240px;
    overflow: hidden;
  }

  ${mq('md')} {
    flex-basis: calc(50% + 121px);
    max-width: 709px;
    min-height: 350px;
    overflow: hidden;
    top: 52px;
  }

  ${cssBgConfig}
`;

export const ContentWrapper = styled(Grid.Item)`

  ${mq('md')} {
    width: 50%;

    .is-half-width & {
      padding-bottom: 72px;
      flex: 0 0 calc(50% - 72px);
      max-width: calc(50% - 72px);
      ${({ theme }) => spacing({ theme, pr: 'macro2' })}
    }
  }
`;

export const LastLoginContainer = styled.div`
  ${body1}
  margin-top: -30px;
  color: ${({ theme }) => theme.colors.text.body['light-1']};
  ${({ theme }) => spacing({ theme, mb: 'micro2' })}

  .is-half-width & {
    color: ${({ theme }) => theme.colors.text.body['dark-1']};
  }

  ${mq.lessThan('lg')} {
    margin-top: 0px;
  }
`;

export const LastLoginTime = styled.p`
  ${body1};
  display: inline-block;
  font-weight: 700;
  margin-bottom: 0px !important;
`;
