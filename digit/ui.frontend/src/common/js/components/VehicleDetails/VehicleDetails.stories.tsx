import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { THEMES } from '@/storybook/preview';
import VehicleDetails from './VehicleDetails';
import mock from './mock.json';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/Form/Accounts/Vehicle Details',
  component: VehicleDetails,
} as ComponentMeta<typeof VehicleDetails>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <VehicleDetails
        site={site?.toLowerCase()}
        {...args}
      />
    </Theme>
  );
};

Example.args = {
  attributes: mockStringified,
};

Example.storyName = 'Vehicle Details';
