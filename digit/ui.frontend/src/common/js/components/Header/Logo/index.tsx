import React from 'react';
import { default as UtilLogo } from '@/utility/components/Logo';

import { SidebarProps } from '../definitions';

import { LogoAnchor, LogoWrapper } from './StyledLogo';

const Logo: React.FC<SidebarProps> = ({ isLogoReversed, redirectUrl, shouldShowSidebarMenu, site }) => {
  return (
    <LogoWrapper
      className="logo"
      shouldShowSidebarMenu={shouldShowSidebarMenu}
    >
      <LogoAnchor
        href={`${redirectUrl}.html`}
        aria-label={site?.replace('-', ' ')}
      >
        <UtilLogo
          site={site}
          reversed={isLogoReversed}
        />
      </LogoAnchor>
    </LogoWrapper>
  );
};

export default Logo;
