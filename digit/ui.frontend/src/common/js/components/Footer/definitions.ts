import { BrandVariablesConfigProps } from '@/types/global/brandvariables-config';

export type FooterParsedProps = {
  brandVariablesConfig?: BrandVariablesConfigProps;
  bottomFooterMenuList?: FooterMenuProps;
  contactUsDetails?: string;
  contactUsText?: string;
  licenceDetails?: string;
  logoAltText?: string;
  logoPath?: string;
  logoRedirectUrl?: string;
  menuList?: FooterMenuProps;
  postalAddress?: string;
};

export type FooterMenuProps = {
  text?: string;
  url?: string;
  isNewTab?: string;
};
