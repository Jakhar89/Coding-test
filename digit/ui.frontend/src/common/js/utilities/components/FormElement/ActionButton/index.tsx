import React from 'react';

import Icon from '@/utility/components/Icon';
import { ActionButtonProps } from './definitions';

import { Button, IconWrapper, Label, Loader } from './StyledActionButton';

const ActionButton: React.FC<ActionButtonProps> = ({
  buttonType = 'primary',
  handleOnClick,
  icon,
  isLoading = false,
  label = 'Update',
  type = 'submit',
  ...props
}) => {
  return (
    <Button
      buttonType={buttonType}
      disabled={type === 'disabled' || isLoading}
      isLoading={isLoading}
      onClick={handleOnClick}
      type={type}
      icon={icon}
      aria-label={label}
      {...props}
    >
      <Label isLoading={isLoading}>{label}</Label>
      {!isLoading && icon && (
        <IconWrapper iconType={icon}>
          <Icon
            name={icon}
            isFunctional={true}
          />
        </IconWrapper>
      )}
      {isLoading && <Loader buttonType={buttonType} />}
    </Button>
  );
};

export default ActionButton;
