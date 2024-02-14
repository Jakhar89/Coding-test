import { Form, Formik, FormikErrors } from 'formik';
import { flow, pick } from 'lodash';
import React, { useMemo } from 'react';
import * as Yup from 'yup';

import { analyticsStore } from '@/context/Analytics/Analytics';
import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';
import EditableSectionActions from '@/utility/components/EditableSection/EditableSectionActions';
import CallbackComponents from '@/utility/components/FormElement/Forgerock/CallbackComponents';
import TextOutput from '@/utility/components/FormElement/Forgerock/TextOutputCallback';
import PhoneInput from '@/utility/components/FormElement/PhoneInput';
import Radio from '@/utility/components/FormElement/Radio';
import {
  Field,
  HeadingWithDividerH3,
  SubHeadingText,
  SubTitle,
} from '@/utility/components/FormElement/StyledFormSection';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';
import { handleClientValidationErrors } from '@/utility/helpers/analytics';
import {
  getAEMErrorMessageByCode,
  questApiErrorMessage,
  validAusMobilePhoneFormat,
} from '@/utility/helpers/validation';

import { EditModeProps, PhoneNumberFormValues } from '../definitions';

/*
  Function to manually set preferred method when only one contact number is provided
*/
const manuallySetPreferredContact = (
  errors: FormikErrors<Omit<PhoneNumberFormValues, 'errors' | 'setSubmitting'>>,
  values: PhoneNumberFormValues,
) => {
  const keys = ['telephoneNumber', 'home', 'work', 'other'];
  // pick subset from 'values' obj
  const subset = pick(values, keys);
  // filter subset to only those that have value
  const nonEmptyObj = flow([Object.entries, (arr) => arr.filter(([key, value]) => value), Object.fromEntries])(subset);

  // if only one contact number supplied, set preferred contact to match it
  if (Object.keys(nonEmptyObj)?.length === 1) {
    values.preferredContact = Object.keys(nonEmptyObj)[0];
  }
  /* if
     1. no contact numbers
     2. whatever is the preferred contact method is empty (ie. preferred contact method = 'home' but values.home empty)
     3. the preferred contact phone has error
     then clear preferred contact
   */
  //prettier-ignore
  if (
      Object.keys(nonEmptyObj)?.length === 0 || // 1
      !values[values.preferredContact] || // 2
      Object.keys(errors).includes(values.preferredContact) // 3
  ) {
    values.preferredContact = '';
  }
  return values;
};

