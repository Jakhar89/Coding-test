import { GlobalConfigProps } from '@/types/global/aem-definition';

export type ProfileNameParsedProps = {
  familyName?: string;
  givenName?: string;
  globalConfig?: GlobalConfigProps;
  middleName?: string;
  profileNameTitle?: string;
  title: string;
};
