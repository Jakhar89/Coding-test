import { THEMES } from '@/storybook/preview';
import { ComponentMeta } from '@storybook/react';

import React from 'react';

import AddressDetails from './AddressDetails';
import mock from './mock.json';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/Form/Personal Profile/Address Details',
  component: AddressDetails,
} as ComponentMeta<typeof AddressDetails>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <AddressDetails
        site={site?.toLowerCase()}
        {...args}
      />
    </Theme>
  );
};

Example.args = {
  attributes: mockStringified,
};

Example.storyName = 'Address Details';
