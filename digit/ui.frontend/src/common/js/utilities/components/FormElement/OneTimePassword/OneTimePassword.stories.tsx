import { Form, Formik } from 'formik';
import { ComponentMeta } from '@storybook/react';
import { THEMES } from '@/storybook/preview';
import React from 'react';

import { OneTimePasswordFormValues, OTP_KEY } from './definitions';
import OneTimePassword from './index';
import validationSchema from './validationSchema';

export default {
  title: 'Foundations/Form Elements/One Time Password Input',
  component: OneTimePassword,
} as ComponentMeta<typeof OneTimePassword>;

export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  const contactUsDescription =
    'Still haven’t received your OTP code? Please contact our customer service team on 137 200 Mon-Fri 8.30am - 7.00pm AET.';
  const subheading =
    'You should have just received an SMS containing a one time password (OTP) to the mobile associated with your account. Please verify your account by entering the SMS OTP code below.';

  // Formik
  const initialValue = {
    OTP_KEY: '',
  };

  const handleFormSubmit = (values: OneTimePasswordFormValues) => {
    console.log(values[OTP_KEY]);
  };

  return (
    <Theme>
      <Formik
        initialValues={initialValue}
        onSubmit={handleFormSubmit}
        validationSchema={validationSchema}
        validateOnBlur={true}
        validateOnChange={false}
        validateOnMount={false}
      >
        {({ values }) => {
          return (
            <Form>
              <OneTimePassword
                cancelButtonLabel={'cancel'}
                contactUsDescription={contactUsDescription}
                continueButtonLabel={'continue'}
                countdownTimerDescription={'You can resend the SMS in {timer} seconds'}
                handleOnClickCancel={() => console.log('cancel')}
                handleOnClickResendOtp={() => console.log('resend otp')}
                value={values?.[OTP_KEY]}
                heading={'Verify your mobile'}
                oneTimePasswordInputLabel={'ENTER YOUR OTP CODE'}
                resendOtpButtonLabel={'resend otp'}
                setTimer={10}
                subheading={subheading}
              />
            </Form>
          );
        }}
      </Formik>
    </Theme>
  );
};

Example.storyName = 'One Time Password Input';
