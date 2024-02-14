import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { THEMES } from '@/storybook/preview';
import ProfileName from './ProfileName';
import mock from './mock.json';

const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/Form/Personal Profile/Profile Name',
  component: ProfileName,
} as ComponentMeta<typeof ProfileName>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <ProfileName
        site={site?.toLowerCase()}
        {...args}
      />
    </Theme>
  );
};

Example.args = {
  attributes: mockStringified,
};
Example.storyName = 'Profile Name';
