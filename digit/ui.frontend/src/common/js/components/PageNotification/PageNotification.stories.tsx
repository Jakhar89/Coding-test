import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { THEMES } from '@/storybook/preview';
import PageNotification from './PageNotification';
import mock from './mock.json';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/Page Notification',
  component: PageNotification,
} as ComponentMeta<typeof PageNotification>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <PageNotification
        site={site?.toLowerCase()}
        {...args}
      />
    </Theme>
  );
};

Example.args = {
  attributes: mockStringified,
};

Example.storyName = 'Page Notification';

export const Example2 = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <PageNotification
        site={site?.toLowerCase()}
        handleOnClick={() => alert('button clicked')}
        {...args}
      />
    </Theme>
  );
};

Example2.args = {
  attributes: mockStringified,
};

Example2.storyName = 'Page Notification with handleOnClick fn';
