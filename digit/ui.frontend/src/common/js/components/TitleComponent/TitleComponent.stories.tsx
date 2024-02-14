import React from 'react';

import { THEMES } from '@/storybook/preview';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import mock from './mock.json';
import TitleComponent from './TitleComponent';

const mockStringified = (mock) => {
  return JSON.stringify(mock);
};

export default {
  title: 'Components/TitleComponent',
  component: TitleComponent,
} as ComponentMeta<typeof TitleComponent>;

const Template: ComponentStory<typeof TitleComponent> = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  return (
    // temporary hack until AEM integration completed
    <Theme>
      <TitleComponent
        {...args}
        site={site}
      />
    </Theme>
  );
};

export const Example = Template.bind({});
export const Example2 = Template.bind({});
export const Example3 = Template.bind({});
export const Example4 = Template.bind({});

Example.args = {
  attributes: mockStringified({ ...mock, isSmallTitle: null, linkTitle: '', redirectionPath: '' }),
};

Example.storyName = 'Title Component Standard';

Example2.args = {
  attributes: mockStringified({ ...mock, isSmallTitle: null }),
};

Example2.storyName = 'Title Component Standard with Link';

Example3.args = {
  attributes: mockStringified({ ...mock, isSmallTitle: true, linkTitle: '', redirectionPath: '' }),
};

Example3.storyName = 'Title Component Small';

Example4.args = {
  attributes: mockStringified({ ...mock, isSmallTitle: true }),
};

Example4.storyName = 'Title Component Small with Link';
