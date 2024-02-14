import { useFormikContext } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';

import { analyticsStore } from '@/context/Analytics/Analytics';
import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';

import TextOutput from '@/utility/components/FormElement/Forgerock/TextOutputCallback';
import OneTimePasswordInput from '@/utility/components/FormElement/OneTimePassword/OneTimePasswordInput/OneTimePasswordInput';

import {
  ANALYTICS_NOT_APPLICABLE_URL,
  getFormattedPageName,
  handleAnalyticsClick,
  handleClientValidationErrors,
} from '@/utility/helpers/analytics';

import ContactUsRichText from '../ContactUsRichText';
import FormLabel from '../Label';
import { HeadingWithDivider, HeadingWithDividerH3, SubHeading } from '../StyledFormSection';

import { Button, ButtonWrapper, Description, Timer } from './StyledOneTimePassword';
import { OneTimePasswordProps, OTP_KEY, RESEND_VALUE } from './definitions';
import ActionButton from '../ActionButton';

const OneTimePassword: React.FC<OneTimePasswordProps> = ({
  cancelButtonLabel,
  contactUsDescription,
  continueButtonLabel,
  countdownTimerDescription,
  errorComponent,
  errorMap,
  handleOnClickCancel,
  handleOnClickContinue,
  handleOnClickResendOtp,
  heading,
  headingSize = 'h3',
  oneTimeStringAttributeInputCallback,
  oneTimePasswordInputLabel,
  resendOtpButtonLabel,
  setTimer,
  subheading,
  isLoading,
}) => {
  const { errors, setFieldValue, getFieldMeta } = useFormikContext();
  const { journeyFlow, modalTitle, sectionType } = analyticsStore();
  const { setErrorMessage } = errorMessageStore();
  const [timeLeft, setTimeLeft] = useState(setTimer);

  const id = oneTimePasswordInputLabel?.replace(' ', '-');

  // Countdown timer
  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  const formattedTimer = timeLeft < 10 ? `0${timeLeft}` : `${timeLeft}`;
  const formattedCountdownTimerDescription = countdownTimerDescription?.split('{timer}');

  const OTPInput = useMemo(
    () => <OneTimePasswordInput oneTimeStringAttributeInputCallback={oneTimeStringAttributeInputCallback} />,
    [oneTimeStringAttributeInputCallback],
  );

  const optValue = getFieldMeta(OTP_KEY)?.value ?? '';

  const Heading = (headingSize) =>
    headingSize === 'h3' ? (
      <HeadingWithDividerH3>{heading}</HeadingWithDividerH3>
    ) : (
      <HeadingWithDivider marginBottomSize={'micro4'}>{heading}</HeadingWithDivider>
    );

  return (
    <>
      {heading && <Heading>{heading}</Heading>}
      {subheading && <SubHeading>{subheading}</SubHeading>}

      {/* One time password field  */}
      {oneTimePasswordInputLabel && <FormLabel htmlFor={id}>{oneTimePasswordInputLabel}</FormLabel>}
      {OTPInput}

      {/* show error message */}
      {errorComponent && (
        <TextOutput
          errorComponent={errorComponent}
          errorMap={errorMap}
        />
      )}

      {/* Cancel and Continue  */}
      <ButtonWrapper>
        {handleOnClickCancel && cancelButtonLabel && (
          <Button
            type={'reset'}
            buttonStyle={'secondary'}
            buttonState={'secondary'}
            onClick={(e) => {
              handleOnClickCancel(e);
              handleAnalyticsClick('cancelUpdate', { cancelSection: sectionType, modalTitle: modalTitle });
            }}
          >
            {cancelButtonLabel}
          </Button>
        )}
        <ActionButton
          label={continueButtonLabel}
          onClick={() => {
            // clear the resend value when user tries to submit form
            if (optValue === RESEND_VALUE) {
              setFieldValue(OTP_KEY, '');
            }
            handleClientValidationErrors({ errors, journeyFlow, modalTitle });
            handleOnClickContinue;
            setTimeLeft(setTimer);
            setErrorMessage(null);
          }}
          type="submit"
          buttonType={'primary'}
          isLoading={isLoading}
        />
      </ButtonWrapper>
      {/* Countdown description  */}
      {countdownTimerDescription && (
        <Description>
          {formattedCountdownTimerDescription?.[0]}
          <Timer>{formattedTimer}</Timer>
          {formattedCountdownTimerDescription?.[1]}
        </Description>
      )}
      {/* Resend OTP */}
      <ButtonWrapper>
        <Button
          type={'submit'}
          buttonStyle={'secondary'}
          buttonState={timeLeft <= 0 ? 'secondary' : 'secondaryDisabled'}
          onClick={(e) => {
            if (timeLeft > 0) {
              e.preventDefault();
            } else {
              setTimeLeft(setTimer);
              oneTimeStringAttributeInputCallback.setInputValue(RESEND_VALUE);
              setFieldValue(OTP_KEY, RESEND_VALUE);
              handleOnClickResendOtp;
              handleAnalyticsClick('keyLinkInteraction', {
                keyLink: {
                  linkDestinationURL: ANALYTICS_NOT_APPLICABLE_URL,
                  linkOriginationPage: getFormattedPageName(),
                  linkPosition: heading,
                  linkTitle: resendOtpButtonLabel,
                },
              });
            }
          }}
        >
          {resendOtpButtonLabel}
        </Button>
      </ButtonWrapper>
      {/* Contact Us */}
      {contactUsDescription && <ContactUsRichText>{contactUsDescription}</ContactUsRichText>}
    </>
  );
};

export default OneTimePassword;
