import { validFunctionalIcons } from '@/utility/components/Icon/definitions';
import { StateSetter } from '@/types/global/generic';

type NotificationType = 'error' | 'info' | 'success' | 'warning';

export type NotificationBannerProps = {
  isNotificationHasNoLimit: boolean; // if notification bar has No limits per session, value should be true
  notificationDescription: string;
  notificationId: string;
  notificationType: NotificationType;
  setShouldShowBanner: StateSetter<boolean>;
};

export type NotificationIconType = {
  error: validFunctionalIcons;
  info: validFunctionalIcons;
  success: validFunctionalIcons;
  warning: validFunctionalIcons;
};
