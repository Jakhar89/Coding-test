import { apiNames } from '@/utility/helpers/api/definitions';

export const mockUrl = localStorage?.getItem('mockUrl') ? JSON.parse(localStorage?.getItem('mockUrl')) : '';

/**
 * If required to use mock apis
 * Add the Property name to localhost key 'mocks' from mockUrl
 * example key|value ==> mocks | ['login-info',contracts,repayment,'account-details']
 * @param apiName
 * @returns boolean
 */
export const checkMocks = (apiName: apiNames): boolean => {
  mockUrl && console.log(`Api Key: ${apiName}`);
  const mocks = (mockUrl && mockUrl[apiName]) ?? false;
  if (mocks) {
    console.log('Running Mock for', apiName);
    /**To update the API Mock URL
     * add Key | Value to localhost
     * example:  contracts | google.com
     */
    return mocks;
  }
  return false;
};
