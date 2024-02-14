import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';

import { AEMProps } from '@/types/global/aem-definition';
import { clearAllBodyScrollLocks, disableBodyScroll } from '@/utility/helpers/bodyScrollLock';
import { getOnloadRequiredAPIsforPage } from '@/utility/helpers/html';
import { loadingStore } from '@/context/Loading/Loading';
import { userStore } from '@/context/User/User';
import { isAuthorMode } from '@/utility/aem';
import Icon from '@/utility/components/Icon';

import { LoadingOverlayParsedProps } from './definitions';
import {
  ContentWrapper,
  DISABLE_OVERLAY_BODY_SCROLL,
  Heading,
  IconWrapper,
  OverlayContainer,
  SHOW_LOADING_OVERLAY,
} from './StyledLoadingOverlay';

const LoadingOverlay = ({ attributes }: AEMProps) => {
  if (!attributes || attributes === '{}') {
    return null;
  }
  const { setLoading, isLoading, pageComponents, addToPageComponents } = loadingStore();
  const { apiResponse } = userStore();
  const [apisToLoad, setApisToLoad] = useState<string[] | null>();

  const loadingOverlayJson: LoadingOverlayParsedProps = JSON.parse(attributes);
  const loadingOverlayText = loadingOverlayJson?.loadingText;
  const ref = useRef();
  const section = ref?.current;

  const isFullLoadingPage = () => {
    let isLoadingPage = false;
    const fullLoadingPages = ['accounts.html', 'profile.html', 'repayments.html'];
    const currentPage = window.location.href.split('/').pop();
    fullLoadingPages.map((page) => {
      if (currentPage?.toLowerCase().indexOf(page) != -1) {
        isLoadingPage = true;
      }
    });
    return isLoadingPage;
  };

  // Generate a list of unique react components on the page
  useEffect(() => {
    if (!isFullLoadingPage()) return;

    const requiredOnLoadApis = getOnloadRequiredAPIsforPage();

    setApisToLoad(requiredOnLoadApis);
    // Author mode api error do not redirect to error page
    // This check will turn loading off after 3 seconds for authormode
    if (isAuthorMode()) {
      setTimeout(() => setLoading(false), 3000);
    }
  }, []);

  useEffect(() => {
    if (!apisToLoad?.length) return;

    let loadingComplete = true;

    // If no response for any of the apis, set loadingComplete to false
    apisToLoad.map((api) => {
      const responseData = apiResponse[api];

      if (!responseData || responseData?.loading) {
        loadingComplete = false;
      }
    });

    if (loadingComplete) {
      setLoading(false);
    }
  }, [apiResponse, apisToLoad]);

  useEffect(() => {
    if (isLoading) {
      if (!isFullLoadingPage()) {
        // currently mocking the api using timeout
        // TODO: Remove the timeout once forgerock is ready
        setTimeout(() => setLoading(false), 3000);
      }

      disableBodyScroll(section);
      document.body.classList.add(DISABLE_OVERLAY_BODY_SCROLL);
    } else {
      clearAllBodyScrollLocks();
      document.body.classList.remove(DISABLE_OVERLAY_BODY_SCROLL);
    }
  }, [isLoading]);

  return (
    <OverlayContainer
      ref={ref}
      className={isLoading ? SHOW_LOADING_OVERLAY : null}
    >
      <ContentWrapper className="content-wrapper">
        {isLoading && (
          <IconWrapper>
            <Icon
              aria-label="presentation"
              name="stopwatch"
            />
          </IconWrapper>
        )}
        {loadingOverlayText && <Heading>{loadingOverlayText}</Heading>}
      </ContentWrapper>
    </OverlayContainer>
  );
};

export default LoadingOverlay;
