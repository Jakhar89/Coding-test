import { Form, Formik } from 'formik';
import React, { useMemo } from 'react';
import * as Yup from 'yup';

import { analyticsStore } from '@/context/Analytics/Analytics';
import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';

import ActionButton from '@/utility/components/FormElement/ActionButton';
import ContactUsRichText from '@/utility/components/FormElement/ContactUsRichText';
import CallbackComponents from '@/utility/components/FormElement/Forgerock/CallbackComponents';
import TextOutput from '@/utility/components/FormElement/Forgerock/TextOutputCallback';
import { HeadingWithDivider, SubHeading } from '@/utility/components/FormElement/StyledFormSection';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';

import { handleClientValidationErrors } from '@/utility/helpers/analytics';
import { getAEMErrorMessageByCode } from '@/utility/helpers/validation';

import { ForgotYourPasswordProps } from '../definitions';

const ForgotYourPassword: React.FC<ForgotYourPasswordProps> = ({
  btnText,
  errorComponent,
  errorMap,
  handleFormSubmit,
  isLoading,
  nextStep,
  forgotPasswordContact,
  forgotPasswordDescription,
  forgotPasswordTitle,
  site,
  step,
}) => {
  const { journeyFlow, modalTitle } = analyticsStore();
  const { errorMessage, setErrorMessage } = errorMessageStore();

  const emailValidation = useMemo(
    () =>
      Yup.object().shape({
        mail:
          //prettier-ignore
          Yup.string()
          .required(getAEMErrorMessageByCode('E06', errorMap))
          .email(getAEMErrorMessageByCode('E06', errorMap)),
        recaptcha:
          //prettier-ignore
          Yup.string()
          .nullable()
          .required('Please verify reCAPTCHA'),
      }),
    [],
  );

  return (
    <>
      <HeadingWithDivider marginBottomSize="micro4">{forgotPasswordTitle}</HeadingWithDivider>
      <SubHeading>{forgotPasswordDescription}</SubHeading>

      {/* output the form elements from Foregrock API response */}
      <Formik
        initialValues={{ mail: '', recaptcha: '' }}
        onSubmit={handleFormSubmit}
        validateOnBlur={true}
        validateOnChange={true}
        validateOnMount={false}
        validationSchema={emailValidation}
      >
        {({ errors, handleBlur, handleChange, setFieldValue }) => (
          <Form>
            <CallbackComponents
              brand={site}
              errorMap={errorMap}
              handleBlur={handleBlur}
              handleChange={handleChange}
              isLoading={isLoading}
              nextStep={nextStep}
              setFieldValue={setFieldValue}
              step={step}
            />

            {/* show timeout-type message */}
            {errorMessage && <InPageAnnouncement text={getAEMErrorMessageByCode(errorMessage, errorMap)} />}

            {/* show error message */}
            {errorComponent && (
              <TextOutput
                errorComponent={errorComponent}
                errorMap={errorMap}
              />
            )}

            <ActionButton
              label={btnText}
              onClick={() => {
                handleClientValidationErrors({ errors, journeyFlow, modalTitle });
                setErrorMessage(null);
              }}
              type="submit"
              isLoading={isLoading}
            />
            <ContactUsRichText>{forgotPasswordContact}</ContactUsRichText>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ForgotYourPassword;