const ManagePhoneNumber: React.FC<EditModeProps> = ({
  cancelButtonText,
  errorComponent,
  errorMap,
  handleFormSubmit,
  handleOnClickCancel,
  hasQuestApiError,
  homeLabelText,
  initialHomeNumber,
  initialMobileNumber,
  initialOtherNumber,
  initialPreferredContact,
  initialPreferredContactAsMobile,
  initialWorkNumber,
  mobileLabelText,
  nextStep,
  otherLabelText,
  phoneNumberEditTitle,
  preferredContactDescription,
  preferredContactTitle,
  saveButtonText,
  site,
  step,
  workLabelText,
  isLoading,
}) => {
  const { journeyFlow, modalTitle } = analyticsStore();
  const { errorMessage, setErrorMessage } = errorMessageStore();

  // validation with error config from AEM
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        home: Yup.string()
          .min(10, getAEMErrorMessageByCode('E14', errorMap))
          .max(10, getAEMErrorMessageByCode('E14', errorMap)),
        telephoneNumber: Yup.string()
          .required(getAEMErrorMessageByCode('E20', errorMap))
          .test('Valid AU mobile', getAEMErrorMessageByCode('E14', errorMap), validAusMobilePhoneFormat),
        other: Yup.string()
          .min(10, getAEMErrorMessageByCode('E14', errorMap))
          .max(10, getAEMErrorMessageByCode('E14', errorMap)),
        work: Yup.string()
          .min(10, getAEMErrorMessageByCode('E14', errorMap))
          .max(10, getAEMErrorMessageByCode('E14', errorMap)),
        preferredContact: Yup.string().required(getAEMErrorMessageByCode('E21', errorMap)),
      }),
    [],
  );

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        telephoneNumber: initialMobileNumber,
        home: initialHomeNumber,
        work: initialWorkNumber,
        other: initialOtherNumber,
        preferredContact: initialPreferredContact,
        'preferences/isPreferredPhone': initialPreferredContactAsMobile,
      }}
      onSubmit={handleFormSubmit}
      validateOnBlur={true}
      validateOnChange={true}
      validateOnMount={true}
      validationSchema={validationSchema}
    >
      {({ errors, handleBlur, handleChange, resetForm, setFieldValue, values }) => {
        // manually set preferred method when only one contact number is provided
        //@ts-ignore
        const modifiedValues = manuallySetPreferredContact(errors, values);
        const preferContactNumberRadio = {
          name: 'preferredContact',
          items: [
            {
              htmlFor: 'mobile',
              id: 'preferContactMobile',
              isChecked: modifiedValues?.preferredContact?.toLowerCase() === 'telephonenumber',
              label: mobileLabelText,
              isDisabled: !values?.telephoneNumber || Object?.keys(errors)?.includes('telephoneNumber'),
              onChange: (e) => {
                setFieldValue('preferredContact', 'telephoneNumber');
                setFieldValue('preferences/isPreferredPhone', true);
              },
              onBlur: handleBlur,
            },
            {
              htmlFor: 'home',
              id: 'preferContactHome',
              isChecked: modifiedValues?.preferredContact?.toLowerCase() === 'home',
              label: homeLabelText,
              isDisabled: !values?.home || Object?.keys(errors)?.includes('home'),
              onChange: (e) => {
                setFieldValue('preferredContact', 'home');
                setFieldValue('preferences/isPreferredPhone', false);
              },
              onBlur: handleBlur,
            },
            {
              htmlFor: 'work',
              id: 'preferContactWork',
              isChecked: modifiedValues?.preferredContact?.toLowerCase() === 'work',
              label: workLabelText,
              isDisabled: !values?.work || Object?.keys(errors)?.includes('work'),
              onChange: (e) => {
                setFieldValue('preferredContact', 'work');
                setFieldValue('preferences/isPreferredPhone', false);
              },
              onBlur: handleBlur,
            },
            {
              htmlFor: 'other',
              id: 'preferContactOther',
              isChecked: modifiedValues?.preferredContact?.toLowerCase() === 'other',
              label: otherLabelText,
              isDisabled: !values?.other || Object?.keys(errors)?.includes('other'),
              onChange: (e) => {
                setFieldValue('preferredContact', 'other');
                setFieldValue('preferences/isPreferredPhone', false);
              },
              onBlur: handleBlur,
            },
          ],
        };
        return (
          <Form>
            <HeadingWithDividerH3 marginBottomSize="micro2">{phoneNumberEditTitle}</HeadingWithDividerH3>
            {/* Mobile phone  */}
            <Field>
              <CallbackComponents
                brand={site}
                errorMap={errorMap}
                handleBlur={handleBlur}
                handleChange={handleChange}
                hiddenBooleanAttributeCallback={true}
                nextStep={nextStep}
                setFieldValue={setFieldValue}
                step={step}
                textInputDisclaimerText={'Used for Two-Factor Authentication'}
                values={values}
              />
            </Field>
            {/* Home phone  */}
            <PhoneInput
              label={homeLabelText}
              optional={true}
              name="home"
              handleBlur={handleBlur}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              values={values}
            />
            {/* Work phone  */}
            <PhoneInput
              label={workLabelText}
              optional={true}
              name="work"
              handleBlur={handleBlur}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              values={values}
            />
            {/* Other phone  */}
            <PhoneInput
              label={otherLabelText}
              optional={true}
              name="other"
              handleBlur={handleBlur}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              values={values}
            />
            {/* Preferred contact email  */}
            <SubTitle>{preferredContactTitle}</SubTitle>
            <SubHeadingText>{preferredContactDescription}</SubHeadingText>
            <Radio {...preferContactNumberRadio} />

            {/* show timeout-type message */}
            {errorMessage && <InPageAnnouncement text={getAEMErrorMessageByCode(errorMessage, errorMap)} />}

            {/* PUT OR DELETE quest api error message  */}
            {hasQuestApiError && <InPageAnnouncement text={questApiErrorMessage} />}

            {/* show error message */}
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
                setErrorMessage(null);
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
  );
};

export default ManagePhoneNumber;
