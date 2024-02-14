import React from 'react';

import Icon from '@/utility/components/Icon';

import { Button, IconWrapper, Label } from './StyledMenuButton';

const MenuButton = ({ children, onClick, isLogoReversed }) => {
  return (
    <Button onClick={onClick}>
      <Label>
        {children}
        <IconWrapper>
          <Icon
            aria-label="show navigation"
            isFunctional={true}
            name={isLogoReversed ? 'menu-reversed' : 'menu'}
          />
        </IconWrapper>
      </Label>
    </Button>
  );
};

export default MenuButton;
