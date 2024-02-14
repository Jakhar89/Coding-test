import React from 'react';

import Logo from '@/components/Header/Logo';

import Icon from '@/utility/components/Icon';
import Grid from '@/utility/components/Grid';

import ActionButton from '@/utility/components/FormElement/ActionButton';
import ContactUsRichText from '@/utility/components/FormElement/ContactUsRichText';

import { emitTrackEvent, getFormattedPageName, handleAnalyticsClick } from '@/utility/helpers/analytics';

import { useBreakpoint } from '@/utility/hooks/useBreakpoint';

import { PageNotificationProps, PageNotificationParsedProps } from './definitions';
import {
  ButtonWrapper,
  ContentWrapper,
  Description,
  GridGap,
  IconWrapper,
  LogoContainer,
  PageNotificationContainer,
  Title,
} from './StyledPageNotification';

const PageNotification = ({
  attributes,
  children,
  handleOnClick,
  removeMarginTopSpacing,
  site,
  isLoading,
}: PageNotificationProps) => {
  if (attributes === '{}') {
    return null;
  }

  const pageNotificationJson: PageNotificationParsedProps = JSON.parse(attributes);
  const bp = useBreakpoint();
  const isMobileDescription: boolean = ['xs', 'sm', 'md'].includes(bp);
  const isDesktopDescription: boolean = ['lg', 'xl'].includes(bp);
  const isBothDescriptionConfigured: boolean = !!(
    pageNotificationJson?.description && pageNotificationJson?.mobileDescription
  );

  return (
    <PageNotificationContainer
      isMaintainencePage={pageNotificationJson?.isMaintainencePage}
      removeMarginTopSpacing={removeMarginTopSpacing}
    >
      <GridGap config={{ col: { md: 2 } }}></GridGap>
      <Grid.Item config={{ col: { md: 8 } }}>
        {pageNotificationJson?.isMaintainencePage && (
          <LogoContainer>
            <Logo site={site} />
          </LogoContainer>
        )}
        <ContentWrapper>
          <IconWrapper>
            <Icon
              aria-label="presentation"
              name={pageNotificationJson.icon}
            />
          </IconWrapper>
          {pageNotificationJson.title && <Title>{pageNotificationJson.title}</Title>}
          {pageNotificationJson.description && (isDesktopDescription || !isBothDescriptionConfigured) && (
            <Description>
              <ContactUsRichText>{pageNotificationJson.description}</ContactUsRichText>
            </Description>
          )}
          {pageNotificationJson.mobileDescription && isBothDescriptionConfigured && isMobileDescription && (
            <Description>{pageNotificationJson.mobileDescription}</Description>
          )}
          {!!children && children}
          {pageNotificationJson.buttonText && (
            <ButtonWrapper>
              <ActionButton
                label={pageNotificationJson.buttonText}
                isLoading={isLoading}
                handleOnClick={() => {
                  if (pageNotificationJson?.analyticsTrackEventName) {
                    emitTrackEvent({ name: pageNotificationJson?.analyticsTrackEventName });
                  }
                  if (handleOnClick) {
                    handleOnClick();
                  } else {
                    handleAnalyticsClick('keyLinkInteraction', {
                      keyLink: {
                        linkDestinationURL: pageNotificationJson?.buttonUrl,
                        linkOriginationPage: getFormattedPageName(),
                        linkPosition: pageNotificationJson.title,
                        linkTitle: pageNotificationJson.buttonText,
                      },
                    });
                    window.location.href = `${pageNotificationJson?.buttonUrl}.html`;
                  }
                }}
              />
            </ButtonWrapper>
          )}
        </ContentWrapper>
      </Grid.Item>
      <GridGap config={{ col: { md: 2 } }}></GridGap>
    </PageNotificationContainer>
  );
};

export default PageNotification;
