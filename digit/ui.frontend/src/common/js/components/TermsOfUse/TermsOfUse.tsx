import React from 'react';

import { AEMProps } from '@/types/global/aem-definition';
import RichText from '@/utility/components/RichText';
import Grid from '@/utility/components/Grid';

import { TermsOfUseParsedProps } from './definitions';
import { AnchorLink, AnchorLinkItems, AnchorLinkItem, AnchorLinkTitle, RichTextContainer } from './StyledTermsOfUse';

const TermsOfUse = ({ attributes }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const termsOfUseJson: TermsOfUseParsedProps = JSON.parse(attributes);
  return (
    <Grid.Row>
      <Grid.Item config={{ col: { md: 9, lg: 9, xl: 9 } }}>
        <AnchorLinkTitle>{termsOfUseJson.termsOfUseTitle}</AnchorLinkTitle>
        <AnchorLinkItems>
          {termsOfUseJson?.itemList?.map((item, index) => {
            return (
              <AnchorLinkItem>
                <AnchorLink
                  href={`#${item.id}`}
                  key={index}
                >
                  {item.text}
                </AnchorLink>
              </AnchorLinkItem>
            );
          })}
        </AnchorLinkItems>
        <RichTextContainer>
          <RichText>{termsOfUseJson.termsOfUse}</RichText>
        </RichTextContainer>
      </Grid.Item>
    </Grid.Row>
  );
};

export default TermsOfUse;
