import React from 'react';

import { THEMES } from '@/storybook/preview';
import { errorSuccessValues } from '@/utility/helpers/validation';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Header from './Header';
import mock from './mock.json';

const mockStringified = JSON.stringify(mock);
const portalMockString = { ...mock, hideHeaderMenu: true };

export default {
  title: 'Components/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <Header
        site={site?.toLowerCase()}
        {...args}
      />
    </Theme>
  );
};

export const Example = Template.bind({});
export const Example3 = Template.bind({});

Example.args = {
  attributes: mockStringified,
  errorSuccessMap: errorSuccessValues,
};

Example.storyName = 'Standard Header';

Example3.args = {
  attributes: JSON.stringify(portalMockString),
  errorSuccessMap: errorSuccessValues,
};

Example3.storyName = 'Portal Header';
