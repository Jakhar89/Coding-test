import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { THEMES } from '@/storybook/preview';

import MessageBox from './MessageBox';

export default {
  title: 'Components/MessageBox',
  component: MessageBox,
} as ComponentMeta<typeof MessageBox>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  return (
    // temporary hack until AEM integration completed
    <Theme>
      <MessageBox
        {...args}
        site={site}
      />
    </Theme>
  );
};

Example.storyName = 'Message Box';
