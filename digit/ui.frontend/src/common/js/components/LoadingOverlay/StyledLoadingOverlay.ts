import styled from 'styled-components';

import { headingH1 } from '@/utility/styles/text';
import { mq } from '@/utility/styles';
import { spacing } from '@/utility/props';
import depth from '@/utility/styles/depth';

export const SHOW_LOADING_OVERLAY = 'loading-overlay-active';
export const DISABLE_OVERLAY_BODY_SCROLL = 'overlay-active';

export const OverlayContainer: any = styled.div`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  height: 100%;
  left: 0;
  opacity: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  transition: all 0.5s;
  visibility: hidden;
  width: 100%;
  z-index: 2;

  &.${SHOW_LOADING_OVERLAY} {
    opacity: 1;
    visibility: visible;
  }
`;

export const ContentWrapper = styled.div`
  ${({ theme }) => spacing({ theme, py: { md: 'macro1' } })};
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  pointer-events: auto;
  width: 100%;
  z-index: ${depth.LOADINGOVERLAY};

  ${mq.lessThan('md')} {
    box-sizing: border-box;
    height: 100%;
    left: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
  }
`;

export const IconWrapper = styled.div`
  ${({ theme }) => spacing({ theme, p: { xs: '25px', md: '50px' }, mb: { xs: 'macro2', md: 'micro2' } })};
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;

  svg {
    height: 50px;
    width: 50px;

    ${mq('md')} {
      height: 100px;
      width: 100px;
    }
  }

  &::before {
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-name: spinning;
    animation-timing-function: linear;
    border-radius: 50%;
    border: 4px solid ${({ theme }) => theme.colors.border['border-1']};
    border-left-color: ${({ theme }) => theme.colors.border['divider-1']};
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;

    ${mq('md')} {
      border-width: 8px;
    }

    @keyframes spinning {
      from { transform: rotate(0deg) }
      to { transform: rotate(360deg) }
    }
  }
`;

export const Heading = styled.h1`
  ${headingH1}
`;
