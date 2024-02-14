import React from 'react';

import { THEMES } from '@/storybook/preview';
import { errorSuccessValues } from '@/utility/helpers/validation';
import { ComponentMeta } from '@storybook/react';

import ContactUsForm from './ContactUsForm';
import mock from './mock.json';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/Form/Contact Us',
  component: ContactUsForm,
} as ComponentMeta<typeof ContactUsForm>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    <Theme>
      <ContactUsForm
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

Example.storyName = 'Contact Us';
