import React from 'react';

import { FormElementLabel, FormElementTitle } from './StyledLabel';

import { FormLabelProps } from './definitions';

const FormLabel: React.FC<FormLabelProps> = ({ children, ...props }) => {
  const optional = props?.optional;

  return (
    <FormElementLabel {...props}>
      <FormElementTitle optional={optional}>{children}</FormElementTitle>
    </FormElementLabel>
  );
};

export default FormLabel;
