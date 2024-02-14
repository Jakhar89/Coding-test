import React from 'react';

import { THEMES } from '@/storybook/preview';
import { ComponentMeta } from '@storybook/react';

import DataList from './index';
import mock from './mock.json';

export default {
  title: 'Foundations/Table/Data List',
  component: DataList,
} as ComponentMeta<typeof DataList>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  return (
    // temporary hack until AEM integration completed
    <Theme>
      <DataList
        {...mock}
        site={site?.toLowerCase().replace('-', '')}
        {...args}
      />
    </Theme>
  );
};
Example.storyName = 'Data List';
