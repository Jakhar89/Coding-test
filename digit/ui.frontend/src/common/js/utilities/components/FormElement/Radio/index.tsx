import { Field, useField } from 'formik';
import React from 'react';

import ErrorMessage from '../ErrorMessage';
import { RadioListProps } from './definitions';
import { RadioContainer, RadioLabel } from './StyledRadio';

// prettier-ignore
const IndividualRadio = ({
  children,
  htmlFor,
  isChecked,
  isDisabled,
  name,
  onChange,
  state,
  id,
  value,
  verticalAlign,
  isFullWidth
}) => {
  const handleOnChange = (e: React.ChangeEvent<any>) => {
    onChange?.(e);
  };

  return (
    <RadioLabel
      className={state}
      disabled={isDisabled}
      htmlFor={htmlFor ?? value}
      verticalAlign={verticalAlign}
      isFullWidth={isFullWidth}
    >
      <Field
        checked={isChecked}
        className={`formik-field-radio`}
        disabled={isDisabled}
        id={id ? id: htmlFor ?? value}
        name={name}
        onChange={handleOnChange}
        type="radio"
        value={value}
      />
      {children}
    </RadioLabel>
  );
};

// prettier-ignore
const Radio: React.FC<RadioListProps> = ({
  items,
  name,
  verticalAlign = true,
  gridChilds,
  isFullWidth
}) => {

  const [,meta] = useField(name);
  const hasError = !!meta?.error && (meta?.touched || meta?.initialTouched);

  return (
    <>
      <RadioContainer
        hasError={hasError}
        verticalAlign={verticalAlign}
        gridChilds={gridChilds}
      >
        {items?.map((item, index) => {
          const isMultiple = (items?.length ?? 0) > 1 ? 'is-multiple' : '';
          const label = item?.label;
          const isDisabled = item?.isDisabled;
          const isChecked = item?.isChecked;
          const onChange = item?.onChange;
          const htmlFor = item?.htmlFor;
          const value = item?.value ?? label;
          const id = item?.id;

          return (
            <IndividualRadio
              htmlFor={htmlFor}
              isChecked={isChecked}
              isDisabled={isDisabled}
              key={index}
              name={name}
              id={id}
              onChange={onChange}
              state={isMultiple}
              value={value}
              verticalAlign={verticalAlign}
              isFullWidth={isFullWidth}
            >
              {label}
            </IndividualRadio>
          );
        })}
      </RadioContainer>
      {hasError && <ErrorMessage>{meta?.error}</ErrorMessage>}
    </>
  );
};

export default Radio;
