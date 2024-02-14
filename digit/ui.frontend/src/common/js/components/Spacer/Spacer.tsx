import React from 'react';

import { AEMProps } from '@/types/global/aem-definition';

import { SpacerElement } from './StyledSpacer';
import { SpacerParsedProps } from './definitions';

const AnnualInterest = ({ attributes }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const spacerJson: SpacerParsedProps = JSON.parse(attributes);

  return (
    <SpacerElement
      desktopSpace={spacerJson?.desktopSpace}
      mobileSpace={spacerJson?.mobileSpace}
      tabletSpace={spacerJson?.tabletSpace}
    ></SpacerElement>
  );
};

export default AnnualInterest;
