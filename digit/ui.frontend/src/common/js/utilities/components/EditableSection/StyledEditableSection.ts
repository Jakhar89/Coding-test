import styled from 'styled-components';

import Grid from '@/utility/components/Grid';
import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { button } from '@/utility/styles/button';
import depth from '@/utility/styles/depth';

import { ContentWrapperProps } from './definitions';

export const SHOW_EDITABLE_SECTION_OVERLAY = 'editable-section-overlay-active';
export const DISABLE_OVERLAY_BODY_SCROLL = 'overlay-active';

export const SectionContainer: any = styled.div`
  align-items: center;
  display: flex;
  left: 0;
  opacity: 0;
  height: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  transition: opacity 0.3s;
  visibility: hidden;
  width: 100%;
  z-index: 1;

  &.${SHOW_EDITABLE_SECTION_OVERLAY} {
    opacity: 1;
    visibility: visible;
    height: 100%;
    overflow-y: auto;
  }
`;

export const GridContainer = styled(Grid.Container)`
  width: 80%;

  ${mq.lessThan('md')} {
    height: 100%;
    min-height: 100vh;
    padding: 0;
    width: 100%;
  }
`;

export const GridRowContainer = styled(Grid.Row)`
  ${mq.lessThan('md')} {
    align-self: flex-start;
    flex-direction: column-reverse;
    height: 100%;
    justify-content: center;
  }
`;

export const GridItemContainer = styled(Grid.Item)``;

export const ContentWrapper = styled.div<ContentWrapperProps>`
  position: relative;

  ${mq('lg')} {
    min-width: ${({ full }) => (full ? '100%' : '564px')};
    max-width: ${({ full }) => (full ? '100%' : '564px')};
  }

  ${mq.lessThan('lg')} {
    width: 100%;
  }
`;

export const ContentContainer = styled.div`
  ${({ theme }) => spacing({ theme, p: { xl: 'macro1' }, px: { xs: 'micro2' }, py: { xs: 'macro1' } })};
  background-color: ${({ theme }) => theme.colors.background['light-1']};
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  z-index: ${depth.EDITABLESECTIONCONTAINER};

  ${mq('md')} {
    flex-direction: row;
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.32);
  }

  ${mq.lessThan('md')} {
    box-sizing: border-box;
    height: 100%;
    justify-content: flex-end;
    width: 100%;
  }
`;

export const OverlayContainer = styled.div`
  ${({ theme }) => spacing({ theme, py: { md: 'macro1' } })};
  background-color: ${({ theme }) => theme.colors.background['light-1']};
  left: 0;
  pointer-events: auto;
  position: absolute;
  right: 0;
  top: 0;

  ${mq.lessThan('md')} {
    z-index: 999;
  }
`;

export const SectionAction = styled.div`
  ${({ theme }) => spacing({ theme, mt: 'macro2' })};
  display: flex;
  justify-content: flex-end;

  button {
    margin-bottom: 0;

    &:last-child{
      ${({ theme }) => spacing({ theme, ml: { xs: 'micro4', md: 'micro3' } })};
    }
  }
`;

export const CancelButton = styled.button`
  ${button('secondary', 'secondary')};
`;

export const SaveButton = styled.button`
  ${button('primary', 'primary')};


  &:disabled,
  &:disabled:hover {
    background-color: ${({ theme }) => theme.colors.button.primary['disabled-1']};
  }
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

export const CloseSectionOverlay = styled.button`
  background-color: ${({ theme }) => theme.colors.background['dark-1']};
  cursor: pointer;
  height: 100%;
  left: 0;
  opacity: 0;
  opacity: 0.55;
  position: fixed;
  top: 0;
  width: calc(100% - 17px);
`;
