import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { THEMES } from '@/storybook/preview';
import AccountDetails from './AccountDetails';
import mock from './mock.json';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/Form/Accounts/Account Details',
  component: AccountDetails,
} as ComponentMeta<typeof AccountDetails>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <AccountDetails
        site={site?.toLowerCase()}
        {...args}
      />
    </Theme>
  );
};

Example.args = {
  attributes: mockStringified,
};

Example.storyName = 'Account Details';
