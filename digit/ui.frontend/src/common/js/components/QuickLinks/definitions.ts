import { GlobalConfigProps } from '@/types/global/aem-definition';
import { IconProps } from '@/utility/components/Icon/definitions';

export type QuickLinksProps = {
  globalConfig: GlobalConfigProps;
  quickLinks: QuickLink[];
};

interface QuickLink {
  title: string;
  icon: IconProps['name'];
  openInNewTab: string;
  linkPath: string;
}

export type LinkProps = {
  linkTo: string;
  newPage: string;
};
