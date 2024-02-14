import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { GridVisualiser } from './GridVisualiser';

export default {
  title: 'Foundations/Grid',
  component: GridVisualiser,
  argTypes: {},
} as Meta;

const Template: Story = (args) => <GridVisualiser {...args} />;

export const Grid = Template.bind({});
