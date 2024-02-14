import React from 'react';

import { THEMES } from '@/storybook/preview';
import { ComponentMeta } from '@storybook/react';

import CTAwithAssetPicker from './CTAwithAssetPicker';
import mock from './mock.json';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/Call to Action with Asset Picker',
  component: CTAwithAssetPicker,
} as ComponentMeta<typeof CTAwithAssetPicker>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <CTAwithAssetPicker
        site={site?.toLowerCase()}
        {...args}
      />
    </Theme>
  );
};

Example.args = {
  attributes: mockStringified,
};
Example.storyName = 'Call to Action with Asset Picker';
