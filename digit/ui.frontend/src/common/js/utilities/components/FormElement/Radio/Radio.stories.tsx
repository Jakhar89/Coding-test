import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Formik } from 'formik';
import React from 'react';

import { default as ToyotaTheme } from '@/utility/theme/toyota';
import { default as LexusTheme } from '@/utility/theme/lexus';
import { default as PowerTorqueTheme } from '@/utility/theme/powertorque';
import { default as PowerAllianceTheme } from '@/utility/theme/power-alliance';
import { default as MazdaTheme } from '@/utility/theme/mazda';
import { default as HinoTheme } from '@/utility/theme/hino';
import { default as SuzukiTheme } from '@/utility/theme/suzuki';

import FormLabel from '../Label';

import Radio from './index';
import mock from './mock.json';

export default {
  title: 'Foundations/Form Elements/Radio',
  component: Radio,
  argTypes: {},
} as ComponentMeta<any>;

const RenderRadio = () => {
  return (
    <div>
      <FormLabel htmlFor="radio">Radio</FormLabel>
      <Radio {...mock}></Radio>
      <FormLabel htmlFor="radio">Radio with error</FormLabel>
      <Radio
        {...mock}
        hasError
      ></Radio>
    </div>
  );
};

const Template: ComponentStory<any> = ({ Theme }) => (
  <Theme>
    <Formik>
      <RenderRadio />
    </Formik>
  </Theme>
);
export const Example1 = Template.bind({});
Example1.args = {
  Theme: HinoTheme,
};
Example1.storyName = 'Hino';

export const Example2 = Template.bind({});
Example2.args = {
  Theme: LexusTheme,
};
Example2.storyName = 'Lexus';

export const Example3 = Template.bind({});
Example3.args = {
  Theme: MazdaTheme,
};
Example3.storyName = 'Mazda';

export const Example4 = Template.bind({});
Example4.args = {
  Theme: PowerAllianceTheme,
};
Example4.storyName = 'Power Alliance';

export const Example5 = Template.bind({});
Example5.args = {
  Theme: PowerTorqueTheme,
};
Example5.storyName = 'Power Torque';

export const Example6 = Template.bind({});
Example6.args = {
  Theme: ToyotaTheme,
};
Example6.storyName = 'Toyota';

export const Example7 = Template.bind({});
Example7.args = {
  Theme: SuzukiTheme,
};
Example7.storyName = 'Suzuki';
