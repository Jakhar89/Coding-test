import React from 'react';

import { THEMES } from '@/storybook/preview';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import IconText from './IconText';
import mock from './mock.json';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/Icon Text',
  component: IconText,
} as ComponentMeta<typeof IconText>;

const Template: ComponentStory<typeof IconText> = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <IconText
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

Example.storyName = 'Icon Text';
