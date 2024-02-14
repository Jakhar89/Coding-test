import React from 'react';

import Banner from './Banner';
import { NotificationBannerProps } from './definitions';

const GeneralNotice = (props: NotificationBannerProps) => {
  if (!props?.notificationId) {
    return null;
  }

  return (
    <>
      <Banner {...props} />
    </>
  );
};

export default GeneralNotice;
