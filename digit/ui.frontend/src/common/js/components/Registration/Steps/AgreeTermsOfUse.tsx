import { Form, Formik } from 'formik';
import React, { useState } from 'react';

import ActionButton from '@/utility/components/FormElement/ActionButton';
import Checkbox from '@/utility/components/FormElement/Checkbox';
import CallbackComponents from '@/utility/components/FormElement/Forgerock/CallbackComponents';
import FormSection from '@/utility/components/FormElement/FormSection';
import { HeadingWithDivider } from '@/utility/components/FormElement/StyledFormSection';

import { TermsOfUseProps } from '@/components/Registration/definitions';
import {
  AcceptTermsOfUseTitle,
  AcceptTermsOfUseWrapper,
  AgreeTermsHeader,
} from '@/components/Registration/StyledRegistration';

const AgreeTermsOfUse: React.FC<TermsOfUseProps> = ({
  agreeTerms,
  agreeTermsTitle,
  site,
  termsOfUse,
  step,
  nextStep,
  handleFormSubmit,
  btnText,
  errorMap,
  termsTitle,
  isLoading,
}) => {
  return (
    <Formik
      initialValues={{ terms: false }}
      onSubmit={handleFormSubmit}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form>
            <FormSection sectionWidth="threeQuartersWidth">
              <AgreeTermsHeader>
                <HeadingWithDivider>{termsTitle}</HeadingWithDivider>
              </AgreeTermsHeader>
              <CallbackComponents
                brand={site}
                errorMap={errorMap}
                nextStep={nextStep}
                step={step}
                termsOfUse={termsOfUse}
              />
              <AcceptTermsOfUseWrapper>
                <AcceptTermsOfUseTitle>{agreeTermsTitle}</AcceptTermsOfUseTitle>
                <Checkbox
                  htmlFor="terms"
                  label={agreeTerms}
                  name="terms"
                  onChange={(e) => {
                    setFieldValue('terms', e.target.checked);
                  }}
                />
                <ActionButton
                  label={btnText}
                  type={values?.terms ? 'submit' : 'disabled'}
                  buttonType={'primary'}
                  isLoading={isLoading}
                />
              </AcceptTermsOfUseWrapper>
            </FormSection>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AgreeTermsOfUse;
