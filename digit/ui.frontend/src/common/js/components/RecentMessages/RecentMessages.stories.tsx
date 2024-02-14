import React from 'react';

import { THEMES } from '@/storybook/preview';
import { ComponentMeta } from '@storybook/react';

import mock from './mock.json';
import RecentMessage from './RecentMessages';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/RecentMessages',
  component: RecentMessage,
} as ComponentMeta<typeof RecentMessage>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  return (
    // temporary hack until AEM integration completed
    <Theme>
      <RecentMessage
        {...args}
        site={site}
      />
    </Theme>
  );
};

Example.args = {
  attributes: mockStringified,
};

Example.storyName = 'RecentMessages';
