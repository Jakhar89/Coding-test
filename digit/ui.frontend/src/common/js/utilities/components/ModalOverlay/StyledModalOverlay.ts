import styled from 'styled-components';

import Grid from '@/utility/components/Grid';
import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { button } from '@/utility/styles/button';
import depth from '@/utility/styles/depth';
import { body1, headingH1 } from '@/utility/styles/text';

export const SHOW_MODAL_OVERLAY = 'simple-modal-overlay-active';
export const DISABLE_OVERLAY_BODY_SCROLL = 'overlay-active';

export const OverlayContainer: any = styled.div`
  align-items: center;
  background-color: rgba(0,0,0,0.55);
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
  z-index: 1;

  &.${SHOW_MODAL_OVERLAY} {
    opacity: 1;
    visibility: visible;
  }
`;

export const GridContainer = styled(Grid.Container)`
  ${({ theme }) => spacing({ theme, py: 'macro1' })};
  z-index: -2;

  ${mq('md')} {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    overflow: auto;
    position: fixed;
    top: 0;
    max-width: 100%;
  }
`;

export const GridRowContainer = styled(Grid.Row)``;

export const GridItemContainer = styled(Grid.Item)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

export const ContentWrapper = styled.div`
  ${({ theme }) => spacing({ theme, py: { md: 'macro1' }, px: { xs: 'micro2', xl: 0 } })};
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background['light-1']};
  display: flex;
  justify-content: center;
  pointer-events: auto;
  width: 100%;
  z-index: ${depth.MODALOVERLAY};

  ${mq.lessThan('md')} {
    box-sizing: border-box;
    height: 100%;
    left: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
  }

  ${mq('md')} {
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.32);
  }
`;

export const CloseSectionOverlay = styled.div`
  bottom: 0;
  cursor: pointer;
  left: 0;
  opacity: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: -1;
`;

export const IconWrapper = styled.div`
  ${({ theme }) => spacing({ theme, p: { xs: '21px', md: '42px' }, mb: { xs: 'macro2', md: 'micro2' } })};
  align-items: center;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.colors.border['border-1']};
  display: flex;
  justify-content: center;

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

export const Heading = styled.h1`
  ${headingH1}
`;

export const Descriptions = styled.div`
  ${body1}
  margin-bottom: 0 !important;
  color: ${({ theme }) => theme.colors.text.body['dark-2']};
  max-width: 760px;
`;

export const ButtonWrapper = styled.div`
  margin-left: auto;
  position: relative;

  svg {
    ${({ theme }) => spacing({ theme, mr: { xs: 'micro2', md: 'micro3' } })};
    cursor: pointer;
    position: absolute;
    right: -24px;
    top: 0;
    width: 16px;

    ${mq('md')} {
      top: 2px;
    }
  }
`;

export const CloseButton = styled.button`
  ${button('tertiary', 'tertiary')};
  ${({ theme }) => spacing({ theme, mr: { xs: 'micro2', md: 'micro3' }, mb: 'micro2' })};
  margin-left: auto;
  position: relative;

  &:active, &:focus {
    border-color: ${({ theme }) => theme.colors.button.tertiary['hover-2']};
  }
`;
