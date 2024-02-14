import React from 'react';

import { AEMProps } from '@/types/global/aem-definition';
import ActionButton from '@/utility/components/FormElement/ActionButton';
import Icon from '@/utility/components/Icon';
import { ANALYTICS_POSITION_INPAGE, getFormattedPageName, handleAnalyticsClick } from '@/utility/helpers/analytics';

import { GetInTouchProps } from './definitions';
import {
  ButtonContainer,
  GetInTouchContainer,
  GetInTouchSummary,
  GetInTouchTitle,
  GridItemContainer,
  GridRowContainer,
  IconContainer,
  TextContainer,
} from './StyledGetInTouch';

const GetInTouch = ({ attributes }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const getInTouchJson: GetInTouchProps = JSON.parse(attributes);

  const handleOnClick = (title, path) => {
    handleAnalyticsClick('keyLinkInteraction', {
      keyLink: {
        linkDestinationURL: path,
        linkOriginationPage: getFormattedPageName(),
        linkPosition: ANALYTICS_POSITION_INPAGE,
        linkTitle: 'Dashboard Content CTA',
      },
    });
    window.location.href = `${path}.html`;
  };

  return (
    <GetInTouchContainer data-testid="get-in-touch-component">
      <GridRowContainer>
        <GridItemContainer>
          <IconContainer>{<Icon name={getInTouchJson?.iconName} />}</IconContainer>
          <TextContainer>
            <GetInTouchTitle>{getInTouchJson?.title}</GetInTouchTitle>
            <GetInTouchSummary>{getInTouchJson?.summary}</GetInTouchSummary>
          </TextContainer>
        </GridItemContainer>
        <GridItemContainer className="buttonAlign">
          <ButtonContainer>
            <ActionButton
              label={getInTouchJson?.buttonLabel}
              onClick={() => {
                handleOnClick(getInTouchJson?.title, getInTouchJson?.buttonPath);
              }}
            />
          </ButtonContainer>
        </GridItemContainer>
      </GridRowContainer>
    </GetInTouchContainer>
  );
};

export default GetInTouch;
