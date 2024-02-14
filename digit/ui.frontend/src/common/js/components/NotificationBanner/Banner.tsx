import React, { useState, useEffect } from 'react';

import { AEMProps } from '@/types/global/aem-definition';
import Icon from '@/utility/components/Icon';

import { NotificationBannerProps, NotificationIconType } from './definitions';
import { CloseButton, Container, Description, IconWrapper } from './StyledNotificationBanner';

const notificationIcon: NotificationIconType = {
  error: 'alert',
  info: 'info-circle',
  success: 'success',
  warning: 'alert',
};

const NotificationBanner = ({
  notificationDescription,
  notificationId,
  notificationType,
  setShouldShowBanner,
}: NotificationBannerProps) => {
  if (!notificationId) {
    return null;
  }
  return (
    <>
      <Container
        className={notificationType ?? 'success'}
        key={notificationId}
      >
        <IconWrapper>
          <Icon
            name={notificationIcon[notificationType]}
            isFunctional={true}
          />
        </IconWrapper>
        <Description>{notificationDescription}</Description>
        <CloseButton
          onClick={() => setShouldShowBanner(false)}
          aria-label={'dismiss notification'}
        >
          <Icon
            name={'close'}
            isFunctional={true}
          />
        </CloseButton>
      </Container>
    </>
  );
};

export default NotificationBanner;
