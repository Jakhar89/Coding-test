import { Field, useField } from 'formik';
import React, { useState } from 'react';
import Select from 'react-select';

import ErrorMessage from '@/utility/components/FormElement/ErrorMessage';
import FormLabel from '@/utility/components/FormElement/Label';

import { SelectProps } from './definitions';
import { ReactSelectElement } from './StyledSelect';

const FormSelect = (props: SelectProps) => {
  const {
    name,
    label,
    placeholder,
    options,
    register,
    errors,
    control,
    validation,
    errorMessage = '',
    searchable,
    isDisabled = false,
    setFieldValue,
    value,
    isInFormik = true,
  } = props || {};

  const [, meta] = isInFormik ? useField(name) : [];
  const hasError = isInFormik ? !!(name && meta?.error && (meta?.touched || meta?.initialTouched)) : false;

  const error = errors ? errors[name] : null;

  return (
    <>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <div>
        <ReactSelectElement
          classNamePrefix="react-select"
          instanceId={name}
          aria-label={`Select input - Select an option - ${placeholder}`}
          placeholder={placeholder}
          options={options}
          isSearchable={searchable ? searchable : false}
          isDisabled={isDisabled ? true : false}
          value={value ? options?.find((c) => c.value === value) : null}
          onChange={(val: any) => {
            setFieldValue && setFieldValue(name, val?.value);
          }}
        />
        {hasError && <ErrorMessage>{meta?.error}</ErrorMessage>}
      </div>
    </>
  );
};

export default FormSelect;
