import React from 'react';

import { THEMES } from '@/storybook/preview';
import { ComponentMeta } from '@storybook/react';

import AccountSummary from './AccountSummary';
import mock from './mock.json';
import { StoryContainer } from './StyledAccountSummary';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/AccountSummary',
  component: AccountSummary,
} as ComponentMeta<typeof AccountSummary>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  return (
    // temporary hack until AEM integration completed
    <Theme>
      <StoryContainer id="account-summary-container">
        <AccountSummary
          {...args}
          site={site}
        />
      </StoryContainer>
    </Theme>
  );
};
Example.args = {
  attributes: mockStringified,
};

Example.storyName = 'Account Summary';
