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
import { ForgotPasswordParsedProps } from '../definitions';
import { postCallAPI } from '@/utility/helpers/api';
import ModalOverlay from '@/utility/components/ModalOverlay';

const AgreeTermsOfUse: React.FC<TermsOfUseProps> = ({
  agreeTerms,
  agreeTermsTitle,
  termsOfUse,
  btnText,
  errorSuccessMap,
  termsTitle,
  attributes,
}) => {
  const forgotPasswordJson: ForgotPasswordParsedProps = attributes;
  const [shouldShowModal, setShouldShowModal] = useState(false);
  let isLoading = false;

  const questApiKey = localStorage?.getItem('apiKey') ?? forgotPasswordJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? forgotPasswordJson?.globalConfig?.baseApiUrl;

  const updateTCStatus = () => {
    postCallAPI('tc-status', `${baseApiUrl}`, `${questApiKey}`, '', errorSuccessMap, 'put').then((response) => {
      isLoading = false;
      setShouldShowModal(true);
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
            <FormSection sectionWidth="threeQuartersWidth">
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
                />
              </AcceptTermsOfUseWrapper>
            </FormSection>

            {/* THANK YOU OVERLAY MODAL WITH REDIRECT USER TO ACCOUNT PAGE*/}
            <ModalOverlay
              description={forgotPasswordJson?.communicationsConfig?.thankYouDescription ?? ''}
              heading={forgotPasswordJson?.communicationsConfig?.thankYouTitle}
              iconName={forgotPasswordJson?.communicationsConfig?.thankYouIcon}
              redirectURL={errorSuccessMap?.successPagePath}
              setShouldShowModal={setShouldShowModal}
              setTimer={forgotPasswordJson?.communicationsConfig?.thankYouOverlayTimer}
              shouldRedirectUserOnSuccessful={true}
              shouldShowModalOverlay={shouldShowModal}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default AgreeTermsOfUse;
