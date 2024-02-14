import React from 'react';

import { userStore } from '@/context/User/User';
import { THEMES } from '@/storybook/preview';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import HeroBanner from './HeroBanner';
import mock from './mock.json';

const fiftyFiftyMockStringified = { ...mock, isHalfWidthBanner: true };
const greetingMockStringified = {
  ...mock,
  isPersonalizedGreeting: true,
  isLastLogin: true,
  isAuthenticatedMock: true,
};
const mockStringified = JSON.stringify(mock);

export default {
  title: 'Components/Hero Banner',
  component: HeroBanner,
} as ComponentMeta<typeof HeroBanner>;

const Template: ComponentStory<typeof HeroBanner> = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <HeroBanner
        site={site?.toLowerCase()}
        {...args}
      />
    </Theme>
  );
};

export const Example = Template.bind({});
export const Example2 = Template.bind({});
export const Example3 = Template.bind({});

Example.args = {
  attributes: mockStringified,
};

Example.storyName = 'Hero Banner';

Example2.args = {
  attributes: JSON.stringify(fiftyFiftyMockStringified),
};

Example2.storyName = 'Hero Banner - 50/50 width';

Example3.args = {
  attributes: JSON.stringify(greetingMockStringified),
};

Example3.storyName = 'Hero Banner - Personalized Greeting';
