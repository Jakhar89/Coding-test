import { Form, Formik } from 'formik';
import React from 'react';

import { THEMES } from '@/storybook/preview';
import { ComponentMeta } from '@storybook/react';

import FormLabel from '../Label';
import { FormElementWrapper } from '../StyledFormElements';
import SearchField from './index';

export default {
  title: 'Foundations/Form Elements',
  component: SearchField,
  argTypes: {},
} as ComponentMeta<any>;

export const Search = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Theme>
      <Formik
        initialValues={{
          searchField: '',
        }}
        onSubmit={handleFormSubmit}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <FormElementWrapper>
                <FormLabel htmlFor="searchField">Search</FormLabel>
                <SearchField
                  name="searchField"
                  value={values?.['searchField']}
                  setFieldValue={setFieldValue}
                  placeholder={'Search by description'}
                />
              </FormElementWrapper>
            </Form>
          );
        }}
      </Formik>
    </Theme>
  );
};
