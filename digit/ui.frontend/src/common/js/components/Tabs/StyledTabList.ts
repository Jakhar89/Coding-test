import { Tabs as RTabs, TabList as RTabList, Tab as RTab, TabPanel as RTabPanel } from 'react-tabs';
import styled from 'styled-components';

import { spacing } from '@/utility/props';
import { fixedBody16 } from '@/utility/styles/text';
import { buttonOrLinkFocusState } from '@/utility/theme/global/colors';

export const Tabs = styled(RTabs)`
  margin-bottom: 0;
`;

export const TabList = styled(RTabList)`
  border: 1px solid ${({ theme }) => theme.colors.border['border-1']};
  border-radius: 6px;
  display: inline-flex;
  flex-wrap: nowrap;
  gap: 12px;
  ${({ theme }) => spacing({ theme, mb: 'micro2', mt: 0 })}
  overflow-x: auto;
  padding: 6px;

  @media print {
    display: none;
  }
`;

export const Tab = styled(RTab)`
  align-items: center;
  border: none;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.text.heading['dark-1']};
  display: flex;
  flex-direction: column;
  ${fixedBody16}
  height: 100%;
  padding: 12px 16px;
  position: relative;
  white-space: nowrap;
  width: 100%;
  ${({ theme }) => spacing({ theme, mb: 0 })}

  &:hover {
    cursor: pointer;
  }

  ${buttonOrLinkFocusState()}

  &.is-selected {
    background: ${({ theme }) => theme.colors.button.primary['default-1']};
    color: ${({ theme }) => theme.colors.text.heading['light-1']};
  }
`;

export const TabPanel = styled(RTabPanel)`
  display: none;

  &.is-selected {
    display: block;
  }
`;
