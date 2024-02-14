import React from 'react';

import { THEMES } from '@/storybook/preview';
import { ComponentMeta } from '@storybook/react';

import mock from './mock.json';
import PortalGatewayComponent from './PortalGatewayComponent';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/Form/Journeys/Portal Gateway Component',
  component: PortalGatewayComponent,
} as ComponentMeta<typeof PortalGatewayComponent>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  return (
    // temporary hack until AEM integration completed
    <Theme>
      <PortalGatewayComponent
        {...args}
        site={site}
      />
    </Theme>
  );
};

Example.args = {
  attributes: mockStringified,
};

Example.storyName = 'Portal Gateway Component';
