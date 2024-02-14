import React from 'react';

import Grid from '@/utility/components/Grid';

import { FormSectionProps } from './definitions';
import { FormSectionWrapper } from './StyledFormSection';

const FormSection: React.FC<FormSectionProps> = ({ sectionWidth, spacingSize, children, ...props }) => {
  const config = {
    halfwidth: {
      xs: 4,
      md: 9,
      lg: 6,
    },
    threeQuartersWidth: {
      xs: 4,
      md: 9,
    },
    fullwidth: {
      xs: 4,
      md: 12,
    },
  };

  return (
    <FormSectionWrapper
      size={spacingSize}
      {...props}
    >
      <Grid.Item config={{ col: config[sectionWidth] }}>{children}</Grid.Item>
    </FormSectionWrapper>
  );
};

export default FormSection;
