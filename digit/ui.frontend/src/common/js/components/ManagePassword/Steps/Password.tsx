import { Form, Formik } from 'formik';
import React, { useMemo } from 'react';
import * as Yup from 'yup';

import { analyticsStore } from '@/context/Analytics/Analytics';
import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';

import EditableSectionActions from '@/utility/components/EditableSection/EditableSectionActions';
import { HeadingWithDividerH3, SubHeadingSection } from '@/utility/components/FormElement/StyledFormSection';
import CallbackComponents from '@/utility/components/FormElement/Forgerock/CallbackComponents';
import TextOutput from '@/utility/components/FormElement/Forgerock/TextOutputCallback';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';
import RichText from '@/utility/components/RichText';

import { handleClientValidationErrors } from '@/utility/helpers/analytics';
import { getAEMErrorMessageByCode } from '@/utility/helpers/validation';

const PasswordStep = ({
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
  const { journeyFlow, modalTitle } = analyticsStore();
  const { errorMessage, setErrorMessage } = errorMessageStore();

  //prettier-ignore
  const passwordValidation = useMemo(
    () =>
      Yup.object().shape({
      'preferences/oldPassword':
        Yup.string()
            .required(getAEMErrorMessageByCode('E27', errorMap)),
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
        'preferences/oldPassword': '',
      }}
      onSubmit={handleFormSubmit}
      validateOnBlur={true}
      validateOnChange={true}
      validateOnMount={false}
      validationSchema={passwordValidation}
    >
      {({ errors, handleBlur, handleChange, setFieldValue }) => (
        <Form>
          <HeadingWithDividerH3>
            {managePasswordJson.communicationsConfig?.managePasswordEditTitle}
          </HeadingWithDividerH3>
          <SubHeadingSection>
            <RichText>{managePasswordJson.communicationsConfig?.managePasswordDescription}</RichText>
          </SubHeadingSection>

          <CallbackComponents
            brand={site}
            errorMap={errorMap}
            handleBlur={handleBlur}
            handleChange={handleChange}
            nextStep={nextStep}
            setFieldValue={setFieldValue}
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

          <EditableSectionActions
            cancelLabel={managePasswordJson.cancelButtonText}
            saveLabel={managePasswordJson.saveButtonText}
            handleOnClickCancel={() => {
              setIsEditing(false);
              resetJourney(true);
            }}
            handleOnClickSave={() => {
              handleClientValidationErrors({ errors, journeyFlow, modalTitle });
              setErrorMessage(null);
            }}
            isLoading={isLoading}
          />
        </Form>
      )}
    </Formik>
  );
};

export default PasswordStep;
