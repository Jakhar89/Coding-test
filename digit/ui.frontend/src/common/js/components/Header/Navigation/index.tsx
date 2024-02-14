import Cookies from 'js-cookie';
import { filter, matches } from 'lodash';
import React, { useEffect } from 'react';

import { userStore } from '@/context/User/User';
import { isAuthorMode } from '@/utility/aem';
import Icon from '@/utility/components/Icon';
import { getFormattedPageName, handleAnalyticsClick } from '@/utility/helpers/analytics';
import { getCallAPI, postCallAPI, SIGNATURE_COOKIE_NAME } from '@/utility/helpers/api';
import { clearCorrelationId } from '@/utility/helpers/correlation-id';
import * as forgeRock from '@forgerock/javascript-sdk';

import ClosePanel from '../ClosePanel';
import Logo from '../Logo';
import { apiStore } from '@/context/API/Api';

import { IconButtonWrapper, Item, Label, Link, NavigationWrapper, NavItemWrapper } from './StyledNavigation';
import { HeaderParsedProps } from '../definitions';

// prettier-ignore
const Navigation = ({
  errorSuccessMap,
  isAuthorRunMode,
  isLoading,
  isLogoReversed,
  navigation,
  onClick,
  redirectUrl,
  shouldShowSidebarMenu,
  site,
  attributes
}) => {
  const { isAuthenticated } = userStore();
  const headerJson: HeaderParsedProps = attributes;
  const { apiResponse, addToAPIResponse} = userStore();
  const { tcStatusData } = apiResponse || {};
  const { signature } = apiStore();
  const getAuthenticatedItems = navigation.filter((item) => item.flag === 'true');
  const getUnauthenticatedItems = navigation.filter((item) => item.flag === 'false');

  const getTCStatus = () => {
    getCallAPI('tc-status', `${baseApiUrl}`, `${questApiKey}`, errorSuccessMap).then((response) => {
      if (response?.data) {
        addToAPIResponse('tcStatusData', response.data);
      }
    });
  };

  const isTCUpdated = tcStatusData?.customerDomain?.customerConsent?.customerPortalTermsAndConditionsStatus === 'Y' || window.sessionStorage.getItem('journey') === 'registration';

  const getFilteredItems = isAuthenticated && isTCUpdated ? getAuthenticatedItems : getUnauthenticatedItems;

  const populatedData = (item) => {
    const data = {
      keyLink: {
        linkDestinationURL: item?.url,
        linkOriginationPage: getFormattedPageName(),
        linkPosition: 'Header',
        linkTitle: item?.text,
      },
    };
    return data;
  };

  /**
   * Need to replace these local storage variables
   * Create a call to fetch vehicle details if GFV
   * */
  const questApiKey = localStorage?.getItem('apiKey') ?? headerJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? headerJson?.globalConfig?.baseApiUrl;

  const logoutUser = () => {
    const postData = {
      "eventLabel": "LOGOUT"
    };
    postCallAPI('logout', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((response) => {});
  };

  const logout = async () => {
    logoutUser();
    await forgeRock.FRUser.logout().then(() => {
      Cookies.remove(SIGNATURE_COOKIE_NAME);
      clearCorrelationId();
    });
  };

  const formattedUrl = (authorMode, item) => {
    return authorMode === 'true' ? item.url : item.url.substring(item.url.lastIndexOf("/"));
  }

  const handleOnClick = ({ isLogout, item }) => {
    const itemUrl = formattedUrl(isAuthorRunMode, item);
    if (isLogout) {
      handleAnalyticsClick('keyLinkInteraction', populatedData(item));
      logout()
        .then(() => window.location.href = `${itemUrl}.html`)
    }

    if (!isLogout) {
      handleAnalyticsClick('keyLinkInteraction', populatedData(item));
      window.location.href = `${itemUrl}.html`;
    }
  };

  const isErrorPage = () => {
    const currentPage = window.location.pathname.replace('.html', '').split('/').pop();
    return errorSuccessMap?.errorPagePath?.indexOf(currentPage) > -1 || currentPage == 'undefined';
  };

  useEffect(() => {
    const pathName = window.location.pathname.replace('.html', '');
    const isLogoutPage = pathName.toLowerCase().indexOf('logout') !== -1;

    if (signature && isLogoutPage) {
      logout();
    }

  }, [])

  useEffect(() => {
    const pathName = window.location.pathname.replace('.html', '');
    const isLogoutPage = pathName.toLowerCase().indexOf('logout') !== -1;

    if (signature && isLogoutPage) {
      logout();
    }

  }, [])

  useEffect(() => {
    if (isLoading) {
      return
    }
    //  if current page path does matches with filter authenticated item url
    getAuthenticatedItems.map(item => item.url = formattedUrl(isAuthorRunMode, item));
    const pathName = window.location.pathname.replace('.html', '');
    const doesCurrentPagePathMatchWithListedUrl = filter(
      getAuthenticatedItems,
      matches({ url: pathName }),
    );

    const isLogout = pathName.toLowerCase().indexOf('logout') !== -1

    const isUserOnAuthenticatedPage = !!(doesCurrentPagePathMatchWithListedUrl.length) && !isLogout;

    if (!isAuthorMode() && !isAuthenticated && isUserOnAuthenticatedPage && errorSuccessMap?.loginPagePath) {
      // Redirect unauthenticated user to login page
      window.location.href = `${errorSuccessMap?.loginPagePath}.html`;
    }
  }, [isAuthenticated, isLoading, isAuthorMode()]);

  useEffect(() => {
    if (isAuthenticated && signature && !isErrorPage()) {
      getTCStatus();
    }
  }, [isAuthenticated, signature]);

  return (
    <NavigationWrapper className={isLogoReversed ? 'darkTheme' : ''} shouldShowSidebarMenu={shouldShowSidebarMenu}>
      <ClosePanel
        shouldShowSidebarMenu={shouldShowSidebarMenu}
        onClick={onClick}
      />
      <NavItemWrapper shouldShowSidebarMenu={shouldShowSidebarMenu}>
        {shouldShowSidebarMenu && (
          <Logo
            isLogoReversed={isLogoReversed}
            redirectUrl={redirectUrl}
            shouldShowSidebarMenu={shouldShowSidebarMenu}
            site={site}
          />
        )}
        {getFilteredItems?.map((item, index) => {
          if (item?.hideInNav === 'true') return;
          
          let isLogout = false;
          if (item?.url.indexOf('logout') !== -1) {
            isLogout = true;
          }

          return (
            <Item key={index}>
              <Link
                onClick={() => handleOnClick({ isLogout, item })}
                tabIndex={0}
              >
                <Label>{item?.text}</Label>
              </Link>
              {item?.icon && (
                <IconButtonWrapper
                  onClick={() => handleOnClick({ isLogout, item })}
                  type="button"
                  aria-label={item?.text}
                >
                  <Icon
                    isFunctional={true}
                    name={item?.icon}
                    role="presentation"
                  />
                </IconButtonWrapper>
              )}
            </Item>
          );
        })}
      </NavItemWrapper>
    </NavigationWrapper>
  );
};

export default Navigation;
