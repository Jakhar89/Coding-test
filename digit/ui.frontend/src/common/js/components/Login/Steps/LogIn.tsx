import { Form, Formik } from 'formik';
import React, { useCallback, useMemo } from 'react';
import * as Yup from 'yup';

import { analyticsStore } from '@/context/Analytics/Analytics';
import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';
import ActionButton from '@/utility/components/FormElement/ActionButton';
import ContactUsRichText from '@/utility/components/FormElement/ContactUsRichText';
import CallbackComponents from '@/utility/components/FormElement/Forgerock/CallbackComponents';
import TextOutput from '@/utility/components/FormElement/Forgerock/TextOutputCallback';
import { HeadingWithDivider, SubHeading } from '@/utility/components/FormElement/StyledFormSection';
import Grid from '@/utility/components/Grid';
import Icon from '@/utility/components/Icon';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';
import {
  emitTrackEvent,
  getFormattedPageName,
  handleAnalyticsClick,
  handleClientValidationErrors,
} from '@/utility/helpers/analytics';
import { getAEMErrorMessageByCode } from '@/utility/helpers/validation';

import { LogInProps } from '../definitions';
import {
  ButtonWrapper,
  ForgotPasswordLink,
  HeadingWithSlimDividerH5,
  IconContainer,
  RegisterButtonDesktop,
  RegisterButtonMobile,
  RegisterSectionDesktop,
  RegisterSectionMobile,
} from '../StyledLogin';

const LogIn: React.FC<LogInProps> = ({
  btnText,
  errorComponent,
  errorMap,
  forgotPasswordText,
  forgotPasswordUrl,
  handleFormSubmit,
  isLoading,
  registerButton,
  registerButtonUrl,
  registerIcon,
  registerTitle,
  nextStep,
  loginContact,
  loginDescription,
  loginTitle,
  site,
  step,
}) => {
  const { journeyFlow, modalTitle } = analyticsStore();
  const { errorMessage, setErrorMessage } = errorMessageStore();

  const inputValidation = useMemo(
    () =>
      Yup.object().shape({
        mail:
          //prettier-ignore
          Yup.string()
          .required(getAEMErrorMessageByCode('E06', errorMap))
          .email(getAEMErrorMessageByCode('E06', errorMap)),
        Password: Yup.string().required(getAEMErrorMessageByCode('E27', errorMap)),
        recaptcha:
          //prettier-ignore
          Yup.string()
          .nullable()
          .required('Please verify reCAPTCHA'),
      }),
    [],
  );

  const handleOnClick = ({ buttonText, buttonUrl }) => {
    handleAnalyticsClick('keyLinkInteraction', {
      keyLink: {
        linkDestinationURL: buttonUrl,
        linkOriginationPage: getFormattedPageName(),
        linkPosition: loginTitle,
        linkTitle: buttonText,
      },
    });
    window.location.href = `${buttonUrl}.html`;
  };

  return (
    <Grid.Row>
      <Grid.Item config={{ col: { md: 12, xl: 12 } }}>
        {loginTitle && <HeadingWithDivider marginBottomSize="micro4">{loginTitle}</HeadingWithDivider>}
        {loginDescription && <SubHeading>{loginDescription}</SubHeading>}

        {/* output the form elements from Foregrock API response */}
        <Formik
          initialValues={{ mail: '', recaptcha: '', Password: '' }}
          onSubmit={handleFormSubmit}
          validateOnBlur={true}
          validateOnChange={true}
          validateOnMount={false}
          validationSchema={inputValidation}
        >
          {({ errors, handleChange, setFieldValue, handleBlur, values }) => (
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
                values={values}
              />
              {forgotPasswordText && forgotPasswordUrl && (
                <ForgotPasswordLink
                  onClick={() => handleOnClick({ buttonText: forgotPasswordText, buttonUrl: forgotPasswordUrl })}
                >
                  {forgotPasswordText}
                </ForgotPasswordLink>
              )}
              <RegisterSectionMobile>
                {registerTitle && <SubHeading>{registerTitle}</SubHeading>}
                {registerButton && registerButtonUrl && (
                  <RegisterButtonMobile
                    onClick={() => handleOnClick({ buttonText: registerButton, buttonUrl: registerButtonUrl })}
                  >
                    {registerButton}
                  </RegisterButtonMobile>
                )}
              </RegisterSectionMobile>

              {/* show error message */}
              {errorComponent && (
                <TextOutput
                  errorComponent={errorComponent}
                  errorMap={errorMap}
                />
              )}

              {errorMessage && <InPageAnnouncement text={getAEMErrorMessageByCode(errorMessage, errorMap)} />}

              <ActionButton
                label={btnText}
                onClick={() => {
                  handleClientValidationErrors({ errors, journeyFlow, modalTitle });
                  emitTrackEvent({ name: 'loginCTA' });
                  setErrorMessage(null);
                }}
                type="submit"
                isLoading={isLoading}
              />
              {loginContact && <ContactUsRichText>{loginContact}</ContactUsRichText>}
            </Form>
          )}
        </Formik>
      </Grid.Item>
      <Grid.Item config={{ col: { xs: 0, md: 1 } }} />
      {/* <RegisterSectionDesktop config={{ col: { md: 4 } }}>
        {registerIcon && <IconContainer>{<Icon name={registerIcon} />}</IconContainer>}
        {registerTitle && <HeadingWithSlimDividerH5>{registerTitle}</HeadingWithSlimDividerH5>}
        {registerButton && registerButtonUrl && (
          <ButtonWrapper>
            <RegisterButtonDesktop
              onClick={() => handleOnClick({ buttonText: registerButton, buttonUrl: registerButtonUrl })}
            >
              {registerButton}
            </RegisterButtonDesktop>
          </ButtonWrapper>
        )}
      </RegisterSectionDesktop> */}
    </Grid.Row>
  );
};

export default LogIn;
