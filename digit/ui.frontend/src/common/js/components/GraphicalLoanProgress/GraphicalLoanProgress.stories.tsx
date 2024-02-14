import React from 'react';

import { THEMES } from '@/storybook/preview';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import GraphicalLoanProgress from './GraphicalLoanProgress';
import mock from './mock.json';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/Dashboard/Graphical Loan Progress',
  component: GraphicalLoanProgress,
} as ComponentMeta<typeof GraphicalLoanProgress>;

const Template: ComponentStory<any> = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  return (
    <Theme>
      <GraphicalLoanProgress
        site={site?.toLowerCase()}
        {...args}
      />
    </Theme>
  );
};

export const Example = Template.bind({});
Example.args = {
  ...mock,
  attributes: mockStringified,
};
Example.storyName = 'Graphical Loan Progress';
