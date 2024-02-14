import { Form, Formik, useField } from 'formik';
import React, { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';
import { AEMErrorMap, AEMProps } from '@/types/global/aem-definition';
import ActionButton from '@/utility/components/FormElement/ActionButton';
import ErrorMessage from '@/utility/components/FormElement/ErrorMessage';
import FormLabel from '@/utility/components/FormElement/Label';
import { Field } from '@/utility/components/FormElement/StyledFormSection';
import TextInput from '@/utility/components/FormElement/TextInput';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';
import { postCallAPI } from '@/utility/helpers/api';
import { forgerockInitialConfig, SSP_LOGIN_TREE } from '@/utility/helpers/forgerock';
import { getAEMErrorMessageByCode } from '@/utility/helpers/validation';
import useForgeRockJourney from '@/utility/hooks/useForgeRockJourney';

import { PortalGatewayComponentParsedProps } from './definitions';
import { portalGatewayComponentValidationSchema } from './portalGatewayComponentValidationSchema';
import { PortalGatewayContainer } from './StyledPortalGatewayComponent';

const ReCaptchaComponent = ({ name, sitekey, setFieldValue }) => {
  const [, meta] = useField(name);
  const hasError = !!(name && meta?.error && (meta?.touched || meta?.initialTouched));

  return (
    <>
      <ReCAPTCHA
        onChange={(value) => setFieldValue('recaptcha', value)}
        onExpired={() => setFieldValue('recaptcha', null)}
        sitekey={sitekey}
      />
      {hasError && <ErrorMessage>{meta?.error}</ErrorMessage>}
    </>
  );
};

const PortalGatewayComponent = ({ attributes, errorSuccessMap, site }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const [isApiLoading, setIsApiLoading] = useState(false);
  const [recaptchaSiteKey, setRecaptchaSiteKey] = useState('');

  const portalGatewayComponentJson: PortalGatewayComponentParsedProps = JSON.parse(attributes);
  const { globalConfig } = portalGatewayComponentJson;

  const questApiKey = localStorage?.getItem('apiKey') ?? portalGatewayComponentJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? portalGatewayComponentJson?.globalConfig?.baseApiUrl;

  const { errorMessage, setErrorMessage } = errorMessageStore();

  //Forgerock config setup
  useEffect(() => {
    //@ts-ignore
    forgerockInitialConfig(globalConfig, SSP_LOGIN_TREE);
  }, []);

  const { header, isLoading, nextStep, step = null } = useForgeRockJourney({ globalConfig, tree: SSP_LOGIN_TREE });

  const errorMap: AEMErrorMap = errorSuccessMap?.errorMap ?? [];

  useEffect(() => {
    if (isLoading || !step) {
      return;
    }
    if (header === 'Hidden-Value-Collector') {
      nextStep(step);
    }

    if (header === 'Log-In') {
      step?.callbacks?.map((callback) => {
        callback.payload.output.map((payloadItem) => {
          if (payloadItem.name === 'recaptchaSiteKey') {
            setRecaptchaSiteKey(payloadItem?.value);
          }
        });
      });
    }
  }, [step]);

  const handleFormSubmit = (values) => {
    const payload = {
      customerDomain: {
        financialDetailRetailFinance: {
          security: {
            vehicle: {
              vehicleRegistration: {
                vehicleRegistrationNumber: values?.vehicleRegoNumber,
              },
            },
          },
          customer: {
            surname: values?.surname,
          },
        },
      },
    };

    const addMethod = {
      setErrorCode: (errorCode) => {
        setIsApiLoading(false);
        setErrorMessage(errorCode);
      },
      redirect: false,
    };

    setIsApiLoading(true);
    postCallAPI(
      'portal-gateway',
      `${baseApiUrl}`,
      `${questApiKey}`,
      payload,
      errorSuccessMap,
      'post',
      addMethod,
      null,
      true,
    ).then((response) => {
      setIsApiLoading(false);
      const contractSource = response?.data?.customerDomain?.financialDetailRetailFinance?.contractSource;
      let redirectURL: string | undefined = '';
      if (contractSource === 'Alfa') {
        redirectURL = portalGatewayComponentJson?.myPortalAlfaUri;
      } else if (contractSource === 'LT') {
        redirectURL = portalGatewayComponentJson?.myPortalLtUri;
      }

      if (redirectURL) window.location.href = redirectURL;
    });
  };

  return (
    <PortalGatewayContainer
      config={{ col: { xs: 12, md: 6, lg: 6 } }}
      data-testid="portal-gateway-component-container"
    >
      <Formik
        enableReinitialize={true}
        initialValues={{
          vehicleRegoNumber: '',
          surname: '',
          recaptcha: '',
        }}
        onSubmit={(values) => {
          handleFormSubmit(values);
        }}
        validateOnBlur={true}
        validateOnChange={true}
        validateOnMount={true}
        validationSchema={portalGatewayComponentValidationSchema}
      >
        {({ errors, handleBlur, setFieldValue, handleChange, values }) => {
          return (
            <Form>
              <Field>
                <FormLabel htmlFor="vehicleRegoNumber">{portalGatewayComponentJson?.vehicleRegoNumberLabel}</FormLabel>
                <TextInput
                  name="vehicleRegoNumber"
                  type="text"
                  placeholder={portalGatewayComponentJson?.vehicleRegoNoPlaceholderText}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values?.['vehicleRegoNumber'].toUpperCase()}
                />
              </Field>

              <Field>
                <FormLabel htmlFor="surname">{portalGatewayComponentJson?.surnameLabel}</FormLabel>
                <TextInput
                  name="surname"
                  type="text"
                  placeholder={portalGatewayComponentJson?.surnamePlaceholderText}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values?.['surname']}
                />
              </Field>

              {recaptchaSiteKey && (
                <Field key={'recaptcha'}>
                  <ReCaptchaComponent
                    name="recaptcha"
                    setFieldValue={setFieldValue}
                    sitekey={recaptchaSiteKey}
                  />
                </Field>
              )}

              <ActionButton
                aria-label={portalGatewayComponentJson?.buttonLabel}
                isLoading={isApiLoading}
                onClick={(e) => {
                  console.log('errors', errors);
                }}
                type={'submit'}
                disabled={!!errors?.vehicleRegoNumber || !!errors?.surname}
                buttonType={'primary'}
                label={portalGatewayComponentJson?.buttonLabel}
              />
              {/* show timeout-type message */}
              {errorMessage && <InPageAnnouncement text={getAEMErrorMessageByCode(errorMessage, errorMap)} />}
            </Form>
          );
        }}
      </Formik>
    </PortalGatewayContainer>
  );
};

export default PortalGatewayComponent;
