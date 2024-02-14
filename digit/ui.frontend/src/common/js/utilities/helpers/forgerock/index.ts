import { sortBy } from 'lodash';

import { GlobalConfigProps } from '@/types/global/aem-definition';
import { CallbackType, Config } from '@forgerock/javascript-sdk';

import { JourneyType } from './definitions';

const HIDDEN_HEADER_NAME = 'Hidden-Value-Collector';
const HIDDEN_VALUE_CALLBACK_TYPE = 'HiddenValueCallback';
const STRING_ATTRIBUTE_CALLBACK_TYPE = 'StringAttributeInputCallback';

// Forgerock Journey tree type
export const SSP_EMPTY_TREE: JourneyType = '';
export const SSP_CHANGE_EMAIL_TREE: JourneyType = 'SSP-ChangeEmail';
export const SSP_CHANGE_PASSWORD_TREE: JourneyType = 'SSP-ChangePassword';
export const SSP_CHANGE_PHONE_NUMBER_TREE: JourneyType = 'SSP-ChangePhone';
export const SSP_LOGIN_TREE: JourneyType = 'SSP-Login';
export const SSP_RECOVER_LOCKED_ACCOUNT_TREE: JourneyType = 'SSP-Recover-Locked-Account';
export const SSP_REGISTRATION_TREE: JourneyType = 'SSP-Registration';
export const SSP_RESET_PASSWORD_TREE: JourneyType = 'SSP-ResetPassword';

// taken from https://tfal.atlassian.net/wiki/spaces/SSP/pages/2986868814/C1+SSP+Brand+Details
export const getFinancialNameFromBrandSlug = (slug: string): string => {
  const map = {
    toyota: 'toyota-finance',
    lexus: 'lexus-financial-services',
    hino: 'hino-financial-services',
    powertorque: 'powertorque-finance',
    mazda: 'mazda-finance',
    'power-alliance': 'power-alliance-finance',
    suzuki: 'suzuki-financial-services',
  };

  return map?.[slug] ?? map['toyota'];
};

export const checkAllInputsHidden = (callbacks, header) => {
  const isInitialHiddenStep = header === HIDDEN_HEADER_NAME;
  const hasOnlyHiddenInputs =
    callbacks.filter((callback) => callback.getType() === HIDDEN_VALUE_CALLBACK_TYPE)?.length > 0;

  return isInitialHiddenStep && hasOnlyHiddenInputs;
};

export const getFirstStringAttributeCallback = (callbacks) => {
  if (!callbacks) {
    return null;
  }
  const firstStringAttributeCallback = callbacks.find(
    (callback) => callback.getType() === STRING_ATTRIBUTE_CALLBACK_TYPE,
  );
  return firstStringAttributeCallback;
};

export const getFirstCallbackByType = (callbacks, type: CallbackType = CallbackType.TextOutputCallback) => {
  if (!callbacks) {
    return null;
  }
  return callbacks.find((callback) => callback?.type === type || callback?.payload?.type === type);
};

export const sortCallbacksByType = (callbacks, type: CallbackType = CallbackType.TextOutputCallback) =>
  sortBy(callbacks, (callback) => (callback?.type === type || callback?.payload?.type === type ? 1 : -1));

export const forgerockInitialConfig = (config: GlobalConfigProps, journeyType: JourneyType) => {
  let aemConfig = {};
  const defaults = {
    clientId: 'SSCP',
    redirectUri: 'http://localhost:4502/_callback',
    scope: 'openid profile email',
    serverConfig: {
      baseUrl: 'https://openam-tfs-anz-dev.id.forgerock.io/am',
      timeout: 30000,
    },
    realmPath: 'bravo',
    tree: journeyType,
  };

  if (window.location.origin.indexOf('4502') === -1) {
    const redirectUrl = `${window.location.protocol}//${window.location.hostname}/_callback`;
    aemConfig = {
      clientId: config?.forgerockClientId,
      redirectUri: redirectUrl,
      serverConfig: {
        baseUrl: config?.forgerockUrl,
        timeout: 30000,
      },
      realmPath: config?.forgerockRealm,
    };
  }

  const defaultsMergedWithAEMConfig = {
    ...defaults,
    ...aemConfig,
  };

  Config.set(defaultsMergedWithAEMConfig);
};

