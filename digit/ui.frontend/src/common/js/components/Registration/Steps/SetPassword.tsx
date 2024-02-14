import { Form, Formik } from 'formik';
import React, { useMemo } from 'react';
import * as Yup from 'yup';

import { analyticsStore } from '@/context/Analytics/Analytics';

import CallbackComponents from '@/utility/components/FormElement/Forgerock/CallbackComponents';
import ActionButton from '@/utility/components/FormElement/ActionButton';
import { HeadingWithDivider, SubHeadingSection } from '@/utility/components/FormElement/StyledFormSection';
import RichText from '@/utility/components/RichText';

import { handleClientValidationErrors } from '@/utility/helpers/analytics';
import { getAEMErrorMessageByCode } from '@/utility/helpers/validation';

import { SetPasswordProps } from '../definitions';

const SetPassword: React.FC<SetPasswordProps> = ({
  btnText,
  description,
  errorMap,
  handleFormSubmit,
  nextStep,
  site,
  step,
  title,
  isLoading,
}) => {
  const { journeyFlow, modalTitle } = analyticsStore();

  //prettier-ignore
  const passwordValidation =useMemo(
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
    <>
      {/* output the form elements from Forgerock API response */}
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
        {({ errors, handleChange, setFieldValue, handleBlur }) => (
          <Form>
            {title && <HeadingWithDivider marginBottomSize={'micro4'}>{title}</HeadingWithDivider>}
            {description && (
              <SubHeadingSection>
                <RichText>{description}</RichText>
              </SubHeadingSection>
            )}
            <CallbackComponents
              brand={site}
              errorMap={errorMap}
              handleBlur={handleBlur}
              handleChange={handleChange}
              nextStep={nextStep}
              setFieldValue={setFieldValue}
              step={step}
            />
            <ActionButton
              label={btnText}
              onClick={() => handleClientValidationErrors({ errors, journeyFlow, modalTitle })}
              type="submit"
              isLoading={isLoading}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SetPassword;
