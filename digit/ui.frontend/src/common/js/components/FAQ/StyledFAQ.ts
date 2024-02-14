import styled from 'styled-components';
import { Tabs as RTabs, TabList as RTabList, Tab as RTab, TabPanel as RTabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { spacing } from '@/utility/props';
import { boldBody1 } from '@/utility/styles/text';
import { buttonOrLinkFocusState } from '@/utility/theme/global/colors';
import { mq } from '@/utility/styles';

export const FAQComponentElement = styled.div`
`;

export const Tabs = styled(RTabs)`
  margin-bottom: 0;
`;

export const TabList = styled(RTabList)`
  display: inline-flex;
  padding: 6px;
  gap: 125px;

  ${mq.lessThan('lg')}{
    gap: 32px;
    display: flex;
    overflow-x: auto;
    --mask: linear-gradient(to right, rgba(0,0,0, 1) 0, rgba(0,0,0, 1) 85%, rgba(0,0,0, 0) 105%, rgba(0,0,0, 0) 0);
    -webkit-mask: var(--mask);
    mask: var(--mask);
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Tab = styled(RTab)`
  align-items: center;
  border: none;
  color: ${({ theme }) => theme.colors.text.heading['dark-1']};
  display: flex;
  flex-direction: column;
  ${boldBody1}
  height: 100%;
  padding: 12px 0px;
  position: relative;
  white-space: nowrap;
  ${({ theme }) => spacing({ theme, mb: 0 })}

  &:hover {
    cursor: pointer;
  }

  ${buttonOrLinkFocusState()}

  &.is-selected {
    border-bottom: 2px solid ${({ theme }) => theme.colors.border['divider-1']};
    outline: none;
    outline-offset: 0;
  }
`;

export const TabPanel = styled(RTabPanel)`
  display: none;


  &.is-selected {
    display: block;
  }
`;
