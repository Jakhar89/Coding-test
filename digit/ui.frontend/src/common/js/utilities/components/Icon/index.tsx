import React from 'react';

import Icons from '@/utility/components/Icon/lookup';

import { IconProps } from './definitions';

const Icon: React.FC<IconProps> = ({ isFunctional = false, name, ...rest }) => {
  if (!name) {
    return null;
  }

  const FoundIcon = isFunctional ? Icons?.functional?.[name] : Icons?.[name];

  if (FoundIcon) {
    return (
      <FoundIcon
        name={name}
        {...rest}
      />
    );
  }
  return null;
};

export default Icon;
