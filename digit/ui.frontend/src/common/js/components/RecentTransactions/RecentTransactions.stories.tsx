import React from 'react';

import { THEMES } from '@/storybook/preview';
import { ComponentMeta } from '@storybook/react';

import mock from './mock.json';
import RecentTransactions from './RecentTransactions';

export default {
  title: 'Components/Dashboard/RecentTransactions',
  component: RecentTransactions,
} as ComponentMeta<typeof RecentTransactions>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <RecentTransactions
        site={site?.toLowerCase()}
        contract="123456"
        {...args}
      />
    </Theme>
  );
};

Example.args = {
  accountSummaryJson: mock,
};
Example.storyName = 'Recent Transactions';
