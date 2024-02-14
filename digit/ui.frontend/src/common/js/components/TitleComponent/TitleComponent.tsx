import React from 'react';

import { AEMProps } from '@/types/global/aem-definition';
import { HeadingWithDivider } from '@/utility/components/FormElement/StyledFormSection';
import RichText from '@/utility/components/RichText';

import { TitleComponentProps } from './definitions';
import { Link, LinkWrapper, TitleComponentElement, TitleWrapper } from './StyledTitleComponent';

const TitleComponent = ({ attributes }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const titleComponentJson: TitleComponentProps = JSON.parse(attributes);
  const isWithLink = titleComponentJson?.titleText && titleComponentJson?.redirectionPath;

  return (
    <TitleComponentElement data-testid="title-component">
      {!isWithLink && (
        <HeadingWithDivider isSmallTitle={titleComponentJson?.isSmallTitle}>
          {titleComponentJson?.titleText}
        </HeadingWithDivider>
      )}
      {isWithLink && (
        <TitleWrapper>
          <HeadingWithDivider
            isSmallTitle={titleComponentJson?.isSmallTitle}
            hasLink={true}
          >
            {titleComponentJson?.titleText}
          </HeadingWithDivider>
          {isWithLink && (
            <LinkWrapper>
              <Link href={titleComponentJson?.redirectionPath}>{titleComponentJson?.linkTitle}</Link>
            </LinkWrapper>
          )}
        </TitleWrapper>
      )}
      {titleComponentJson?.description && <RichText>{titleComponentJson?.description}</RichText>}
    </TitleComponentElement>
  );
};

export default TitleComponent;
