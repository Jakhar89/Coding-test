import React from 'react';

import { THEMES } from '@/storybook/preview';
import { ComponentMeta } from '@storybook/react';

import DynamicDataList from './dynamicList';
import mock from './mock.json';

export default {
  title: 'Foundations/Table/Dynamic Data List',
  component: DynamicDataList,
} as ComponentMeta<typeof DynamicDataList>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  return (
    // temporary hack until AEM integration completed
    <Theme>
      <DynamicDataList
        listHeaders={mock.listHeaders}
        data={mock.dynamicData}
        site={site?.toLowerCase().replace('-', '')}
        {...args}
      />
    </Theme>
  );
};
Example.storyName = 'Dynamic Data List';
