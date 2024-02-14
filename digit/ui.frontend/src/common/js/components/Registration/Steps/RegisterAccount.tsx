import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useMemo } from 'react';

import { analyticsStore } from '@/context/Analytics/Analytics';
import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';

import ActionButton from '@/utility/components/FormElement/ActionButton';
import ContactUsRichText from '@/utility/components/FormElement/ContactUsRichText';
import CallbackComponents from '@/utility/components/FormElement/Forgerock/CallbackComponents';
import TextOutput from '@/utility/components/FormElement/Forgerock/TextOutputCallback';
import { HeadingWithDivider, SubHeading } from '@/utility/components/FormElement/StyledFormSection';

import Icon from '@/utility/components/Icon';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';

import {
  emitTrackEvent,
  getFormattedPageName,
  handleAnalyticsClick,
  handleClientValidationErrors,
} from '@/utility/helpers/analytics';
import { getAEMErrorMessageByCode } from '@/utility/helpers/validation';

import { RegisterAccountProps } from '../definitions';
import {
  ButtonWrapper,
  GridGap,
  HeadingWithSlimDividerH5,
  IconContainer,
  LoginButtonDesktop,
  LoginButtonMobile,
  LoginSectionDesktop,
  LoginSectionMobile,
  RegistrationSection,
  SectionWrapper,
} from '../StyledRegistration';

const RegisterAccount: React.FC<RegisterAccountProps> = ({
  btnText,
  errorComponent,
  errorMap,
  handleFormSubmit,
  isLoading,
  loginButton,
  loginButtonUrl,
  loginIcon,
  loginTitle,
  nextStep,
  registerContact,
  registerDescription,
  registerTitle,
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

  const handleLoginButtonOnClick = () => {
    handleAnalyticsClick('keyLinkInteraction', {
      keyLink: {
        linkDestinationURL: loginButtonUrl,
        linkOriginationPage: getFormattedPageName(),
        linkPosition: registerTitle,
        linkTitle: loginButton,
      },
    });
    window.location.href = `${loginButtonUrl}.html`;
  };

  return (
    <SectionWrapper>
      <RegistrationSection config={{ col: { md: 7, xl: 6 } }}>
        {registerTitle && <HeadingWithDivider marginBottomSize="micro4">{registerTitle}</HeadingWithDivider>}
        {registerDescription && <SubHeading>{registerDescription}</SubHeading>}

        {/* show error message */}
        {errorComponent && (
          <TextOutput
            errorComponent={errorComponent}
            errorMap={errorMap}
          />
        )}

        {/* output the form elements from Forgrock API response */}
        <Formik
          initialValues={{ mail: '', recaptcha: '' }}
          onSubmit={handleFormSubmit}
          validateOnBlur={true}
          validateOnChange={true}
          validateOnMount={false}
          validationSchema={emailValidation}
        >
          {({ errors, handleChange, setFieldValue }) => (
            <Form>
              <CallbackComponents
                brand={site}
                errorMap={errorMap}
                handleChange={handleChange}
                isLoading={isLoading}
                nextStep={nextStep}
                setFieldValue={setFieldValue}
                step={step}
              />
              <LoginSectionMobile>
                {loginTitle && <SubHeading>{loginTitle}</SubHeading>}
                {loginButton && loginButtonUrl && (
                  <LoginButtonMobile onClick={handleLoginButtonOnClick}>{loginButton}</LoginButtonMobile>
                )}
              </LoginSectionMobile>

              {errorMessage && <InPageAnnouncement text={getAEMErrorMessageByCode(errorMessage, errorMap)} />}

              <ActionButton
                label={btnText}
                onClick={() => {
                  handleClientValidationErrors({ errors, journeyFlow, modalTitle });
                  emitTrackEvent({ name: 'registerCTA' });
                  setErrorMessage(null);
                }}
                type="submit"
                isLoading={isLoading}
              />
              {registerContact && <ContactUsRichText>{registerContact}</ContactUsRichText>}
            </Form>
          )}
        </Formik>
      </RegistrationSection>
      <GridGap config={{ col: { xs: 0, md: 1 } }} />
      <LoginSectionDesktop config={{ col: { md: 4 } }}>
        {loginIcon && <IconContainer>{<Icon name={loginIcon} />}</IconContainer>}
        {loginTitle && <HeadingWithSlimDividerH5>{loginTitle}</HeadingWithSlimDividerH5>}
        {loginButton && loginButtonUrl && (
          <ButtonWrapper>
            <LoginButtonDesktop onClick={handleLoginButtonOnClick}>{loginButton}</LoginButtonDesktop>
          </ButtonWrapper>
        )}
      </LoginSectionDesktop>
    </SectionWrapper>
  );
};

export default RegisterAccount;
