import { ComponentMeta } from '@storybook/react';

import React from 'react';
import { THEMES } from '@/storybook/preview';

import { errorSuccessValues } from '@/utility/helpers/validation';

import Registration from './Registration';
import mock from './mock.json';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/Form/Journeys/Registration',
  component: Registration,
} as ComponentMeta<typeof Registration>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  return (
    // temporary hack until AEM integration completed
    <Theme>
      <Registration
        {...args}
        site={site}
      />
    </Theme>
  );
};

Example.args = {
  attributes: mockStringified,
  errorSuccessMap: errorSuccessValues,
};

Example.storyName = 'Registration';
