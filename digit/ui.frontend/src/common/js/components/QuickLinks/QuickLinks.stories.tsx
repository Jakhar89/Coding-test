import React from 'react';

import { THEMES } from '@/storybook/preview';
import { ComponentMeta } from '@storybook/react';

import mock from './mock.json';
import QuickLinks from './QuickLinks';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/QuickLinks',
  component: QuickLinks,
} as ComponentMeta<typeof QuickLinks>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  return (
    // temporary hack until AEM integration completed
    <Theme>
      <QuickLinks
        {...args}
        site={site}
      />
    </Theme>
  );
};

Example.args = {
  attributes: mockStringified,
};

Example.storyName = 'QuickLinks';
