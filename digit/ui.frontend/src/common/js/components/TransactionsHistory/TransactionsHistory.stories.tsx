import React from 'react';

import { THEMES } from '@/storybook/preview';
import { ComponentMeta } from '@storybook/react';

import mock from './mock.json';
import TransactionsHistory from './TransactionsHistory';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/TransactionsHistory',
  component: TransactionsHistory,
} as ComponentMeta<typeof TransactionsHistory>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  return (
    // temporary hack until AEM integration completed
    <Theme>
      <TransactionsHistory
        {...args}
        site={site}
      />
    </Theme>
  );
};

Example.args = {
  attributes: mockStringified,
};

Example.storyName = 'TransactionsHistory';
