import { ComponentMeta } from '@storybook/react';
import { THEMES } from '@/storybook/preview';
import React from 'react';

import LoadingOverlay from './LoadingOverlay';
import mock from './mock.json';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/Loading Overlay',
  component: LoadingOverlay,
} as ComponentMeta<typeof LoadingOverlay>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    <Theme>
      <LoadingOverlay {...args} />
    </Theme>
  );
};

Example.args = {
  attributes: mockStringified,
};
Example.storyName = 'Loading Overlay';
