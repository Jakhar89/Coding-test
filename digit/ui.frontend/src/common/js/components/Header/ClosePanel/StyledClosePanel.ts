import styled from 'styled-components';

import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';

import { SidebarProps } from '../definitions';

export const ClosePanelWrapper = styled.div<SidebarProps>`
  display: ${({ shouldShowSidebarMenu }) => (!shouldShowSidebarMenu ? 'none' : 'flex')};
  width: 48px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: relative;

  ${mq('md')} {
    display: none;
  }
`;

export const CloseButtonWrapper = styled.div<SidebarProps>`
  background: white;
  position: absolute;
  width: 24px;
  display: flex;
  justify-content: center;
  ${({ theme }) => spacing({ theme, p: '12px' })};
  cursor: pointer;
`;

export const CloseIconWrapper = styled.div``;
