import * as forgeRock from '@forgerock/javascript-sdk';
import { Form, Formik } from 'formik';
import React, { useMemo } from 'react';

import { OtpProps } from '@/types/global/otp';

import CallbackComponents from '@/utility/components/FormElement/Forgerock/CallbackComponents';
import OneTimePassword from '@/utility/components/FormElement/OneTimePassword';
import { OTP_KEY } from '@/utility/components/FormElement/OneTimePassword/definitions';
import validationSchema from '@/utility/components/FormElement/OneTimePassword/validationSchema';
import { getFirstStringAttributeCallback } from '@/utility/helpers/forgerock';

const EmailOtp: React.FC<OtpProps> = ({
  communicationsConfig,
  errorComponent,
  errorMap,
  handleFormSubmit,
  nextStep,
  site,
  step,
  isLoading,
}) => {
  if (!communicationsConfig) {
    return null;
  }

  const otpValidation = useMemo(() => validationSchema(errorMap), []);

  return (
    <Formik
      initialValues={{ [OTP_KEY]: '' }}
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
                contactUsDescription={communicationsConfig?.verifyEmailDisclaimer}
                continueButtonLabel={communicationsConfig?.verifyEmailContinueButton}
                countdownTimerDescription={communicationsConfig?.verifyEmailResendText}
                errorComponent={errorComponent}
                errorMap={errorMap}
                heading={communicationsConfig?.verifyEmailTitle}
                headingSize="h2"
                // Foregerok onetimepassword callback
                oneTimeStringAttributeInputCallback={firstStringAttributeCallback}
                oneTimePasswordInputLabel={communicationsConfig?.verifyEmailOTPText}
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
              isLoading={isLoading}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default EmailOtp;
