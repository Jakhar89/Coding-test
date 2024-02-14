import { userStore } from '@/context/User/User';
import { API_RESTRICT_DATA } from '@/utility/helpers/constants';

import { postCallAPI } from '../api';

/**Need to change
 * Read from header exposed list
 *
 * For Storybook
 *  restrictedPages | {"restrictUrlList":["repayment"]}
 */
//const restrictPages = globalThis?.restrictPgList;
export const restrictPages = globalThis?.restrictedPages
  ? JSON.parse(globalThis?.restrictedPages)
  : localStorage?.getItem('restrictedPages')
  ? JSON.parse(localStorage?.getItem('restrictedPages'))
  : '';

export const restrictAPI = (questApiKey, baseApiUrl, contractId) => {
  const restrictApiData = userStore.getState().apiResponse.restrictData;
  if (!restrictApiData || !restrictApiData[contractId]) {
    const postData = {
      customerDomain: {
        contract: {
          contractId,
        },
      },
    };

    postCallAPI('restrictAccess', `${baseApiUrl}`, `${questApiKey}`, postData).then((res) => {
      const storeObject = {
        [API_RESTRICT_DATA]: {
          [contractId]: res?.data,
        },
      };
      userStore.setState((prevState) => ({
        apiResponse: { ...prevState?.apiResponse, ...storeObject },
      }));
    });
  } else {
    return;
  }
};

export const isRestricted = (pgName) => {
  return restrictPages?.restrictUrlList && restrictPages?.restrictUrlList.find((element) => element === pgName);
};
