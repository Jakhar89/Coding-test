import axios from 'axios';
import Cookies from 'js-cookie';

import { userStore } from '@/context/User/User';
import { isAuthorMode } from '@/utility/aem';
import { aemErrorLogHeaders } from '@/utility/helpers/api-logging';
import { apiNames, callMethod, errorMap, getCallParams } from '@/utility/helpers/api/definitions';
import { API_ACCOUNTS_DATA, API_LOGIN_INFO, SET_LOADING_OBJ } from '@/utility/helpers/constants';
import { getCorrelationId } from '@/utility/helpers/correlation-id';
import { apiErrorRedirect } from '@/utility/helpers/error-handling';
import * as mocks from '@/utility/helpers/mock';

import { Contract } from './AccountsDataContext/definitions';

export const API_KEY_HEADER = 'x-api-key';
export const CORRELATION_ID_HEADER = 'x-correlationId';
export const AUTHORIZATION_HEADER = 'authorization';
export const SIGNATURE_COOKIE_NAME = 'signature';

type Headers = {
  [API_KEY_HEADER]: string;
  [AUTHORIZATION_HEADER]?: string;
  [CORRELATION_ID_HEADER]: string;
};

export const getRequestHeaders = (apiKey): Headers => {
  return {
    [API_KEY_HEADER]: localStorage.getItem('apiKey') ?? apiKey ?? '',
    [AUTHORIZATION_HEADER]: `Bearer ${Cookies.get(SIGNATURE_COOKIE_NAME)}`,
    [CORRELATION_ID_HEADER]: getCorrelationId(),
  };
};

const blockApisForEnv = () => {
  return isAuthorMode() && !window?.location?.href?.toLowerCase().includes('localhost') ? true : false;
};

/**
 * Please make sure to add the new api names to the definitions
 * To make sure they are accepted by the get and post method
 */
const apiCallUrl = {
  'account-details': '/sscp/v1/contracts/summary',
  'account-statement': '/sscp/v1/finances/account-statement?doConsolidation=false',
  'billing-schedule': '/sscp/v1/finances/repayment-schedules',
  'change-payment-frequency': '/sscp/v1/payments/change-payment-frequency',
  'contact-us-complaints': '/sscp/v1/customers/contactus/complaints',
  'contact-us-enquiry': '/sscp/v1/customers/contactus/online-enquiry',
  'customer-profile': '/sscp/v1/customers?customerType=individual',
  'login-info': '/sscp/v1/customers/login-info',
  'manage-due-date': '/sscp/v1/payments/due-date/quote',
  'marketing-communications': '/sscp/v1/customers/preferences',
  'paid-to-date': '/sscp/v1/payments/transactions',
  'payment-method-update': '/sscp/v1/payments/update-payment-method',
  'payment-options': '/sscp/v1/payments/ways-to-pay',
  'portal-gateway': '/sscp/v1/public/portal-gateway',
  'recent-messages': '/sscp/v1/customers/correspondence',
  'submit-payment-frequency': '/sscp/v1/payments/submit-payment-frequency',
  'tc-status': '/sscp/v1/customers/tcstatus',
  'transactions-history': '/sscp/v1/finances/transaction-details',
  'update-address': '/sscp/v1/customers/address',
  'update-customer': '/sscp/v1/customers/contacts',
  'vehicle-details': '/sscp/v1/assets/details',
  bankAccounts: '/sscp/v1/bank-details',
  borrowers: '/sscp/v1/contracts/search', //post
  contracts: '/sscp/v1/contracts/search', //get
  logout: '/sscp/v1/events',
  repayment: '/sscp/v1/finances/summary',
  'override-amount': '/sscp/v1/finances/direct-debits/override-amount',
  restrictAccess: '/sscp/v1/customers/portal-access-rights',
  'account-statements': '', // TODO - Update once endpoint is ready
};

export const errorHandler = (error, apiName, errorSuccessMap) => {
  let errorSet = errorSuccessMap?.errorPagePath ? errorSuccessMap : JSON.parse(globalThis.errorJson);
  // If token is expired all api should fail
  // Redirect to login page in that case
  const tokenExpiry = JSON.parse(localStorage?.getItem('forgerock-sdk-SSCP') ?? 'null')?.tokenExpiry;
  const isInvalidToken = tokenExpiry ? new Date() > new Date(tokenExpiry) : true;
  // portal-gateway is public api hence does not require authentication
  const apiExceptions = ['portal-gateway', 'C1-Token', 'split'];
  if (!apiExceptions.includes(apiName)) {
    if (isInvalidToken && errorSet?.loginPagePath) {
      // Redirect user to login page if token expired
      window.location.href = `${errorSet?.loginPagePath}.html`;
      return;
    }
  }

  //API Logging
  aemErrorLogHeaders(error, apiName);
  //console.error(`error: ${apiName}: ${error}`);
  apiErrorRedirect(`${errorSet?.errorPagePath}.html`);
};

export const contractData = (contractID: string) => ({
  customerDomain: {
    contract: {
      contractId: contractID,
    },
  },
});

const { checkMocks, mockUrl } = mocks;

/**
 *
 * @param apiName | Name of the api as per apiCallUrl
 * @param baseUrl
 * @param apiKey
 * @param errorSuccessMap
 * @param addMethod | Add {} with custom methods to run
 * example: addMethod.error to run in catch block
 * @param configs | Any additional configs
 * @returns
 */
