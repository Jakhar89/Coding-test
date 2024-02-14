import React, { useEffect, useState } from 'react';

import { userStore } from '@/context/User/User';
import { AEMProps } from '@/types/global/aem-definition';
import IdleManager from '@/utility/components/IdleManager';
import { getCorrelationId } from '@/utility/helpers/correlation-id';
import { forgerockInitialConfig, SSP_EMPTY_TREE } from '@/utility/helpers/forgerock';
import { useBreakpoint } from '@/utility/hooks/useBreakpoint';
import useForgeRockJourney from '@/utility/hooks/useForgeRockJourney';

import { HeaderParsedProps } from './definitions';
import Logo from './Logo';
import MenuButton from './MenuButton';
import Navigation from './Navigation';
import { HeaderWrapper } from './StyledHeader';

const Header = ({ attributes, errorSuccessMap, isAuthorRunMode, site }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }
  const headerJson: HeaderParsedProps = JSON.parse(attributes);
  const bp = useBreakpoint();
  const { isAuthenticated } = userStore();
  const [shouldShowSidebarMenu, setShouldShowSidebarMenu] = useState(false);
  const [tree, setTree] = useState(SSP_EMPTY_TREE);
  const { globalConfig } = headerJson;
  const isPortalGatewayPage = window.digitalData.page.pageName?.includes('homepage:portal-gateway');
  const logoRedirectUrl = isPortalGatewayPage ? '#' :
  isAuthorRunMode === 'true'
    ? headerJson?.logoRedirectUrl
    : headerJson?.logoRedirectUrl?.substring(headerJson?.logoRedirectUrl.lastIndexOf('/'));
  
  //Forgerock config setup
  useEffect(() => {
    //@ts-ignore
    forgerockInitialConfig(headerJson.globalConfig, tree);
  }, []);

  const { isLoading } = useForgeRockJourney({
    errorSuccessMap: errorSuccessMap,
    globalConfig,
    tree: tree,
  });

  const onClick = () => {
    setShouldShowSidebarMenu((shouldShowSidebarMenu) => !shouldShowSidebarMenu);
  };

  // check if user authenticated, else invoke Registration journey to check
  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isAuthenticated) {
      // refresh correlation id in case expired after 1 hr
      getCorrelationId();
      return;
    }
  }, [isAuthenticated, tree, isLoading]);

  useEffect(() => {
    if (shouldShowSidebarMenu) {
      document.body.classList.add('sidebar-menu-active');
    } else {
      document.body.classList.remove('sidebar-menu-active');
    }
  }, [shouldShowSidebarMenu]);

  // ensure sidebar nav collapsed on breakpoint change >= md
  useEffect(() => {
    if (['md', 'lg', 'xl'].includes(bp)) {
      setShouldShowSidebarMenu(false);
      document.body.classList.remove('sidebar-menu-active');
    }
  }, [bp]);

  return (
    <>
      <HeaderWrapper className={headerJson?.isLogoReversed ? 'darkTheme' : ''}>
        <Logo
          isLogoReversed={headerJson?.isLogoReversed ?? false}
          redirectUrl={logoRedirectUrl}
          shouldShowSidebarMenu={shouldShowSidebarMenu}
          site={site}
        />
        {!headerJson.hideHeaderMenu && (
          <>
            <Navigation
              errorSuccessMap={errorSuccessMap}
              isAuthorRunMode={isAuthorRunMode}
              isLoading={isLoading}
              isLogoReversed={headerJson?.isLogoReversed ?? false}
              navigation={headerJson.menuList}
              onClick={onClick}
              redirectUrl={logoRedirectUrl}
              shouldShowSidebarMenu={shouldShowSidebarMenu}
              site={site}
              attributes={headerJson}
            />
            <MenuButton
              onClick={onClick}
              isLogoReversed={headerJson?.isLogoReversed ?? false}
            >
              Menu
            </MenuButton>
          </>
        )}
      </HeaderWrapper>

      <IdleManager
        autoLogoutUrl={errorSuccessMap?.autoLogoutPagePath}
        idleRedirectDesktop={headerJson?.idleRedirectDesktop}
        idleRedirectMobileTablet={headerJson?.idleRedirectMobileTablet}
        idleWarningDesktop={headerJson?.idleWarningDesktop}
        idleWarningMobileTablet={headerJson?.idleWarningMobileTablet}
        attributes={headerJson}
      />
    </>
  );
};

export default Header;
