import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Formik } from 'formik';
import React from 'react';

import { addDaystoDate } from '@/utility/helpers/dateTime';

import { default as ToyotaTheme } from '@/utility/theme/toyota';
import { default as LexusTheme } from '@/utility/theme/lexus';
import { default as PowerTorqueTheme } from '@/utility/theme/powertorque';
import { default as PowerAllianceTheme } from '@/utility/theme/power-alliance';
import { default as MazdaTheme } from '@/utility/theme/mazda';
import { default as HinoTheme } from '@/utility/theme/hino';
import { default as SuzukiTheme } from '@/utility/theme/suzuki';

import FormLabel from '../Label';
import { FormElementWrapper } from '../StyledFormElements';

import DatePicker from './index';

export default {
  title: 'Foundations/Form Elements/Date Picker',
  component: DatePicker,
  argTypes: {},
} as ComponentMeta<any>;

const RenderDatePicker = () => {
  return (
    <div>
      <FormElementWrapper>
        <FormLabel htmlFor="datePicker">Date Picker</FormLabel>
        <DatePicker
          name="datePicker"
          minDate={new Date()}
          maxDate={addDaystoDate(new Date(), 60)}
          placeholder={'Select a date'}
        />
      </FormElementWrapper>

      <FormElementWrapper>
        <FormLabel htmlFor="datePickerReadOnly">Date Picker Read Only</FormLabel>
        <DatePicker
          name="datePickerReadOnly"
          minDate={new Date()}
          maxDate={addDaystoDate(new Date(), 5)}
          placeholder={'Select a date'}
          readOnly={true}
        />
      </FormElementWrapper>
    </div>
  );
};

const Template: ComponentStory<any> = ({ Theme }) => (
  <Theme>
    <Formik
      initialValues={{ datePicker: new Date(), datePickerReadOnly: new Date() }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(props) => {
        const { handleSubmit } = props;
        return (
          <form onSubmit={handleSubmit}>
            <RenderDatePicker />
          </form>
        );
      }}
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
