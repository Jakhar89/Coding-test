import { ComponentMeta } from '@storybook/react';
import { withQuery } from '@storybook/addon-queryparams';
import React from 'react';
import { THEMES } from '@/storybook/preview';
import Header from './Header';
import mock from './mock.json';
import NotificationBanner from '../NotificationBanner/NotificationBanner';

import { userStore } from '@/context/User/User';

const mockData = {
  ...mock,
  ...{
    idleRedirectDesktop: 15000,
    idleRedirectMobileTablet: 10000,
    idleWarningDesktop: 10000,
    idleWarningMobileTablet: 5000,
    notificationDescription:
      'You have been inactive for a few minutes. For security reasons you will be automatically logged out after 15 minutes.',
    notificationId: 'idleWarningNotification',
    notificationType: 'warning',
  },
};

const mockStringified = JSON.stringify(mockData);

export default {
  title: 'Components/Header',
  component: Header,
  decorators: [withQuery],
  parameters: {
    query: {
      debug: 'true',
    },
  },
} as ComponentMeta<typeof Header>;

export const Example2 = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  userStore(({ setIsAuthenticated }) => setIsAuthenticated(true));

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <Header
        site={site?.toLowerCase()}
        {...args}
      />
      <NotificationBanner
        site={site}
        {...args}
      />
    </Theme>
  );
};

Example2.args = {
  attributes: mockStringified,
};

Example2.storyName = 'Header with Logout Warning';
