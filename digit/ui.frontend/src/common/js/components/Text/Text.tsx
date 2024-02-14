import React from 'react';

import { AEMProps } from '@/types/global/aem-definition';
import RichText from '@/utility/components/RichText';

import { TextParsedProps } from './definitions';
import { TextContainer } from './StyledText';

const Text = ({ attributes }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const textJson: TextParsedProps = JSON.parse(attributes);

  return (
    <TextContainer>
      <RichText>{textJson.text}</RichText>
    </TextContainer>
  );
};

export default Text;
