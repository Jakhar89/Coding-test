import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { userStore } from '@/context/User/User';
import { AEMProps } from '@/types/global/aem-definition';
import Base from '@/utility/components/ComponentBase/Base';
import Icon from '@/utility/components/Icon';
import {
  ANALYTICS_POSITION_CONTEXTUAL_CONTENT,
  getFormattedPageName,
  handleAnalyticsClick,
} from '@/utility/helpers/analytics';

import { LinkProps, QuickLinksProps } from './definitions';
import { GridItem, InnerWrapper, QuickLinksWrapper, Title, Wrapper } from './StyledQuickLinks';

const QuickLinks = ({ attributes, errorSuccessMap }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const quickLinksJson: QuickLinksProps = JSON.parse(attributes);
  const Theme = useContext(ThemeContext);

  const openRedirect = (e, title) => {
    const capturedEle: LinkProps = e.currentTarget.dataset;
    const linkTo = capturedEle.linkTo.includes('/content/') ? `${capturedEle.linkTo}.html` : `${capturedEle.linkTo}`;
    handleAnalyticsClick('keyLinkInteraction', {
      keyLink: {
        linkDestinationURL: linkTo,
        linkOriginationPage: getFormattedPageName(),
        linkPosition: ANALYTICS_POSITION_CONTEXTUAL_CONTENT,
        linkTitle: title,
      },
    });

    if (capturedEle?.newPage === 'true') {
      window.open(linkTo, '_blank')?.focus;
    } else {
      window.location.href = linkTo;
    }
  };

  return (
    <Base data-testid="quick-links-component">
      <QuickLinksWrapper>
        <InnerWrapper>
          {quickLinksJson.quickLinks.map((el, i) => (
            <GridItem
              key={i}
              config={{ col: { xs: 6, md: 3, xl: 2 }, gutters: { xs: 24 } }}
              onClick={(e) => openRedirect(e, el.title)}
              data-new-page={el.openInNewTab}
              data-link-to={el.linkPath}
            >
              <Wrapper>
                <Icon
                  name={el.icon}
                  isFunctional={false}
                  fill={Theme.colors.icon['light-2']}
                  ariaLabelledBy={el.icon}
                  width={50}
                  height={50}
                />
              </Wrapper>
              <Title>{el.title}</Title>
            </GridItem>
          ))}
        </InnerWrapper>
      </QuickLinksWrapper>
    </Base>
  );
};

export default QuickLinks;
