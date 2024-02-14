import * as forgeRock from '@forgerock/javascript-sdk';
import { Form, Formik } from 'formik';
import React, { useMemo } from 'react';

import { OtpProps } from '@/types/global/otp';

import CallbackComponents from '@/utility/components/FormElement/Forgerock/CallbackComponents';
import OneTimePassword from '@/utility/components/FormElement/OneTimePassword';
import { OTP_KEY } from '@/utility/components/FormElement/OneTimePassword/definitions';
import validationSchema from '@/utility/components/FormElement/OneTimePassword/validationSchema';

import { getFirstStringAttributeCallback } from '@/utility/helpers/forgerock';
import { StateSetter } from '@/types/global/generic';

const MobileOtp: React.FC<
  OtpProps & { managePasswordJson: any; resetJourney: StateSetter<boolean>; setIsEditing: StateSetter<boolean> }
> = ({
  errorComponent,
  errorMap,
  handleFormSubmit,
  managePasswordJson,
  nextStep,
  resetJourney,
  setIsEditing,
  site,
  step,
  isLoading,
}) => {
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
                cancelButtonLabel={managePasswordJson.communicationsConfig?.verifyMobileCancelButton}
                contactUsDescription={managePasswordJson.communicationsConfig?.verifyMobileDisclaimer ?? ''}
                continueButtonLabel={managePasswordJson.communicationsConfig?.verifyMobileContinueButton}
                countdownTimerDescription={managePasswordJson.communicationsConfig?.verifyMobileResendText ?? ''}
                errorComponent={errorComponent}
                errorMap={errorMap}
                handleOnClickCancel={() => {
                  setIsEditing(false);
                  resetJourney(true);
                }}
                heading={managePasswordJson.communicationsConfig?.verifyMobileTitle ?? ''}
                oneTimePasswordInputLabel={managePasswordJson.communicationsConfig?.verifyMobileOTPText ?? ''}
                oneTimeStringAttributeInputCallback={firstStringAttributeCallback}
                resendOtpButtonLabel={managePasswordJson.communicationsConfig?.resendSMSText ?? ''}
                setTimer={60}
                subheading={managePasswordJson.communicationsConfig?.verifyMobileDescription ?? ''}
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
