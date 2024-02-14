import create from 'zustand';

import { Contract } from '@/utility/helpers/api/AccountsDataContext/definitions';
import { isRestricted, restrictAPI } from '@/utility/helpers/restrictAccess';

import { UserData } from './definitions';

export const userStore = create<UserData>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) =>
    set((state) => ({
      ...state,
      isAuthenticated,
    })),
  setShouldShowAutomatedLogoutWarning: (shouldShowAutomatedLogoutWarning: boolean) =>
    set((state) => ({
      ...state,
      shouldShowAutomatedLogoutWarning,
    })),
  shouldShowAutomatedLogoutWarning: false,
  setIsFetchingSplitToken: (isFetchingSplitToken: boolean | undefined) =>
    set((state) => ({
      ...state,
      isFetchingSplitToken,
    })),
  apiResponse: {},
  addToAPIResponse: (apiKey, response) =>
    set((state) => ({
      ...state,
      apiResponse: {
        ...state.apiResponse,
        [apiKey]: response,
      },
    })),
  selectedContract: null,
  setSelectedContract: (contract: Contract) => {
    /**
     * Check if page is restricted
     * Will be called on each Account Selector Update
     *
     * For Storybook
     * restricted | repayment
     */
    const pageName = digitalData?.page?.pageName
      ? digitalData?.page?.pageName
      : localStorage?.getItem('restricted')
      ? localStorage?.getItem('restricted')
      : '';

    const pgRestricted = isRestricted(pageName);

    if (pgRestricted) {
      /**
       * Get Configs for QuestAPI and BaseApiUrl
       */
      const getHeader = document.querySelector(`[component-name=Header]`);
      const getConfigs = getHeader && JSON.parse(getHeader?.dataset?.attribute);
      const questApiKey = getConfigs?.globalConfig?.questApiKey ?? localStorage?.getItem('apiKey');
      const baseApiUrl = getConfigs?.globalConfig?.baseApiUrl ?? localStorage?.getItem('baseApiUrl');

      restrictAPI(questApiKey, baseApiUrl, contract?.customerDomain.contract.contractId);
    }
    return set((state) => ({
      ...state,
      selectedContract: contract,
    }));
  },
  dashboardRepaymentAPIData: {},
  setDashboardRepaymentAPIData: (contractId, contractRepaymentAPIData: Object) =>
    set((state) => ({
      ...state,
      dashboardRepaymentAPIData: {
        ...state.dashboardRepaymentAPIData,
        [contractId]: contractRepaymentAPIData,
      },
    })),
  dashboardAccountDetailsAPIData: {},
  setDashboardAccountDetailsAPIData: (contractId, contractAccountDetailsAPIData: Object) =>
    set((state) => ({
      ...state,
      dashboardAccountDetailsAPIData: {
        ...state.dashboardAccountDetailsAPIData,
        [contractId]: contractAccountDetailsAPIData,
      },
    })),
  dashboardVehicleDetailsAPIData: {},
  setDashboardVehicleDetailsAPIData: (contractId, contractVehicleDetailsAPIData: Object) =>
    set((state) => ({
      ...state,
      dashboardVehicleDetailsAPIData: {
        ...state.dashboardVehicleDetailsAPIData,
        [contractId]: contractVehicleDetailsAPIData,
      },
    })),
  dashboardRecentTransactionsAPIData: {},
  setDashboardRecentTransactionsAPIData: (contractId, contractRecentTransactionsAPIData: Object) =>
    set((state) => ({
      ...state,
      dashboardRecentTransactionsAPIData: {
        ...state.dashboardRecentTransactionsAPIData,
        [contractId]: contractRecentTransactionsAPIData,
      },
    })),
  dashboardPaidToDateAPIData: {},
  setDashboardPaidToDateAPIData: (contractId, paidToDateAPIDate: Object) =>
    set((state) => ({
      ...state,
      dashboardPaidToDateAPIData: {
        ...state.dashboardPaidToDateAPIData,
        [contractId]: paidToDateAPIDate,
      },
    })),
}));
