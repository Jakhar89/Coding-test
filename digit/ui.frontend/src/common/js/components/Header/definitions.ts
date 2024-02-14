import { GlobalConfigProps } from '@/types/global/aem-definition';

export interface SidebarProps {
  isLogoReversed?: boolean;
  redirectUrl?: string;
  shouldShowSidebarMenu?: boolean;
  site?: string;
}

export type HeaderParsedProps = {
  idleRedirectDesktop?: number;
  idleRedirectMobileTablet?: number;
  idleWarningDesktop?: number;
  idleWarningMobileTablet?: number;
  isLogoReversed: boolean;
  logoAltText?: string;
  logoPath?: string;
  logoRedirectUrl?: string;
  globalConfig?: GlobalConfigProps;
  menuList: HeaderMenuProps;
  hideHeaderMenu?: boolean;
};

export type HeaderMenuProps = {
  icon?: string;
  text?: string;
  url?: string;
};
