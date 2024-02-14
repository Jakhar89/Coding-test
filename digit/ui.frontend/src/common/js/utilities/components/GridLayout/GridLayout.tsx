import React, { useEffect, useRef } from 'react';

import { AEMProps } from '@/types/global/aem-definition';
import Base from '@/utility/components/ComponentBase/Base';

//prettier-ignore
import {
    GridContainer,
    GridItem,
    GridRow,
    OriginalContainer,
    OriginalItem,
    OriginalRow,
    Wrapper
} from './StyledGridLayout';

const gridCol = (data, name) => {
  const comps: any = [];
  for (let i = 0; i < 12 / data; i++) {
    comps.push(`${name}.${i}`);
  }

  return comps;
};

const GridLayout = ({ attributes }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  return (
    <Wrapper>
      {/* prettier-ignore */}
      <GridContainer className="GridContainer">
        <GridRow className="GridRow">

          <GridItem
            className="GridItem"
            config={{ col: 12 }}
          >
            GridItem
          </GridItem>

          {gridCol(4, 'GridItem4').map((ele, i) => (
            <GridItem
              className="GridItem"
              config={{ col: { xs: 4, sm: 4, md: 4, lg: 4 }, gutters: 0 }}
              key={i}
            >
              {ele}
            </GridItem>
          ))}
          
        </GridRow>
      </GridContainer>
      {/* --------------------------------------------------------- */}
      {/* Original Designed Grid
      <OriginalContainer>

        <OriginalRow>
          <OriginalItem config={{ col: 12 }}>ORiginal Item</OriginalItem>

          {gridCol(4, 'GridItem4').map((ele, i) => (
            <OriginalItem
              config={{ col: { xs: 4, md: 4, lg: 4 } }}
              key={i}
            >
              ORiginal Item
            </OriginalItem>
          ))}
        </OriginalRow>

      </OriginalContainer> */}
      {/* --------------------------------------------------------- */}
      With Base
      {/* prettier-ignore */}
      <Base>

        <GridItem
          className="GridItem"
          config={{ col: 12 }}
        >
          GridItem
        </GridItem>

        {gridCol(6, 'GridItem6').map((ele, i) => (
          <GridItem
            className="GridItem"
            config={{ col: { xs: 12, sm: 6, md: 6, lg: 6 }, gutters: 0 }}
            key={i}
          >
            {ele}
          </GridItem>
        ))}

        {gridCol(4, 'GridItem4').map((ele, i) => (
          <GridItem
            className="GridItem"
            config={{ col: { xs: 4, sm: 4, md: 4, lg: 4 }, gutters: 0 }}
            key={i}
          >
            {ele}
          </GridItem>
        ))}
        
        {gridCol(2, 'GridItem2').map((ele, i) => (
          <GridItem
            className="GridItem"
            config={{ col: { xs: 4, sm: 4, md: 2, lg: 2 }, gutters: 0}}
            key={i}
          >
            {ele}
          </GridItem>
        ))}

        {gridCol(4, 'GridItem4nested2').map((ele, i) => (
          <GridItem
            className="GridItem"
            config={{ col: { xs: 4, sm: 4, md: 4, lg: 4 }, gutters: 0 }}
            key={i}
          >
            <GridItem className="GridItem" config={{ col: { xs: 12, sm: 12, md: 6, lg: 6 }, gutters: 0 }}>{ele}</GridItem>
            <GridItem className="GridItem" config={{ col: { xs: 12, sm: 12, md: 6, lg: 6 }, gutters: 0 }}>{ele}</GridItem>
          </GridItem>
        ))}
        
      </Base>
    </Wrapper>
  );
};

export default GridLayout;
