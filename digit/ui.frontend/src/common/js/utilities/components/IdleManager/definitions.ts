export type IdleManagerProps = {
  autoLogoutUrl?: string;
  idleRedirectDesktop?: number;
  idleRedirectMobileTablet?: number;
  idleWarningDesktop?: number;
  idleWarningMobileTablet?: number;
  attributes?: any;
};

export const IDLE_REDIRECT_DESKTOP_DEFAULT = 900000;
export const IDLE_REDIRECT_MOBILE_TABLET_DEFAULT = 300000;
export const IDLE_WARNING_DESKTOP_DEFAULT = 600000;
export const IDLE_WARNING_MOBILE_TABLET_DEFAULT = 210000;
