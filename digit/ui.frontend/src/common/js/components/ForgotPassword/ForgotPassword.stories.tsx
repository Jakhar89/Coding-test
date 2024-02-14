import { ComponentMeta } from '@storybook/react';
import { THEMES } from '@/storybook/preview';
import React from 'react';

import { errorSuccessValues } from '@/utility/helpers/validation';

import ForgotPassword from './ForgotPassword';
import mock from './mock.json';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/Form/Journeys/Forgot Password',
  component: ForgotPassword,
} as ComponentMeta<typeof ForgotPassword>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  return (
    // temporary hack until AEM integration completed
    <Theme>
      <ForgotPassword
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

Example.storyName = 'Forgot Password';
