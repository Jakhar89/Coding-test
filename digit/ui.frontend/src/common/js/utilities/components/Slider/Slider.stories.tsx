import React from 'react';

import { THEMES } from '@/storybook/preview';
import { ComponentMeta } from '@storybook/react';

import mock from './mock.json';
import Slider from './Slider';
import { Copy, Title } from './StyledSlider';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Foundations/Slider',
  component: Slider,
} as ComponentMeta<typeof Slider>;

const slide = (index) => (
  <div style={{ padding: '20px' }}>
    <Title>Title {index}</Title>
    <Copy>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua.
    </Copy>
  </div>
);

const slides = [slide(1), slide(2), slide(3), slide(4), slide(5)];

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  return (
    // temporary hack until AEM integration completed
    <Theme>
      <Slider slides={slides} />
    </Theme>
  );
};

Example.args = {
  attributes: mockStringified,
};

Example.storyName = 'Slider';
