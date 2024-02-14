import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { THEMES } from '@/storybook/preview';
import InPageAnnouncement from './index';
import mock from './mock.json';

export default {
  title: 'Components/In Page Announcement',
  component: InPageAnnouncement,
} as ComponentMeta<typeof InPageAnnouncement>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <InPageAnnouncement
        site={site?.toLowerCase()}
        {...args}
      />
    </Theme>
  );
};

Example.args = mock;

Example.storyName = 'InPageAnnouncement';
