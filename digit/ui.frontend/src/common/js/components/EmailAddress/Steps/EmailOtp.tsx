import * as forgeRock from '@forgerock/javascript-sdk';
import { Form, Formik } from 'formik';
import React, { useMemo } from 'react';

import { OtpProps } from '@/types/global/otp';

import CallbackComponents from '@/utility/components/FormElement/Forgerock/CallbackComponents';
import OneTimePassword from '@/utility/components/FormElement/OneTimePassword';
import validationSchema from '@/utility/components/FormElement/OneTimePassword/validationSchema';

import { getFirstStringAttributeCallback } from '@/utility/helpers/forgerock';

// prettier-ignore
const EmailOtp: React.FC<OtpProps> = ({
  communicationsConfig,
  errorComponent,
  errorMap,
  handleFormSubmit,
  handleOnClickCancel,
  nextStep,
  site,
  step,
  isLoading
}) => {
  if (!communicationsConfig) {
    return null;
  }
  const otpValidation = useMemo(() => validationSchema(errorMap), []);

  return (
    <Formik
      initialValues={{ 'preferences/otp': '' }}
      onSubmit={handleFormSubmit}
      validateOnBlur={true}
      validateOnChange={true}
      validateOnMount={true}
      validationSchema={otpValidation}
    >
      {({ handleChange, setFieldValue }) => {
        const firstStringAttributeCallback = getFirstStringAttributeCallback(
          step?.callbacks,
        ) as forgeRock.AttributeInputCallback<string>;
        return (
          <Form>
            {firstStringAttributeCallback && (
              <OneTimePassword
                cancelButtonLabel={communicationsConfig?.verifyEmailCancelButton}
                contactUsDescription={communicationsConfig?.verifyEmailDisclaimer}
                continueButtonLabel={communicationsConfig?.verifyEmailContinueButton}
                countdownTimerDescription={communicationsConfig?.verifyEmailResendText}
                errorComponent={errorComponent}
                errorMap={errorMap}
                handleOnClickCancel={(e) => handleOnClickCancel && handleOnClickCancel(e)}
                heading={communicationsConfig?.verifyEmailTitle}
                headingSize="h2"
                oneTimePasswordInputLabel={communicationsConfig?.verifyEmailOTPText}
                oneTimeStringAttributeInputCallback={firstStringAttributeCallback}
                resendOtpButtonLabel={communicationsConfig?.resendEmailText}
                setTimer={60}
                subheading={communicationsConfig?.verifyEmailDescription}
                isLoading={isLoading}
              />
            )}
            <CallbackComponents
              brand={site}
              errorMap={errorMap}
              handleChange={handleChange}
              nextStep={nextStep}
              setFieldValue={setFieldValue}
              step={step}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default EmailOtp;