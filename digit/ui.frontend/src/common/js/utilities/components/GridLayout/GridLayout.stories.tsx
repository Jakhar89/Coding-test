import React from 'react';

import { THEMES } from '@/storybook/preview';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Grids from './GridLayout';
import mock from './mock.json';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Foundations/Grid Layouts',
  component: Grids,
} as ComponentMeta<typeof Grids>;

const Template: ComponentStory<typeof Grids> = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <Grids
        site={site?.toLowerCase()}
        {...args}
      />
    </Theme>
  );
};

export const Example = Template.bind({});

Example.args = {
  attributes: mockStringified,
};

Example.storyName = 'Grid Layouts';
