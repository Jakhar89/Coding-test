import React from 'react';

import Icon from '@/utility/components/Icon';

import { CloseButtonWrapper, CloseIconWrapper, ClosePanelWrapper } from './StyledClosePanel';

const ClosePanel = ({ shouldShowSidebarMenu, onClick }) => {
  return (
    <ClosePanelWrapper shouldShowSidebarMenu={shouldShowSidebarMenu}>
      <CloseButtonWrapper onClick={onClick}>
        <CloseIconWrapper>
          <Icon
            name={'close'}
            aria-label="hide navigation"
            isFunctional={true}
          />
        </CloseIconWrapper>
      </CloseButtonWrapper>
    </ClosePanelWrapper>
  );
};

export default ClosePanel;
