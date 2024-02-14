import React, { useEffect, useState } from 'react';

import { userStore } from '@/context/User/User';
import { AEMProps } from '@/types/global/aem-definition';
import Base from '@/utility/components/ComponentBase/Base';
import { ANALYTICS_POSITION_INPAGE, getFormattedPageName, handleAnalyticsClick } from '@/utility/helpers/analytics';
import { getCallAPI, loginFlow, postCallAPI } from '@/utility/helpers/api';
import { API_LOGIN_INFO, API_PROFILE_DATA, SET_LOADING_OBJ } from '@/utility/helpers/constants';
import { isValidAccessToken } from '@/utility/helpers/forgerock';

import { MarketingContentProps } from './definitions';
import { MarketingContentContainer, MarketingContentImage, MarketingHyperLink } from './StyledMarketingContent';

const MarketingContent = ({ attributes, errorSuccessMap }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const { isAuthenticated, apiResponse, addToAPIResponse } = userStore();
  const { profileData } = apiResponse || {};

  const [isMarketing, setIsMarketing] = useState<boolean | undefined>();

  const marketingContentJson: MarketingContentProps = JSON.parse(attributes);

  const questApiKey = localStorage?.getItem('apiKey') ?? marketingContentJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? marketingContentJson?.globalConfig?.baseApiUrl;

  function getProfileDataFromApi() {
    addToAPIResponse(API_PROFILE_DATA, SET_LOADING_OBJ);
    return getCallAPI('customer-profile', `${baseApiUrl}`, `${questApiKey}`, errorSuccessMap).then((response) => {
      addToAPIResponse(API_PROFILE_DATA, response?.data);
    });
  }

  useEffect(() => {
    if (!isAuthenticated) {
      setIsMarketing(true);
      return;
    }

    if (isAuthenticated && isValidAccessToken() && !profileData) {
      getProfileDataFromApi();
    }
  }, []);

  useEffect(() => {
    if (!profileData || profileData?.loading) return;
    if (profileData?.customerDomain?.customerConsent?.customerMarketingPreference?.toLowerCase() === 'y') {
      setIsMarketing(true);
      return;
    }
    setIsMarketing(false);
  }, [profileData]);

  const isMarketingImageBlock = isMarketing && marketingContentJson?.imagePickerMarketing;

  return (
    <Base>
      <MarketingContentContainer data-testid="marketing-content-component">
        {isMarketingImageBlock && (
          <MarketingHyperLink
            href={marketingContentJson?.marketingImageUrl}
            onClick={() =>
              handleAnalyticsClick('keyLinkInteraction', {
                keyLink: {
                  linkOriginationPage: getFormattedPageName(),
                  linkPosition: ANALYTICS_POSITION_INPAGE,
                  linkTitle: 'Marketing Content',
                },
              })
            }
            target="_blank"
          >
            <MarketingContentImage
              src={marketingContentJson?.imagePickerMarketing}
              alt="Marketing Image"
            />
          </MarketingHyperLink>
        )}
        {!isMarketingImageBlock && (
          <MarketingContentImage
            src={marketingContentJson?.imagePickerLifestyle}
            alt="Lifestyle Image"
          />
        )}
      </MarketingContentContainer>
    </Base>
  );
};

export default MarketingContent;