export const getCallAPI = (
  apiName: apiNames,
  baseUrl: string,
  apiKey: string,
  errorSuccessMap?: errorMap,
  addMethod?,
  configs?,
) => {
  if (blockApisForEnv()) return Promise.reject();

  const apiUrl = checkMocks && checkMocks(apiName) ? `${mockUrl[apiName]}` : `${baseUrl}${apiCallUrl?.[apiName]}`;
  const defaultConfig = checkMocks && checkMocks(apiName) ? {} : { headers: getRequestHeaders(apiKey) };

  const apiConfigs = configs
    ? { ...defaultConfig, ...configs, withCredentials: true }
    : { ...defaultConfig, withCredentials: true };

  return axios
    .get(apiUrl, apiConfigs)
    .then((response) => {
      if (response?.data) {
        return response;
      } else {
        throw apiName;
      }
    })
    .catch((error) => {
      if (addMethod?.error) {
        addMethod.error(error);
      }

      errorHandler(error, apiName, errorSuccessMap);
    });
};

/**
 *
 * @param apiName | Name of the api as per apiCallUrl
 * @param baseUrl
 * @param apiKey
 * @param data | {}
 * @param errorSuccessMap
 * @param method | Put or Post or Delete
 * @param addMethod | Add {} with custom methods to run
 * example: addMethod.error to run in catch block
 * @param configs | Any additional configs
 * @returns
 */
export const postCallAPI = (
  apiName: apiNames,
  baseUrl: string,
  apiKey: string,
  data,
  errorSuccessMap?: errorMap,
  method: callMethod = 'post',
  addMethod?,
  configs?,
  isPublicApi = false,
) => {
  if (blockApisForEnv()) return Promise.reject();
  const apiUrl = checkMocks && checkMocks(apiName) ? `${mockUrl[apiName]}` : `${baseUrl}${apiCallUrl?.[apiName]}`;
  const defaultConfig = checkMocks && checkMocks(apiName) ? {} : { headers: getRequestHeaders(apiKey) };

  if (isPublicApi && defaultConfig?.headers) {
    delete defaultConfig.headers[AUTHORIZATION_HEADER];
  }

  const apiConfigs = configs
    ? { ...defaultConfig, ...configs, withCredentials: true }
    : { ...defaultConfig, withCredentials: true };

  const axiosConfigs = { method: method, url: apiUrl, data: data, ...apiConfigs };

  return axios(axiosConfigs)
    .then((response) => {
      if (method === 'post' && response?.status !== 204 && !response?.data) {
        throw apiName;
      }
      return response;
    })
    .catch((error) => {
      const sourceErrorCode = error?.response?.data?.sourceErrorCode;

      if (addMethod?.setErrorCode) {
        addMethod.setErrorCode(sourceErrorCode);
      }

      const shouldErrorRedirect =
        addMethod?.redirect !== null ? addMethod?.redirect : sourceErrorCode?.toLowerCase()?.startsWith('e') ?? true;

      if (addMethod?.error && !shouldErrorRedirect) {
        addMethod.error(error);
      }

      if (shouldErrorRedirect) {
        errorHandler(error, apiName, errorSuccessMap);
      }
    });
};

const getContractsApi = (apiResponse, addToAPIResponse, baseApiUrl, questApiKey, errorSuccessMap) => {
  !apiResponse.contractsData &&
    getCallAPI('contracts', `${baseApiUrl}`, `${questApiKey}`, errorSuccessMap)?.then((response) => {
      const data = response?.data;
      if (data) {
        addToAPIResponse(API_ACCOUNTS_DATA, data);
      }
      if (!userStore.getState().selectedContract && data) {
        const firstContract: Contract = data?.contracts[0];
        userStore.getState().setSelectedContract(firstContract);
      }
    });
};

/**
 * LoginFlow includes
 * `getCallAPI` for 'login-info' and optional call to getContractsApi
 * @param baseApiUrl
 * @param questApiKey
 * @param errorSuccessMap
 * @param apiResponse
 * @param addToAPIResponse
 * @param contractsApi : true //Optional Call
 */
export const loginFlow = (
  baseApiUrl: string,
  questApiKey: string,
  errorSuccessMap,
  apiResponse,
  addToAPIResponse,
  contractsApi?: boolean,
) => {
  getCallAPI('login-info', baseApiUrl, questApiKey, errorSuccessMap)?.then((response) => {
    if (response) {
      addToAPIResponse(API_LOGIN_INFO, response?.data);
      getContractsApi(apiResponse, addToAPIResponse, baseApiUrl, questApiKey, errorSuccessMap);
    }
  });
};

/**
 *
 * @param apiName
 * @param baseUrl
 * @param apiKey
 * @param errorSuccessMap
 * @param addMethod
 * @param configs
 * @returns
 */
export const getCallAPI2 = ({ ...params }: getCallParams) => {
  if (blockApisForEnv()) return Promise.reject();

  const { apiName, baseUrl, apiKey, errorSuccessMap, addMethod, configs } = params;
  const apiUrl = checkMocks && checkMocks(apiName) ? `${mockUrl[apiName]}` : `${baseUrl}${apiCallUrl?.[apiName]}`;
  const defaultConfig = checkMocks && checkMocks(apiName) ? {} : { headers: getRequestHeaders(apiKey) };

  const apiConfigs = configs
    ? { ...defaultConfig, ...configs, withCredentials: true }
    : { ...defaultConfig, withCredentials: true };

  return axios
    .get(apiUrl, apiConfigs)
    .then((response) => {
      if (response?.data) {
        return response;
      } else {
        throw apiName;
      }
    })
    .catch((error) => {
      if (addMethod?.error) {
        addMethod.error(error);
      }

      errorHandler(error, apiName, errorSuccessMap);
    });
};
