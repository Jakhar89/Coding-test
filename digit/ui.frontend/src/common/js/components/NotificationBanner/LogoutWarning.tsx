import React, { useState, useEffect } from 'react';

import { userStore } from '@/context/User/User';

import Banner from './Banner';

import { NotificationBannerProps } from './definitions';

const LogoutWarning = (props: NotificationBannerProps) => {
  if (!props?.notificationId) {
    return null;
  }

  const { isAuthenticated, setShouldShowAutomatedLogoutWarning, shouldShowAutomatedLogoutWarning } = userStore();
  const [shouldShowBanner, setShouldShowBanner] = useState(true);

  useEffect(() => {
    if (isAuthenticated && shouldShowAutomatedLogoutWarning) {
      setShouldShowBanner(true);
    }
  }, [isAuthenticated, shouldShowAutomatedLogoutWarning]);

  // this is to manually override the automated showing when user clicks dismiss 'x' icon
  useEffect(() => {
    if (!shouldShowBanner) {
      setShouldShowAutomatedLogoutWarning(false);
    }
  }, [shouldShowBanner]);

  return (
    <>
      {shouldShowAutomatedLogoutWarning && shouldShowBanner && (
        <Banner {...{ ...props, ...{ setShouldShowBanner: setShouldShowBanner } }} />
      )}
    </>
  );
};

export default LogoutWarning;
