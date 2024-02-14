import React, { useEffect, useRef } from 'react';

import { AEMProps } from '@/types/global/aem-definition';
import { GridRowContainer } from '@/utility/components/EditableSection/StyledEditableSection';
import Icon from '@/utility/components/Icon';
import RichText from '@/utility/components/RichText';
import { ANALYTICS_POSITION_INPAGE, getFormattedPageName, handleAnalyticsClick } from '@/utility/helpers/analytics';

import { IconTextProps } from './definitions';
//prettier-ignore
import {
    ContentWrapper,
    GridContainer,
    GridRow,
    IconContainer,
    IconHR,
    IconTextWrapper
} from './StyledIconText';

const IconText = ({ attributes }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }
  const IconTextJson: IconTextProps = JSON.parse(attributes);

  return (
    <IconTextWrapper data-test={`icon-text`}>
      <GridContainer>
        <GridRow>
          {IconTextJson?.iconTextList.map((ele, index) => {
            return (
              <ContentWrapper
                config={{ col: { xs: 12, lg: 12 } }}
                key={index}
                data-test={`icon-text-content-${index}`}
              >
                <IconContainer>
                  <Icon
                    name={ele?.icon ?? ''}
                    isFunctional={false}
                    ariaLabelledBy={ele?.alt ?? ''}
                  />
                  <IconHR />
                </IconContainer>

                <RichText>{ele?.description ?? ''}</RichText>
              </ContentWrapper>
            );
          })}
        </GridRow>
      </GridContainer>
    </IconTextWrapper>
  );
};

export default IconText;
