import { useField } from 'formik';
import React from 'react';

import ErrorMessage from '../ErrorMessage';
import { CheckboxProps } from './definitions';
import { CheckboxLabel } from './StyledCheckbox';

const Checkbox: React.FC<CheckboxProps> = ({
  isChecked,
  isDisabled,
  label,
  richTextLabel,
  marginTopSize,
  name,
  onChange,
  type = 'checkbox',
  value,
  alignItems,
}) => {
  const handleOnChange = (e: React.ChangeEvent<any>) => {
    onChange?.(e);
  };

  const [, meta] = useField(name);
  const hasError = !!meta?.error && (meta?.touched || meta?.initialTouched);

  return (
    <>
      {type === 'checkbox' && (
        <>
          <CheckboxLabel
            htmlFor={name}
            isDisabled={isDisabled}
            marginTopSize={marginTopSize}
            alignItems={alignItems}
          >
            <input
              checked={isChecked}
              className={`formik-field-checkbox`}
              disabled={isDisabled}
              id={name}
              name={name}
              onChange={handleOnChange}
              type="checkbox"
              value={value}
            />
            {richTextLabel ? richTextLabel : label}
          </CheckboxLabel>
          {hasError && <ErrorMessage>{meta?.error}</ErrorMessage>}
        </>
      )}
    </>
  );
};

export default Checkbox;
