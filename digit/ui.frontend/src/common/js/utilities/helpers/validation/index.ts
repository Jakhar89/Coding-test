import { find } from 'lodash';

import { AEMErrorMap } from '@/types/global/aem-definition';

/* Validates input is numeric only */
export const digitsOnly = (value) => /^\d+$/.test(value);

/* Validates AU format mobile number with following requirements:
    - start with '04'
    - exactly 10 numerics only
*/
export const validAusMobilePhoneFormat = (value) => /^04[\d]{8}$/.test(value);

// TODO - placeholder - to integrate with AEM BE
export const errorSuccessValues = {
  autoLogoutPagePath: '/content/sscp/showcase/toyota/auto-logout',
  errorPagePath: '/content/sscp/showcase/toyota/500',
  lockedPagePath: '/content/sscp/showcase/toyota/locked-account',
  loginPagePath: '/content/sscp/showcase/toyota/login',
  successPagePath: '/content/sscp/showcase/toyota/accounts',
  errorMap: [
    {
      errorCode: 'E01',
      errorMessage:
        'The email entered is either already registered for the portal, or we are having difficulties registering you, please contact our Customer Service team on <BRAND PH NUMBER> or <BRAND EMAIL>.',
    },
    {
      errorCode: 'E02',
      errorMessage: 'Customer is not currently eligible for SSCP',
    },
    {
      errorCode: 'E03',
      errorMessage: 'Email is not unique or does not exist within Brand in QUEST',
    },
    {
      errorCode: 'E04',
      errorMessage: 'Customer does not have a mobile number',
    },
    {
      errorCode: 'E05',
      errorMessage: 'Other API failures (Timeout etc.)',
    },
    {
      errorCode: 'E06',
      errorMessage: 'Please ensure you have entered a valid email address.',
    },
    {
      errorCode: 'E07',
      errorMessage:
        'Either the Email and Password entered were not correct, or you have not yet registered for an account. Please try again or contact our Customer Service team on <BRAND PH NUMBER> or <BRAND EMAIL> if the issue persists.',
    },
    {
      errorCode: 'E08',
      errorMessage:
        'Either the Email and Password entered were not correct. Please try again or contact our Customer Service team on <BRAND PH NUMBER> or <BRAND EMAIL> if the issue persists.',
    },
    {
      errorCode: 'E09',
      errorMessage: 'Login attempt when account is ‘Internal Lock’ locked',
    },
    {
      errorCode: 'E10',
      errorMessage:
        "The one time password entered was not correct, please re-enter carefully otherwise, press 'Re-send' to get a new one time password.",
    },
    {
      errorCode: 'E11',
      errorMessage:
        'Your Work email cannot be the same as your Personal email. Please enter your email as either Personal or Work.',
    },
    {
      errorCode: 'E12',
      errorMessage:
        'The Login email entered is already in use for portal. Login emails cannot be shared across customers. Please select or nominate another email to be used as your Login Email.',
    },
    {
      errorCode: 'E13',
      errorMessage:
        'Sorry, we are having difficulties updating your details. Please try again or if the issue persists, contact our Customer Service team on <BRAND PH NUMBER> or <BRAND EMAIL>.',
    },
    {
      errorCode: 'E14',
      errorMessage: 'Please ensure you have entered a valid phone number.',
    },
    {
      errorCode: 'E15',
      errorMessage:
        'Sorry, we are having difficulties. Please try again or if the issue persists, contact our Customer Service team on <BRAND PH NUMBER> or <BRAND EMAIL>.',
    },
    {
      errorCode: 'E16',
      errorMessage: 'Customer ID (CifNbr) is not an INDIVIDUAL Customer in QUEST',
    },
    {
      errorCode: 'E17',
      errorMessage: 'QUEST is unavailable (Technical errors)',
    },
    {
      errorCode: 'E18',
      errorMessage:
        'Your account has been temporarily locked. You can unlock your account by resetting your password, otherwise please contact our Customer Service team on <BRAND PH NUMBER> or <BRAND EMAIL> if you continue to experience issues.',
    },
    {
      errorCode: 'E19',
      errorMessage: 'QUEST - Generic data does not match validation requirements',
    },
    {
      errorCode: 'E20',
      errorMessage:
        'A Mobile number is required for Authentication purposes. Please ensure a valid Mobile number is entered in the Mobile field above.',
    },
    {
      errorCode: 'E21',
      errorMessage: 'A valid Phone number is required to be set as your Preferred contact number.',
    },
    {
      errorCode: 'E22',
      errorMessage: 'A valid Personal or Work email is required to be set as your Preferred contact email.',
    },
    {
      errorCode: 'E23',
      errorMessage:
        "A valid Login email is required. Please either select 'Set as my login email' beneath Personal or Work email, or nominate a separate Login email.",
    },
    {
      errorCode: 'E24',
      errorMessage: 'A valid Personal or Work email is required.',
    },
    {
      errorCode: 'E25',
      errorMessage: 'Marketing or Communications Preferences do not exist',
    },
    {
      errorCode: 'E27',
      errorMessage: 'Please enter all required password fields.',
    },
    {
      errorCode: 'E28',
      errorMessage:
        'The Old Password entered was not correct, Please re-enter and try again. The Old Password is your current password, which you are updating.',
    },
    {
      errorCode: 'E29',
      errorMessage: 'Your Password cannot be the same as one of your previous 5 passwords.',
    },
    {
      errorCode: 'E110',
      errorMessage: 'Session has timed out',
    },
  ],
};

export const validationMessage = (label: string): string => `Please enter ${label}.`;

/**
 * returns error code from config array
 * @param code
 * @param errorMap
 * @returns
 */
export const getAEMErrorMessageByCode = (code: string, errorMap: AEMErrorMap): string => {
  const fallbackUnknownError = 'Unknown validation error occurred.';

  /**If errorMap passed is empty then use Global Error JSON */
  errorMap =
    Array.isArray(errorMap) && errorMap.length > 0
      ? errorMap
      : globalThis.errorJson
      ? JSON.parse(globalThis.errorJson).errorMap
      : errorSuccessValues.errorMap;

  if (!code || !errorMap) {
    console.warn(`Missing code or errorMap`);
    return fallbackUnknownError;
  }

  // hard-coding timeout option so doesn't need configuring in AEM by CMS author
  if (code === 'E110') {
    return 'Your session has timed-out. Please try again.';
  }

  const errorMessage = find(errorMap, { errorCode: code })?.errorMessage;
  if (errorMessage) {
    return errorMessage;
  }

  console.warn(`Unknown error code ${code}`);
  return fallbackUnknownError;
};

export const questApiErrorMessage =
  'Sorry, we’re having difficulties updating all of your details. Please try again or if the issue persists, contact our Customer Service team.';
