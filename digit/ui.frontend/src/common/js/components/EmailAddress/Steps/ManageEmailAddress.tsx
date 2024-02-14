import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';

import { analyticsStore } from '@/context/Analytics/Analytics';
import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';

import EditableSectionActions from '@/utility/components/EditableSection/EditableSectionActions';
import CallbackComponents from '@/utility/components/FormElement/Forgerock/CallbackComponents';
import TextOutput from '@/utility/components/FormElement/Forgerock/TextOutputCallback';
import {
  Field,
  HeadingWithDividerH3,
  SubHeading,
  SubHeadingText,
  SubTitle,
} from '@/utility/components/FormElement/StyledFormSection';
import Checkbox from '@/utility/components/FormElement/Checkbox';
import FormLabel from '@/utility/components/FormElement/Label';
import Radio from '@/utility/components/FormElement/Radio';
import TextInput from '@/utility/components/FormElement/TextInput';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';

import { handleClientValidationErrors } from '@/utility/helpers/analytics';
import { getAEMErrorMessageByCode, questApiErrorMessage } from '@/utility/helpers/validation';

import { ManageEmailAddressProps } from '../definitions';

const ManageEmailAddress: React.FC<ManageEmailAddressProps> = ({
  cancelButtonText,
  emailAddressEditTitle,
  errorComponent,
  errorMap,
  handleFormSubmit,
  handleOnClickCancel,
  initialValues,
  introductoryText,
  loginEmailText,
  loginLabelText,
  nextStep,
  personalLabelText,
  preferredContactDescription,
  preferredContactTitle,
  hasQuestApiError,
  saveButtonText,
  site,
  step,
  workLabelText,
  isLoading,
}) => {
  const { journeyFlow, modalTitle } = analyticsStore();
  const { errorMessage, setErrorMessage } = errorMessageStore();

  const validationSchema = Yup.object().shape(
    {
      personalEmail: Yup.string()
        .email(getAEMErrorMessageByCode('E06', errorMap))
        .notOneOf([Yup.ref('workEmail'), null], getAEMErrorMessageByCode('E11', errorMap))
        .when('workEmail', {
          is: (workEmail) => !workEmail || workEmail.length === 0,
          then: Yup.string().required(getAEMErrorMessageByCode('E24', errorMap)),
        }),
      workEmail: Yup.string()
        .email(getAEMErrorMessageByCode('E06', errorMap))
        .notOneOf([Yup.ref('personalEmail'), null], getAEMErrorMessageByCode('E11', errorMap))
        .when('personalEmail', {
          is: (personalEmail) => !personalEmail || personalEmail.length === 0,
          then: Yup.string().required(getAEMErrorMessageByCode('E24', errorMap)),
        }),
      mail: Yup.string()
        .email(getAEMErrorMessageByCode('E06', errorMap))
        .required(getAEMErrorMessageByCode('E23', errorMap)),
      preferredContactEmail: Yup.string()
        .required(getAEMErrorMessageByCode('E22', errorMap))
        .oneOf(['work', 'personal']),
    },
    [['personalEmail', 'workEmail']],
  );

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={validationSchema}
        validateOnBlur={true}
        validateOnChange={true}
        validateOnMount={false}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          isSubmitting,
          isValid,
          resetForm,
          setFieldTouched,
          setFieldValue,
          touched,
          values,
        }) => {
          const isLoginEmailTheSameValueAsPersonal = values?.personalEmail === values?.mail;
          const isLoginEmailTheSameValueAsWork = values?.workEmail === values?.mail;
          // Resetting the default initial values for preferredContactEmail to be empty so that it won't pass the validation check
          useEffect(() => {
            if (!values?.personalEmail) {
              // Resetting the initial preferred contact email to ensure it will not pass the validation if user has not set the preferred contact
              if (values?.preferredContactEmail.toLowerCase() === 'personal') {
                setFieldValue('preferredContactEmail', '');
              }
              if (values?.usePersonalEmailAsLogin === true) {
                // Reset the checkbox to be false when there's no value
                setFieldValue('usePersonalEmailAsLogin', false);
                setFieldValue('mail', '');
              }
            }

            // keep login email in sync with personal email
            if (values?.personalEmail && values?.usePersonalEmailAsLogin === true) {
              setFieldValue('mail', values?.personalEmail);
            }

            // if user pasted the login value to personal email then set usePersonalEmailAsLogin to true
            if (isLoginEmailTheSameValueAsPersonal && values?.personalEmail) {
              setFieldValue('usePersonalEmailAsLogin', true);
            }
          }, [values?.personalEmail]);

          useEffect(() => {
            if (!values?.workEmail) {
              // Resetting the initial preferred contact email to ensure it will not pass the validation if user has not set the preferred contact
              if (values?.preferredContactEmail.toLowerCase() === 'work') {
                setFieldValue('preferredContactEmail', '');
              }
              if (values?.useWorkEmailAsLogin === true) {
                // Reset the checkbox to be false when value there's no value
                setFieldValue('useWorkEmailAsLogin', false);
                setFieldValue('mail', '');
              }
            }

            // keep login email in sync with work email
            if (values?.workEmail && values?.useWorkEmailAsLogin === true) {
              setFieldValue('mail', values?.workEmail);
            }

            //  if user pasted the login value to work email then set useWorkEmailAsLogin to true
            if (isLoginEmailTheSameValueAsWork && values?.workEmail) {
              setFieldValue('useWorkEmailAsLogin', true);
            }
          }, [values?.workEmail]);

          useEffect(() => {
            //  if user pasted the work value to login email then set useWorkEmailAsLogin to true
            if (isLoginEmailTheSameValueAsWork && values?.workEmail) {
              setFieldValue('useWorkEmailAsLogin', true);
            }
            //  if user pasted the personal value to login email then set usePersonalEmailAsLogin to true
            if (isLoginEmailTheSameValueAsPersonal && values?.personalEmail) {
              setFieldValue('usePersonalEmailAsLogin', true);
            }
          }, [values?.mail]);

          // set login email based on checkbox preference of work or email
          // clear login email if matches work or email
          useEffect(() => {
            if (values?.useWorkEmailAsLogin && values?.workEmail) {
              setFieldValue('mail', values?.workEmail);
            }
            if (values?.usePersonalEmailAsLogin && values?.personalEmail) {
              setFieldValue('mail', values?.personalEmail);
            }

            // if neither checkbox, but previously set to either personal or work, then clear
            if (
              (Object.keys(touched)?.includes('usePersonalEmailAsLogin') ||
                Object.keys(touched)?.includes('useWorkEmailAsLogin')) &&
              !values?.usePersonalEmailAsLogin &&
              !values?.useWorkEmailAsLogin &&
              !!(values?.mail === values?.personalEmail || values?.workEmail)
            ) {
              setFieldValue('mail', '');
              setFieldTouched('mail', true);
            }
          }, [values?.usePersonalEmailAsLogin, values?.useWorkEmailAsLogin]);

          const personalEmailAsLoginCheckbox = {
            isDisabled: !values?.personalEmail,
            isChecked: !!(values?.personalEmail === values?.mail && values?.usePersonalEmailAsLogin),
            label: loginEmailText,
            name: 'usePersonalEmailAsLogin',
            onBlur: handleBlur,
            onChange: () => {
              setFieldValue('usePersonalEmailAsLogin', !values?.usePersonalEmailAsLogin);
              setFieldValue('useWorkEmailAsLogin', false);
              setFieldTouched('usePersonalEmailAsLogin', true);
            },
          };

          const workEmailAsLoginCheckbox = {
            isDisabled: !values?.workEmail,
            isChecked: !!(values?.workEmail === values?.mail && values?.useWorkEmailAsLogin),
            label: loginEmailText,
            name: 'useWorkEmailAsLogin',
            onBlur: handleBlur,
            onChange: () => {
              setFieldValue('useWorkEmailAsLogin', !values?.useWorkEmailAsLogin && values?.workEmail);
              setFieldValue('usePersonalEmailAsLogin', false);
              setFieldTouched('usePersonalEmailAsLogin', true);
            },
          };

          const preferContactEmailRadio = {
            name: 'preferredContactEmail',
            items: [
              {
                htmlFor: 'personalEmail',
                id: 'personalEmail',
                isChecked: !!(values?.personalEmail && values?.preferredContactEmail?.toLowerCase() === 'personal'),
                isDisabled: !values?.personalEmail,
                label: personalLabelText,
                onBlur: handleBlur,
                onChange: (e) => {
                  setFieldValue('preferredContactEmail', 'personal');
                },
                value: 'personal',
              },
              {
                htmlFor: 'workEmail',
                id: 'workEmail',
                isChecked: !!(values?.workEmail && values?.preferredContactEmail?.toLowerCase() === 'work'),
                isDisabled: !values?.workEmail,
                label: workLabelText,
                onBlur: handleBlur,
                onChange: (e) => {
                  setFieldValue('preferredContactEmail', 'work');
                },
                value: 'work',
              },
            ],
          };

          return (
            <Form>
              <HeadingWithDividerH3>{emailAddressEditTitle}</HeadingWithDividerH3>
              <SubHeading>{introductoryText}</SubHeading>

              {/* Personal email  */}
              <Field>
                <FormLabel htmlFor={personalLabelText}>{personalLabelText}</FormLabel>
                <TextInput
                  hasError={!!errors?.personalEmail}
                  name="personalEmail"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values?.personalEmail}
                />
                <Checkbox
                  marginTopSize="micro4"
                  {...personalEmailAsLoginCheckbox}
                />
              </Field>

              {/* Work email  */}
              <Field>
                <FormLabel htmlFor={workLabelText}>{workLabelText}</FormLabel>
                <TextInput
                  hasError={!!errors?.workEmail}
                  name="workEmail"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values?.workEmail}
                />
                <Checkbox
                  marginTopSize="micro4"
                  {...workEmailAsLoginCheckbox}
                />
              </Field>

              {/* Login email */}
              <Field>
                <CallbackComponents
                  brand={site}
                  errorMap={errorMap}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  loginEmailLabel={loginLabelText}
                  nextStep={nextStep}
                  setFieldValue={setFieldValue}
                  shouldShowTextField={!values?.usePersonalEmailAsLogin && !values?.useWorkEmailAsLogin}
                  step={step}
                  values={values}
                />
              </Field>

              {/* Preferred contact email  */}
              <Field>
                <SubTitle>{preferredContactTitle}</SubTitle>
                <SubHeadingText>{preferredContactDescription}</SubHeadingText>
                <Radio {...preferContactEmailRadio} />
              </Field>

              {/* show timeout-type message */}
              {errorMessage && <InPageAnnouncement text={getAEMErrorMessageByCode(errorMessage, errorMap)} />}

              {/* PUT OR DELETE quest api error message  */}
              {hasQuestApiError && <InPageAnnouncement text={questApiErrorMessage} />}

              {/* show validation-type error message */}
              {errorComponent && (
                <TextOutput
                  errorComponent={errorComponent}
                  errorMap={errorMap}
                />
              )}

              <EditableSectionActions
                cancelLabel={cancelButtonText}
                saveLabel={saveButtonText}
                handleOnClickCancel={(e) => {
                  resetForm();
                  handleOnClickCancel(e);
                }}
                handleOnClickSave={() => {
                  handleClientValidationErrors({ errors, journeyFlow, modalTitle });
                  setErrorMessage(null);
                }}
                isLoading={isLoading}
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ManageEmailAddress;
