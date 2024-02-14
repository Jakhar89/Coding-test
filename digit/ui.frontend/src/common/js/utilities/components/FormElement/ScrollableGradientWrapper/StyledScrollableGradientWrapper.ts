import styled, { css } from 'styled-components';

import { ScrollableGradientWrapperStyleProps } from './definitons';

export const GradientWrapper = styled.div<ScrollableGradientWrapperStyleProps>`
  position: relative;

  ${({ shouldShowTopGradient }) =>
    shouldShowTopGradient &&
    css`
      ::before {
        background: linear-gradient(180deg,#FFFFFF 20.83%,rgba(255,255,255,0) 100%);
        content: '';
        height: 55px;
        position: absolute;
        top: 0
        transform: rotate(0deg);
        width: 100%;
     }
  `}

  ${({ shouldShowBottomGradient }) =>
    shouldShowBottomGradient &&
    css`
      ::after {
        background: linear-gradient(0deg,#FFFFFF 20.83%,rgba(255,255,255,0) 100%);
        bottom: 0;
        content: '';
        height: 55px;
        position: absolute;
        transform: rotate(360deg);
        width: 100%;
     }
  `}
`;

export const ContentContainer = styled.div`
  display: block;
  max-height: 552px;
  overflow: auto;
`;
