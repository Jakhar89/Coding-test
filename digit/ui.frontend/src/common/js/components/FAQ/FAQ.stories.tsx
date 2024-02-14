import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { THEMES } from '@/storybook/preview';
import mock from './mock.json';
import FAQ from './FAQ';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/FAQ',
  component: FAQ,
} as ComponentMeta<typeof FAQ>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  return (
    // temporary hack until AEM integration completed
    <Theme>
      <FAQ
        {...args}
        site={site}
      />
    </Theme>
  );
};

Example.args = {
  attributes: mockStringified,
};

Example.storyName = 'FAQ Component';
