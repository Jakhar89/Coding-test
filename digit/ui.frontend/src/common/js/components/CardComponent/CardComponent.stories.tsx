import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { THEMES } from '@/storybook/preview';
import mock from './mock.json';
import CardComponent from './CardComponent';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/CardComponent',
  component: CardComponent,
} as ComponentMeta<typeof CardComponent>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  return (
    // temporary hack until AEM integration completed
    <Theme>
      <CardComponent
        {...args}
        site={site}
      />
    </Theme>
  );
};
Example.args = {
  attributes: mockStringified,
};

Example.storyName = 'Card Component';
