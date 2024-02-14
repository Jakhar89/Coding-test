import { merge } from 'lodash';
import { useEffect } from 'react';

import { toSentenceCase } from '@/utility/helpers/string';

import { ClientValidationErrors, EventNameType, SectionType, TrackEventPayload, TrackEventProps } from './definitions';

// 1 min timeout (going by 60 FPS) - to make sure OneTrust has mounted Adobe Launch scripts.
const numAttemptsCheckLoaded = 3600;

export const ANALYTICS_POSITION_INPAGE = 'In Page';
export const ANALYTICS_POSITION_FAQ = 'FAQs';
export const ANALYTICS_NOT_APPLICABLE_URL = 'NA';
export const ANALYTICS_POSITION_ACTION_MENU = 'Action Menu';
export const ANALYTICS_POSITION_CONTEXTUAL_CONTENT = 'Contextual Content';

// Formatted page name
export const getFormattedPageName = () => {
  const pathName = window.location.pathname.replaceAll('/', ':');
  return pathName[0] === ':' ? pathName.substring(1) : pathName;
};

// polling fn to check Adobe _satellite available
export const checkSatelliteWithCallback = (callback, attempts = 0) => {
  if (window?._satellite?.track) {
    callback(callback);
  } else {
    requestAnimationFrame(() => {
      if (attempts < numAttemptsCheckLoaded) {
        // keep trying
        checkSatelliteWithCallback(callback, attempts + 1);
      } else {
        // give up
        return;
      }
    });
  }
};

/**
 * @param name: the node in object you wish to update
 * @param data: the data you wish to set
 * @return void;
 */
export const emitTrackEvent = ({ data, name }: TrackEventProps) => {
  if (!name) {
    return;
  }

  //prettier-ignore
  const dispatchEvent = (data, name) =>
    data
    ?
      updateDigitalData(data)
        .then(window._satellite.track(name))
    :
    window._satellite.track(name);

  // _satellite?.track fn available?
  if (window._satellite?.track) {
    dispatchEvent(data, name);
  }
  // poll for fn availability, then trigger
  else {
    console.warn(`emitTrackEvent: _satellite not available - could not emit: ${name}`);
    checkSatelliteWithCallback(() => dispatchEvent(data, name));
  }
};

/**
 * @param data: the data you wish to set
 */
async function updateDigitalData(data: TrackEventPayload) {
  if (!data) {
    return;
  }
  window.digitalData = merge(window.digitalData, data);
}

export const handleAnalyticsClick = (name: EventNameType, data: TrackEventPayload) => {
  if (name === 'updateClick') {
    // Clearing form interaction data layer when event type is updateClick
    // Introducing ts-ignore here to not overwrite the existing trackeventpayload definition
    emitTrackEvent({
      name: name,
      data: {
        // @ts-ignore
        cancelSection: '',
        // @ts-ignore
        mailingAddressInput: '',
        // @ts-ignore
        mailingAddressSameAsREsidential: '',
        // @ts-ignore
        marketingCommunicationsPreference: '',
        // @ts-ignore
        methodOfCorrespondenceSelected: '',
        modalTitle: '',
        // @ts-ignore
        preferredContactEmail: '',
        // @ts-ignore
        preferredContactNumber: '',
        residentialAddressInput: '',
        // @ts-ignore
        residentialAddressType: '',
        // @ts-ignore
        saveSection: '',
        setLoginEmail: '',
        // @ts-ignore
        updateSuccessSection: '',
        ...data,
      },
    });
  }

  if (name !== 'updateClick') {
    emitTrackEvent({
      name: name,
      data: {
        ...data,
      },
    });
  }
};

export const handleClientValidationErrors = ({ errors = {}, journeyFlow, modalTitle }: ClientValidationErrors) => {
  const formattedKeys = Object.keys(errors).join('|')?.toLocaleLowerCase() ?? '';

  if (formattedKeys?.length) {
    emitTrackEvent({
      name: 'error',
      data: {
        error: {
          errorDetails: `Client-side`,
          errorField: formattedKeys,
          errorFlow: journeyFlow,
          modalTitle: toSentenceCase(modalTitle) ?? '',
        },
      },
    });
  }
};

// Handle form interaction analytics click
export const dispatchFormInteractionAnalyticsClick = (currentStepNumber, modalTitle, sectionType: SectionType) => {
  useEffect(() => {
    // Only dispatch the analytics event when user has successfully got into the next step
    switch (currentStepNumber) {
      case 2:
        // Dispatch analytics for Manage email address OR Mange Phone Number OR Manage Password
        handleAnalyticsClick('saveChanges', { saveSection: sectionType, modalTitle: modalTitle[1] });
        break;
      case 3:
        // OTP Screen (SMS or Email)
        handleAnalyticsClick('continueUpdate', { continueSection: sectionType, modalTitle: modalTitle[2] });
        break;
      case 4:
        // OTP Screen (SMS or Email)
        handleAnalyticsClick('continueUpdate', { continueSection: sectionType, modalTitle: modalTitle[3] });
        break;
      default:
        break;
    }
  }, [currentStepNumber]);
};
