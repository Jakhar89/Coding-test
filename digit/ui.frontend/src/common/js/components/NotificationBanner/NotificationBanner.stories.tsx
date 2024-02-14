import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { THEMES } from '@/storybook/preview';
import NotificationBanner from './NotificationBanner';
import mock from './mock.json';

const modifiedOncePerPageLoadMock = { ...mock, isNotificationHasNoLimit: true };
const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/Notification Banner',
  component: NotificationBanner,
} as ComponentMeta<typeof NotificationBanner>;

const Template: ComponentStory<typeof NotificationBanner> = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <NotificationBanner
        site={site}
        {...args}
      />
    </Theme>
  );
};

export const Example = Template.bind({});
export const Example2 = Template.bind({});

Example.args = {
  attributes: mockStringified,
};

Example.storyName = 'Notification Banner - dismiss once per session';

Example2.args = {
  attributes: JSON.stringify(modifiedOncePerPageLoadMock),
};

Example2.storyName = 'Notification Banner - dismiss once per page load';
