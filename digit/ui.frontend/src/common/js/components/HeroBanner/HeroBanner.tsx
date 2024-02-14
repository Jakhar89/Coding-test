import React, { useEffect, useRef } from 'react';

import { apiStore } from '@/context/API/Api';
import { userStore } from '@/context/User/User';
import { AEMProps } from '@/types/global/aem-definition';
import { GridRowContainer } from '@/utility/components/EditableSection/StyledEditableSection';
import RichText from '@/utility/components/RichText';
import { ANALYTICS_POSITION_INPAGE, getFormattedPageName, handleAnalyticsClick } from '@/utility/helpers/analytics';
import { getCallAPI, loginFlow } from '@/utility/helpers/api';
import { API_LOGIN_INFO, API_PROFILE_DATA, SET_LOADING_OBJ } from '@/utility/helpers/constants';
import { formatLoginTimeStamp } from '@/utility/helpers/dateTime';
import { dynamicContent } from '@/utility/helpers/string';

import { HeroBannerParsedProps } from './definitions';
//prettier-ignore
import {
    ContentWrapper,
    Description,
    GridContainer,
    GridRow,
    Heading,
    HeroBannerWrapper,
    ImageContainer,
    LastLoginContainer,
    LastLoginTime
} from './StyledHeroBanner';

const HeroBanner = ({ attributes, errorSuccessMap }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }
  const heroBannerJson: HeroBannerParsedProps = JSON.parse(attributes);
  const heroBannerRef = useRef<HTMLDivElement>(null);
  const errorMap = errorSuccessMap?.errorMap;

  const questApiKey = localStorage?.getItem('apiKey') ?? heroBannerJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? heroBannerJson?.globalConfig?.baseApiUrl;

  const { isAuthenticated, apiResponse, addToAPIResponse } = userStore();
  const { signature } = apiStore();
  const { loginInfo, profileData: profileDataApi } = apiResponse || {};

  const decodeGreetingsText = () => {
    if (profileDataApi?.customerDomain) {
      return heroBannerJson?.greetingText
        ? dynamicContent(
            heroBannerJson?.greetingText,
            profileDataApi?.customerDomain?.person?.givenName1
              ? profileDataApi?.customerDomain?.person?.givenName1
              : '',
          )
        : '';
    } else {
      return;
    }
  };

  // Get customer profile function
  function getProfileDataFromApi() {
    addToAPIResponse(API_PROFILE_DATA, SET_LOADING_OBJ);

    return getCallAPI('customer-profile', `${baseApiUrl}`, `${questApiKey}`, errorSuccessMap).then((response) => {
      addToAPIResponse(API_PROFILE_DATA, response?.data);
    });
  }

  useEffect(() => {
    if ((isAuthenticated && signature) || heroBannerJson?.isAuthenticatedMock) {
      if (!loginInfo && baseApiUrl && questApiKey) {
        addToAPIResponse(API_LOGIN_INFO, SET_LOADING_OBJ);
        loginFlow(baseApiUrl, questApiKey, errorSuccessMap, apiResponse, addToAPIResponse, true);
      }
    }
  }, [isAuthenticated, signature]);

  useEffect(() => {
    if (!loginInfo) return;
    if (!profileDataApi) {
      getProfileDataFromApi();
      return;
    }
  }, [loginInfo, profileDataApi]);

  useEffect(() => {
    const ref = heroBannerRef?.current;

    if (ref) {
      const linkElements = [...ref?.getElementsByTagName('a')];
      linkElements?.forEach((element) => {
        const { href, innerText } = element;
        element.onclick = () => {
          handleAnalyticsClick('keyLinkInteraction', {
            keyLink: {
              linkDestinationURL: href,
              linkOriginationPage: getFormattedPageName(),
              linkPosition: ANALYTICS_POSITION_INPAGE,
              linkTitle: innerText,
            },
          });
        };
      });
    }
  }, []);

  return (
    <HeroBannerWrapper
      data-testid="hero-banner-component"
      backgroundImageUrl={heroBannerJson?.isHalfWidthBanner ? null : heroBannerJson?.image}
      className={`${heroBannerJson?.isHalfWidthBanner ? 'is-half-width' : ''}`}
      isHalfWidthBanner={heroBannerJson?.isHalfWidthBanner}
    >
      <GridContainer>
        <GridRowContainer>
          <ContentWrapper config={{ col: { xs: 4, md: 7 } }}>
            {heroBannerJson?.isPersonalizedGreeting && <Heading>{decodeGreetingsText()}</Heading>}
            {!heroBannerJson?.isPersonalizedGreeting && heroBannerJson?.title && (
              <Heading>{heroBannerJson.title}</Heading>
            )}
            {heroBannerJson?.description && (
              <Description>
                <RichText>{heroBannerJson.description}</RichText>
              </Description>
            )}
            {heroBannerJson?.isLastLogin && (
              <LastLoginContainer>
                {heroBannerJson?.lastLoginText}
                <LastLoginTime>
                  {loginInfo?.last_login ? formatLoginTimeStamp(loginInfo?.last_login) : ''}
                </LastLoginTime>
              </LastLoginContainer>
            )}
          </ContentWrapper>
          {heroBannerJson?.isHalfWidthBanner && (
            <ImageContainer
              backgroundImageUrl={heroBannerJson?.image}
              config={{ col: { md: 6 } }}
            />
          )}
        </GridRowContainer>
      </GridContainer>
    </HeroBannerWrapper>
  );
};

export default HeroBanner;
