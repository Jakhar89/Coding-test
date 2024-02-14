import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import ActionButton from '@/utility/components/FormElement/ActionButton';
import Checkbox from '@/utility/components/FormElement/Checkbox';
import FormSection from '@/utility/components/FormElement/FormSection';
import { HeadingWithDivider, TermsOfUseWrapper } from '@/utility/components/FormElement/StyledFormSection';

import { TermsOfUseProps } from '@/components/Registration/definitions';
import {
  AcceptTermsOfUseTitle,
  AcceptTermsOfUseWrapper,
  AgreeTermsHeader,
} from '@/components/Registration/StyledRegistration';
import RichText from '@/utility/components/RichText';
import ScrollableGradientWrapper from '@/utility/components/FormElement/ScrollableGradientWrapper';
import { LoginParsedProps } from '../definitions';
import { postCallAPI } from '@/utility/helpers/api';

const AgreeTermsOfUse: React.FC<TermsOfUseProps> = ({
  agreeTerms,
  agreeTermsTitle,
  termsOfUse,
  btnText,
  errorSuccessMap,
  termsTitle,
  attributes,
}) => {
  const loginJson: LoginParsedProps = attributes;

  const questApiKey = localStorage?.getItem('apiKey') ?? loginJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? loginJson?.globalConfig?.baseApiUrl;
  let isLoading = false;

  const updateTCStatus = () => {
    postCallAPI('tc-status', `${baseApiUrl}`, `${questApiKey}`, '', errorSuccessMap, 'put').then((response) => {
      isLoading = false;
      window.location.href = errorSuccessMap?.successPagePath ? `${errorSuccessMap.successPagePath}.html` : `/`;
    });
  };

  const handleFormSubmit = () => {
    isLoading = true;
    updateTCStatus();
  };
  return (
    <Formik
      initialValues={{ terms: false }}
      onSubmit={handleFormSubmit}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form>
            <FormSection sectionWidth="fullwidth">
              <AgreeTermsHeader>
                <HeadingWithDivider>{termsTitle}</HeadingWithDivider>
              </AgreeTermsHeader>
              <ScrollableGradientWrapper key={'terms'}>
                <TermsOfUseWrapper>
                  <RichText>{termsOfUse}</RichText>
                </TermsOfUseWrapper>
              </ScrollableGradientWrapper>
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