// TODO - temporary solution only
export const emailLookupTable = {
  'end_to_end_suzukiuser@yopmail.com': 'CUST-2006955',
  'end_to_end_testing@yopmail.com': 'CUST-2006950',
  'end_to_end_testing1@yopmail.com': 'CUST-2006951',
  'end_to_end_testing2@yopmail.com': 'CUST-2006953',
  'end_to_end_testing21@yopmail.com': 'CUST-2007182',
  'end_to_end_testing3@yopmail.com': 'CUST-2006954',
  'end_to_end_testing4@mailinator.com': 'CUST-2006955',
  'end_to_end_testing9@yopmail.com': 'CUST-2006976',
  'endtoendusertesting+1@gmail.com': 'CUST-2007258',
  'endtoendusertesting+2@gmail.com': 'CUST-2007271',
  'podigoucroutau-2903@yopmail.com': 'CUST-2006982',
  'sam.graham@merkle.com': 'CUST-2007188',
  'sit_user_testing_hino@yopmail.com': 'CUST-2007118',
  'sit_user_testing_lexus@yopmail.com': 'CUST-2007095',
  'sit_user_testing_mazda@yopmail.com': 'CUST-2007096',
  'sit_user_testing_PA@yopmail.com': 'CUST-2007117',
  'sit_user_testing_PT@yopmail.com': 'CUST-2007121',
  'sit_user_testing_suzuki@yopmail.com': 'CUST-2007116',
  'sit_user_testing@yopmail.com': 'CUST-2007004',
  'sit_user_testing2@yopmail.com': 'CUST-2007011',
  'sit_user_testing4@yopmail.com': 'CUST-2007188',
  'sscp_end_to_end_test_user@yopmail.com': 'CUST-2007402',
  'sscptest_dev_01@mailinator.com': 'CUST-2007242',
  'sscptest_stage_michelle@mailinator.com': 'CUST-2007240',
  'stgtestuser@yopmail.com': 'CUST-2007240',
  'end_to_end_lexususer@yopmail.com': 'CUST-2007251',
  'sit_user_testing1@yopmail.com': 'CUST-2007010',
  'endtoendusertesting+8@gmail.com': 'CUST-2007288',
  'end_to_end_mazdauser@yopmail.com': 'CUST-2007253',
  'end_to_end_ptuser@yopmail.com': 'CUST-2007254',
  'end_to_end_pauser@yopmail.com': 'CUST-2007255',
  'end_to_end_hinouser@yopmail.com': 'CUST-2007256',
  'end_to_end_testing9_update1@yopmail.com': 'CUST-2006976',
  'end_to_end_testing9_update2@yopmail.com': 'CUST-2006976',
  'end_to_end_testing9_update3@yopmail.com': 'CUST-2006976',
  'end_to_end_testing9_update4@yopmail.com': 'CUST-2006976',
  'end_to_end_testing9_update5@yopmail.com': 'CUST-2006976',
  'end_to_end_testing9_update6@yopmail.com': 'CUST-2006976',
  'end_to_end_testing9_update7@yopmail.com': 'CUST-2006976',
  'end_to_end_testing9_update8@yopmail.com': 'CUST-2006976',
  'end_to_end_testing9_update9@yopmail.com': 'CUST-2006976',
};

export const isValidAccessToken = () => {
  const tokenExpiry = JSON.parse(localStorage?.getItem('forgerock-sdk-SSCP') ?? 'null')?.tokenExpiry;
  return tokenExpiry ? new Date() < new Date(tokenExpiry) : false;
};
