import React from 'react';

import { acceptNumberInputOnly, ommitSpaceInput } from '@/utility/helpers/string';

import { Field } from '../StyledFormSection';
import FormLabel from '../Label';
import TextInput from '../TextInput';

import { PhoneInputProps } from './definitions';
import { DisclaimerText } from '../StyledFormElements';

const onFocusFunc = (
  e: React.FocusEvent<HTMLInputElement, Element>,
  fieldName: string,
  setFieldValue: (fieldName: string, value: string) => void,
) => {
  const value = ommitSpaceInput(e.target.value);
  setFieldValue(fieldName, value);
};

const onKeyUpFunc = (
  e: React.KeyboardEvent<HTMLInputElement>,
  fieldName: string,
  setFieldValue: (fieldName: string, value: string) => void,
) => {
  const target = e.target as HTMLInputElement;
  const value = acceptNumberInputOnly(target.value);
  setFieldValue(fieldName, value);
};

// @prettier-ignore
const PhoneInput: React.FC<PhoneInputProps> = ({
  disclaimerText,
  handleBlur,
  handleChange,
  label,
  name,
  optional = false,
  setFieldValue,
  values,
}) => {
  return (
    <Field>
      <FormLabel
        htmlFor={label}
        optional={optional}
      >
        {label}
      </FormLabel>
      <TextInput
        maxLength={11}
        name={name}
        type="text"
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={setFieldValue && ((e) => onFocusFunc(e, name, setFieldValue))}
        onKeyUp={setFieldValue && ((e) => onKeyUpFunc(e, name, setFieldValue))}
        value={values?.[name]}
      />
      {disclaimerText && <DisclaimerText>{disclaimerText}</DisclaimerText>}
    </Field>
  );
};

export default PhoneInput;
