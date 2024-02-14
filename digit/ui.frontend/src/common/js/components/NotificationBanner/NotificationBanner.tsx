import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';

import { AEMProps } from '@/types/global/aem-definition';

import { NotificationBannerProps } from './definitions';

import GeneralNotice from './GeneralNotice';
import LogoutWarning from './LogoutWarning';

const HIDE = 'hide';

const NotificationBanner = ({ attributes }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const notificationBannerJson: NotificationBannerProps = JSON.parse(attributes);
  // RE: isNotificationHasNoLimit
  // if notification bar has No limits per session, value should be true
  const { isNotificationHasNoLimit, notificationId } = notificationBannerJson;
  const isLogoutWarning = notificationId === 'idleWarningNotification';
  const getUniqueIdValueFromSessionCookie = Cookies.get(notificationId);

  // prettier-ignore
  const [shouldShowBanner, setShouldShowBanner] = useState<boolean>(
    !isLogoutWarning &&
    getUniqueIdValueFromSessionCookie !== HIDE
    ?
      true
    :
      false,
  );

  useEffect(() => {
    if (!isNotificationHasNoLimit && getUniqueIdValueFromSessionCookie === HIDE) {
      setShouldShowBanner(false);
    }
  }, []);

  useEffect(() => {
    if (!isLogoutWarning && !isNotificationHasNoLimit && !shouldShowBanner && !getUniqueIdValueFromSessionCookie) {
      Cookies.set(notificationId, HIDE, { expires: 1, sameSite: 'strict' });
    }
  }, [shouldShowBanner]);

  return (
    <>
      {shouldShowBanner && !isLogoutWarning ? (
        <GeneralNotice {...{ ...notificationBannerJson, ...{ setShouldShowBanner: setShouldShowBanner } }} />
      ) : (
        <LogoutWarning {...{ ...notificationBannerJson }} />
      )}
    </>
  );
};

export default NotificationBanner;
