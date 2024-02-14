import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { THEMES } from '@/storybook/preview';
import PhoneNumber from './PhoneNumber';
import mock from './mock.json';
import { errorSuccessValues } from '@/utility/helpers/validation';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/Form/Personal Profile/Phone Number',
  component: PhoneNumber,
} as ComponentMeta<typeof PhoneNumber>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <PhoneNumber
        site={site?.toLowerCase()}
        {...args}
      />
    </Theme>
  );
};

Example.args = {
  attributes: mockStringified,
  errorSuccessMap: errorSuccessValues,
  // TODO remove after formal API integration
  forceAPIError: false,
};

Example.storyName = 'Phone Number';
