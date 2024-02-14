import React from 'react';

import { AEMProps } from '@/types/global/aem-definition';
import Base from '@/utility/components/ComponentBase/Base';
import ActionButton from '@/utility/components/FormElement/ActionButton';
import Icon from '@/utility/components/Icon';
import {
  ANALYTICS_POSITION_CONTEXTUAL_CONTENT,
  getFormattedPageName,
  handleAnalyticsClick,
} from '@/utility/helpers/analytics';

import { CTAwithAssetPickerProps } from './definitions';
import {
  ButtonContainer,
  CTAContainer,
  CtaImage,
  CtaImgContainer,
  CTASummary,
  CTATitle,
  TextContainer,
} from './StyledCTAwithAssetPicker';

const CTAwithAssetPicker = ({ attributes }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const ctawithAssetPickerJson: CTAwithAssetPickerProps = JSON.parse(attributes);

  const handleOnClick = (title, path) => {
    handleAnalyticsClick('keyLinkInteraction', {
      keyLink: {
        linkDestinationURL: `${path}.html`,
        linkOriginationPage: getFormattedPageName(),
        linkPosition: ANALYTICS_POSITION_CONTEXTUAL_CONTENT,
        linkTitle: title,
      },
    });
    window.location.href = `${path}.html`;
  };

  return (
    <CTAContainer data-testid="cta-asset-picker-component">
      <Base direction="column">
        <TextContainer>
          <CTATitle config={{ col: { xs: 10, md: 12 }, gutters: 0 }}>{ctawithAssetPickerJson?.title}</CTATitle>
          <CTASummary config={{ col: { xs: 8, md: 7 }, gutters: 0 }}>{ctawithAssetPickerJson?.summary}</CTASummary>
        </TextContainer>
        <CtaImgContainer config={{ col: { xs: 12, md: 10 }, gutters: 0 }}>
          <CtaImage
            src={ctawithAssetPickerJson?.ctaImagePath}
            alt="Call to Action Image"
          />
        </CtaImgContainer>
        <ButtonContainer>
          <ActionButton
            icon="arrow-forward"
            label={ctawithAssetPickerJson?.buttonLabel}
            onClick={() => {
              handleOnClick(ctawithAssetPickerJson?.title, ctawithAssetPickerJson?.buttonPath);
            }}
          />
        </ButtonContainer>
      </Base>
    </CTAContainer>
  );
};

export default CTAwithAssetPicker;
