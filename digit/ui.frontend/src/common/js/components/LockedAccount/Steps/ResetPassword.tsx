import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useMemo } from 'react';

import { analyticsStore } from '@/context/Analytics/Analytics';
import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';

import { HeadingWithDividerH3, SubHeadingSection } from '@/utility/components/FormElement/StyledFormSection';
import CallbackComponents from '@/utility/components/FormElement/Forgerock/CallbackComponents';
import TextOutput from '@/utility/components/FormElement/Forgerock/TextOutputCallback';
import ActionButton from '@/utility/components/FormElement/ActionButton';
import { ResetPasswordProps } from '@/components/ForgotPassword/definitions';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';
import RichText from '@/utility/components/RichText';

import { handleClientValidationErrors } from '@/utility/helpers/analytics';
import { getAEMErrorMessageByCode } from '@/utility/helpers/validation';

const ResetPassword: React.FC<ResetPasswordProps> = ({
  // prettier-ignore
  communicationsConfig,
  errorComponent,
  errorMap,
  handleFormSubmit,
  nextStep,
  setPasswordText,
  site,
  step,
  isLoading,
}) => {
  const { journeyFlow, modalTitle } = analyticsStore();
  const { errorMessage, setErrorMessage } = errorMessageStore();

  //prettier-ignore
  const passwordValidation = useMemo(
    () =>
      Yup.object().shape({
      'password':
        Yup.string()
            .required(getAEMErrorMessageByCode('E27', errorMap)),
      'confirm-password': Yup.string()
        .required(getAEMErrorMessageByCode('E27', errorMap))
        .oneOf([Yup.ref('password'), null], 'Passwords do not match'),
      }),
    [],
  );

  return (
    <Formik
      //prettier-ignore
      initialValues={{
      'confirm-password': '',
      password: '',
    }}
      onSubmit={handleFormSubmit}
      validateOnBlur={true}
      validateOnChange={true}
      validateOnMount={false}
      validationSchema={passwordValidation}
    >
      {({ errors, handleBlur, handleChange, setFieldValue }) => (
        <Form>
          <HeadingWithDividerH3>{communicationsConfig?.managePasswordEditTitle}</HeadingWithDividerH3>
          <SubHeadingSection>
            <RichText>{communicationsConfig?.managePasswordDescription}</RichText>
          </SubHeadingSection>
          {/* prettier-ignore */}

          <CallbackComponents
            brand={site}
            errorMap={errorMap}
            handleBlur={handleBlur}
            handleChange={handleChange}
            nextStep={nextStep}
            setFieldValue={setFieldValue}
            shouldDisplayTextOutput={false}
            step={step}
            isLoading={isLoading}
          />

          {/* show timeout-type message */}
          {errorMessage && <InPageAnnouncement text={getAEMErrorMessageByCode(errorMessage, errorMap)} />}

          {/* show validation-type error message */}
          {errorComponent && (
            <TextOutput
              errorComponent={errorComponent}
              errorMap={errorMap}
            />
          )}

          <ActionButton
            label={setPasswordText}
            onClick={() => {
              handleClientValidationErrors({ errors, journeyFlow, modalTitle });
              setErrorMessage(null);
            }}
            type="submit"
            buttonType={'primary'}
            isLoading={isLoading}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ResetPassword;
