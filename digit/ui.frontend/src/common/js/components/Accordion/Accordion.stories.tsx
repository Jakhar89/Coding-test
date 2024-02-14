import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { THEMES } from '@/storybook/preview';
import Accordion from './Accordion';
import mock from './mock.json';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/Accordion',
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  return (
    // temporary hack until AEM integration completed
    <Theme>
      <Accordion
        {...args}
        site={site}
      />
    </Theme>
  );
};

Example.args = {
  attributes: mockStringified,
};

Example.storyName = 'Accordion';
