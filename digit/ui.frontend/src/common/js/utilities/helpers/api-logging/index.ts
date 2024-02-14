import axios from 'axios';

import { userStore } from '@/context/User/User';
import { getCorrelationId } from '@/utility/helpers/correlation-id';

import { Message } from '../../../components/RecentMessages/StyledRecentMessage';
import { apiNames } from '../api/definitions';

export const getUserIdfromToken = () => {
  const forgerockData = localStorage.getItem('forgerock-sdk-SSCP');
  const accessToken = forgerockData ? JSON.parse(forgerockData)?.accessToken?.split('.')?.[1] : '';
  const userId = accessToken ? JSON.parse(window.atob(accessToken) ?? 'null')?.userid : '';

  return userId;
};

/**
 * Gets error response headers to log in AEM
 */
export const aemErrorLogHeaders = (data, apiName: apiNames) => {
  const customerId =
    userStore?.getState()?.apiResponse?.contractsData?.contracts?.[0]?.customerDomain?.customer?.customerId;

  const errorHeaders = {
    'x-amzn-trace-id': data?.response?.headers?.['x-amzn-trace-id'] ?? '',
    'x-correlationid': getCorrelationId(),
    customerId: customerId ?? getUserIdfromToken(),
    'api-name': apiName,
    status: data?.response?.status ?? `Code:${data.code} - MSG: ${data.Message}`,
  };

  postAPIErrors(errorHeaders);
};

/**
 * Post the error response headers to AEM servlet
 */
export const postAPIErrors = (data) => {
  return axios
    .post('/api/sscp/apilogging', data)
    .then((response) => {
      if (response?.data) {
        return response;
      }
    })
    .catch((error) => {
      console.log('something went wrong', error);
    });
};
