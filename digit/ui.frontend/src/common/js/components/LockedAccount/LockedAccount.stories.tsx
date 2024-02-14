import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { THEMES } from '@/storybook/preview';

import { errorSuccessValues } from '@/utility/helpers/validation';

import LockedAccount from './LockedAccount';
import mock from './mock.json';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/Form/Journeys/Locked Account',
  component: LockedAccount,
} as ComponentMeta<typeof LockedAccount>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <LockedAccount
        site={site?.toLowerCase()}
        {...args}
      />
    </Theme>
  );
};

Example.args = {
  attributes: mockStringified,
  errorSuccessMap: errorSuccessValues,
};

Example.storyName = 'Locked Account';
