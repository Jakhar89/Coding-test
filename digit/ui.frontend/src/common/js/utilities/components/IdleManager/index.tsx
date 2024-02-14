import * as forgeRock from '@forgerock/javascript-sdk';
import Cookies from 'js-cookie';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';

import { userStore } from '@/context/User/User';
import { isAuthorMode } from '@/utility/aem';
import { postCallAPI, SIGNATURE_COOKIE_NAME } from '@/utility/helpers/api';
import { clearCorrelationId } from '@/utility/helpers/correlation-id';
import { useBreakpoint } from '@/utility/hooks/useBreakpoint';

import {
  IdleManagerProps,
  IDLE_REDIRECT_DESKTOP_DEFAULT,
  IDLE_REDIRECT_MOBILE_TABLET_DEFAULT,
  IDLE_WARNING_DESKTOP_DEFAULT,
  IDLE_WARNING_MOBILE_TABLET_DEFAULT,
} from './definitions';
import { HeaderParsedProps } from '@/components/Header/definitions';

// prettier-ignore
const events = [
  'click',
  'keydown',
  'mousemove',
  'touchstart',
  'wheel',
];

const convertBpToMap = (bp) => (['xs', 'sm', 'md'].includes(bp) ? 'mobileTablet' : 'desktop');

const IdleManager: React.FC<IdleManagerProps> = ({
  autoLogoutUrl,
  idleRedirectDesktop = IDLE_REDIRECT_DESKTOP_DEFAULT,
  idleRedirectMobileTablet = IDLE_REDIRECT_MOBILE_TABLET_DEFAULT,
  idleWarningDesktop = IDLE_WARNING_DESKTOP_DEFAULT,
  idleWarningMobileTablet = IDLE_WARNING_MOBILE_TABLET_DEFAULT,
  attributes,
}) => {
  if (isAuthorMode()) return;

  const { isAuthenticated, setShouldShowAutomatedLogoutWarning } = userStore();
  const headerJson: HeaderParsedProps = attributes;

  let warningTimer;
  let logoutTimer;
  const bp = useBreakpoint();
  const [mediaSize, setMediaSize] = useState('');
  const [warningTimeoutPeriod, setWarningTimeoutPeriod] = useState(0);

  const config = {
    warning: {
      mobileTablet: idleWarningMobileTablet,
      desktop: idleWarningDesktop,
    },
    redirect: {
      mobileTablet: idleRedirectMobileTablet,
      desktop: idleRedirectDesktop,
    },
  };

  const handleLogoutTimer = () => {
    const timeoutPeriod = config?.redirect?.[mediaSize];
    if (timeoutPeriod) {
      logoutTimer = setTimeout(() => {
        // clears any pending timer.
        // Listener clean up. Removes the existing event listener from the window
        Object.values(events).forEach((item) => {
          window.removeEventListener(item, resetLogoutTimer);
        });
        // logs out user
        redirectToLoggedOutUrl();
      }, timeoutPeriod);
    }
  };

  const handleWarningTimer = () => {
    const timeoutPeriod = config?.warning?.[mediaSize];
    if (timeoutPeriod) {
      warningTimer = setTimeout(() => {
        setShouldShowAutomatedLogoutWarning(true);
        // clears any pending timer.
        // Listener clean up. Removes the existing event listener from the window
        Object.values(events).forEach((item) => {
          window.removeEventListener(item, resetWarningTimer);
        });
      }, timeoutPeriod);
    }
  };

  // this resets the timer if it exists.
  const resetWarningTimer = () => {
    if (warningTimer) {
      clearTimeout(warningTimer);
    }
  };
  // this resets the timer if it exists.
  const resetLogoutTimer = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  /**
   * Need to replace these local storage variables
   * Create a call to fetch vehicle details if GFV
   * */
  const questApiKey = localStorage?.getItem('apiKey') ?? headerJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? headerJson?.globalConfig?.baseApiUrl;

  const logoutUser = () => {
    const postData = {
      eventLabel: 'LOGOUT',
    };
    postCallAPI('logout', `${baseApiUrl}`, `${questApiKey}`, postData).then((response) => {});
  };

  const redirectToLoggedOutUrl = () => {
    console.log('redirecting to logout page', new Date());

    if (!window.location.href?.includes('logout')) {
      const logout = async () => {
        logoutUser();
        await forgeRock.FRUser.logout().then(() => {
          clearCorrelationId();
          Cookies.remove(SIGNATURE_COOKIE_NAME);
          window.location.href = `${autoLogoutUrl}.html`;
        });
      };
      logout();
    }
  };

  const listenerFn = debounce(() => {
    resetLogoutTimer();
    resetWarningTimer();
    handleLogoutTimer();
    handleWarningTimer();
  }, 100);

  // when breakpoint changes, it adds an event listeners to the window
  // each time any of the event is triggered, i.e on mouse move, click, scroll, keypress etc, the timer to logout user after redirectConfig of inactivity resets.
  useEffect(() => {
    // update mediaSize if transition from tablet > desktop or vice-versa
    if (mediaSize !== convertBpToMap(bp)) {
      setMediaSize(convertBpToMap(bp));
    }
  }, [bp]);

  useEffect(() => {
    setWarningTimeoutPeriod(config?.warning?.[mediaSize]);

    if (isAuthenticated) {
      resetLogoutTimer();
      resetWarningTimer();
      handleLogoutTimer();
      handleWarningTimer();

      Object.values(events).forEach((item) => {
        window.addEventListener(item, listenerFn);
      });
    }
  }, [mediaSize]);

  // using null render function to get access to useBreakpoint hook
  return null;
};

export default IdleManager;
