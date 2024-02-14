import { ComponentMeta, ComponentStory } from '@storybook/react';
import { THEMES } from '@/storybook/preview';
import React, { useState } from 'react';

import ModalOverlay from '.';
import ActionButton from '../FormElement/ActionButton';

export default {
  title: 'Foundations/Modal Overlay',
  component: ModalOverlay,
} as ComponentMeta<typeof ModalOverlay>;

const Template: ComponentStory<typeof ModalOverlay> = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  const [shouldShowModal, setShouldShowModal] = useState(false);

  return (
    <Theme>
      <ActionButton
        label="open modal"
        handleOnClick={() => setShouldShowModal(true)}
      />
      {/* @ts-ignore */}
      <ModalOverlay
        {...args}
        setShouldShowModal={setShouldShowModal}
        shouldShowModalOverlay={shouldShowModal}
      />
    </Theme>
  );
};

export const Example = Template.bind({});
export const Example2 = Template.bind({});

const args = {
  description: "You've successfully updated your section",
};

Example.storyName = 'Modal Overlay';
Example.args = args;

Example2.storyName = 'Modal Overlay - with Quest error';
Example2.args = {
  ...args,
  hasQuestApiError: true,
};
