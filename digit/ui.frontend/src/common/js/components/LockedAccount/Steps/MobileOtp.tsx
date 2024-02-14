import * as forgeRock from '@forgerock/javascript-sdk';
import { Form, Formik } from 'formik';
import React, { useMemo } from 'react';

import { OtpProps } from '@/types/global/otp';

import CallbackComponents from '@/utility/components/FormElement/Forgerock/CallbackComponents';
import OneTimePassword from '@/utility/components/FormElement/OneTimePassword';
import { OTP_KEY } from '@/utility/components/FormElement/OneTimePassword/definitions';
import validationSchema from '@/utility/components/FormElement/OneTimePassword/validationSchema';
import { getFirstStringAttributeCallback } from '@/utility/helpers/forgerock';

const MobileOtp: React.FC<OtpProps> = ({
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
      validateOnMount={false}
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
                contactUsDescription={communicationsConfig?.verifyMobileDisclaimer}
                continueButtonLabel={communicationsConfig?.verifyMobileContinueButton}
                countdownTimerDescription={communicationsConfig?.verifyMobileResendText}
                errorComponent={errorComponent}
                errorMap={errorMap}
                heading={communicationsConfig?.verifyMobileTitle}
                headingSize="h2"
                // Foregerok onetimepassword callback
                oneTimeStringAttributeInputCallback={firstStringAttributeCallback}
                oneTimePasswordInputLabel={communicationsConfig?.verifyMobileOTPText}
                resendOtpButtonLabel={communicationsConfig?.resendSMSText}
                setTimer={60}
                subheading={communicationsConfig?.verifyMobileDescription}
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

export default MobileOtp;
