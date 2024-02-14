import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { THEMES } from '@/storybook/preview';
import mock from './mock.json';
import DisputeProcessComponent from './DisputeProcessComponent';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/DisputeProcessComponent',
  component: DisputeProcessComponent,
} as ComponentMeta<typeof DisputeProcessComponent>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  return (
    // temporary hack until AEM integration completed
    <Theme>
      <DisputeProcessComponent
        {...args}
        site={site}
      />
    </Theme>
  );
};

Example.args = {
  attributes: mockStringified,
};

Example.storyName = 'Dispute Process Component';
