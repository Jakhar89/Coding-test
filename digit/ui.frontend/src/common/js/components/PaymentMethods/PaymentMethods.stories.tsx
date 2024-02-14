import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { THEMES } from '@/storybook/preview';
import PaymentMethods from './PaymentMethods';
import mock from './mock.json';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/Form/Repayments/Payment Methods',
  component: PaymentMethods,
} as ComponentMeta<typeof PaymentMethods>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <PaymentMethods
        site={site?.toLowerCase()}
        {...args}
      />
    </Theme>
  );
};

Example.args = {
  attributes: mockStringified,
};

Example.storyName = 'EFT/BPAY';

export const Example2 = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <PaymentMethods
        site={site?.toLowerCase()}
        {...args}
      />
    </Theme>
  );
};

Example2.args = {
  attributes: JSON.stringify({ ...mock, nominatedPaymentOptionType: 'DirectDebit' }),
};

Example2.storyName = 'DirectDebit';
