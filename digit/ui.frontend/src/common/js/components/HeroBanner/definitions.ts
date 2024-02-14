import { GlobalConfigProps } from '@/types/global/aem-definition';

export type HeroBannerParsedProps = {
  description?: string;
  image?: string;
  isHalfWidthBanner: boolean;
  title: string;
  greetingText?: string;
  isPersonalizedGreeting?: boolean;
  isLastLogin?: boolean;
  lastLoginText?: string;
  isAuthenticatedMock?: boolean;
  globalConfig?: GlobalConfigProps;
};

export interface HeroBannerWrapperStylingProps {
  backgroundImageUrl?: string | null;
  isHalfWidthBanner: boolean;
}
