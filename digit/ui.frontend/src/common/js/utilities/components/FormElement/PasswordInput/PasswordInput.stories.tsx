import { Form, Formik } from 'formik';
import { ComponentMeta } from '@storybook/react';
import { THEMES } from '@/storybook/preview';
import React from 'react';

import { PasswordFormValues } from './definitions';
import PasswordInput from './index';
import validationSchema from './validationSchema';

import EditableSectionActions from '../../EditableSection/EditableSectionActions';

export default {
  title: 'Foundations/Form Elements/Password Input',
  component: PasswordInput,
} as ComponentMeta<typeof PasswordInput>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  const initialValue = {
    confirmPassword: '',
    newPassword: '',
  };

  const handleFormSubmit = (values: PasswordFormValues) => {
    const { newPassword, confirmPassword } = values;
    console.log(newPassword);
  };

  return (
    <Theme>
      <Formik
        initialValues={initialValue}
        onSubmit={handleFormSubmit}
        validateOnBlur={true}
        validateOnChange={false}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({ values, handleBlur, touched, handleChange }) => {
          return (
            <Form>
              <PasswordInput
                handleBlur={handleBlur}
                handleChange={handleChange}
                name="newPassword"
                passwordInputLabel="new password"
                values={values.newPassword}
                // uncomment when forgerock api is ready
                // passwordCallback={}
              />
              <PasswordInput
                handleBlur={handleBlur}
                handleChange={handleChange}
                name="confirmPassword"
                passwordInputLabel="confirm password"
                values={values.confirmPassword}
                // uncomment when forgerock api is ready
                // passwordCallback={}
              />
              <EditableSectionActions
                cancelLabel={'cancel'}
                saveLabel={'Save changes'}
                handleOnClickCancel={() => console.log('cancel')}
                handleOnClickSave={handleChange}
              />
            </Form>
          );
        }}
      </Formik>
    </Theme>
  );
};

Example.storyName = 'Password Input';
