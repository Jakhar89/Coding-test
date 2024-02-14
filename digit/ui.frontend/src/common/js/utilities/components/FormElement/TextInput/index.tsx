import { useField } from 'formik';
import React from 'react';

import ErrorMessage from '../ErrorMessage';

import { TextInputProps } from './definitions';
import { TextArea, TextBoxInput } from './StyledTextInput';

const TextField: React.FC<TextInputProps> = ({ name, textArea, type = 'text', ...props }) => {
  const [, meta] = useField(name);
  const hasError = !!(name && meta?.error && (meta?.touched || meta?.initialTouched));

  return (
    <>
      {!textArea && (
        <TextBoxInput
          hasError={hasError}
          name={name}
          type={type}
          {...props}
        />
      )}
      {textArea && (
        <TextArea
          name={name}
          {...props}
        />
      )}
      {hasError && <ErrorMessage>{meta?.error}</ErrorMessage>}
    </>
  );
};

export default TextField;
