import { AEMProps } from '@/types/global/aem-definition';
import { validIcons } from '@/utility/components/Icon/definitions';
import { EventNameType } from '@/utility/helpers/analytics/definitions';

export type PageNotificationProps = AEMProps &
  RemoveMarginTopSpacing & {
    children?: JSX.Element | JSX.Element[];
    handleOnClick?: () => void;
    isLoading?: boolean;
  };

export type PageNotificationParsedProps = SpacingProps & {
  analyticsTrackEventName?: EventNameType;
  buttonText?: string;
  buttonUrl?: string;
  description?: string;
  icon: validIcons;
  mobileDescription?: string;
  title: string;
};

export type SpacingProps = RemoveMarginTopSpacing & {
  isMaintainencePage?: boolean;
};

type RemoveMarginTopSpacing = {
  removeMarginTopSpacing?: boolean;
};
