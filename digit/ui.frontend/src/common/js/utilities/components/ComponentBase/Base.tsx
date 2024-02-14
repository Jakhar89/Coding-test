import React, { Children } from 'react';

import { BaseProps } from './definitions';
import { GridContainer, GridRow } from './StyledBase';

type GridProps = {
  direction?: string;
};

const Base: React.FC<BaseProps & GridProps> = ({ children, direction, ...props }) => {
  return (
    <GridContainer>
      <GridRow direction={direction}>{children}</GridRow>
    </GridContainer>
  );
};

export default Base;
