import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { THEMES } from '@/storybook/preview';

import { errorSuccessValues } from '@/utility/helpers/validation';

import ManagePassword from './ManagePassword';
import mock from './mock.json';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/Form/Personal Profile/Manage Password',
  component: ManagePassword,
} as ComponentMeta<typeof ManagePassword>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  return (
    // temporary hack until AEM integration completed
    <Theme>
      <ManagePassword
        site={site}
        {...args}
      />
    </Theme>
  );
};

Example.args = {
  attributes: mockStringified,
  errorSuccessMap: errorSuccessValues,
};

Example.storyName = 'Manage Password';
