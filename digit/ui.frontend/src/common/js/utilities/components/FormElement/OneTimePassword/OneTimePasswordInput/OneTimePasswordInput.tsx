import { useField, useFormikContext } from 'formik';
import React from 'react';

import ErrorMessage from '@/utility/components/FormElement/ErrorMessage';

import { OneTimePasswordFormValues, OneTimePasswordInputProps, OTP_KEY, RESEND_VALUE } from '../definitions';

import { OneTimePasswordInputField } from './StyledOneTimePasswordInput';

const OneTimePasswordInput: React.FC<OneTimePasswordInputProps> = ({ oneTimeStringAttributeInputCallback }) => {
  const { setFieldValue } = useFormikContext<OneTimePasswordFormValues>();
  const handleChange = (newPassword: string) => {
    setFieldValue(OTP_KEY, newPassword);
    oneTimeStringAttributeInputCallback?.setInputValue(newPassword);
  };
  const [field, meta] = useField(OTP_KEY);
  const hasError = !!meta?.error && (meta?.touched || meta?.initialTouched);

  return (
    <>
      <OneTimePasswordInputField
        hasError={hasError}
        isInputNum={true}
        numInputs={6}
        onChange={handleChange}
        shouldAutoFocus={true}
        value={field?.value === RESEND_VALUE ? '' : field?.value}
      />
      {hasError && <ErrorMessage>{meta?.error}</ErrorMessage>}
    </>
  );
};

export default OneTimePasswordInput;
