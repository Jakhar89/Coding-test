import { ReactPropTypes } from 'react';

import { AccountDetails } from '@/utility/helpers/api/AccountDetailsData/definitions';
import { Contract, ContractsData } from '@/utility/helpers/api/AccountsDataContext/definitions';
import { BankAccountAPI } from '@/utility/helpers/api/bankAccountsData/definition';
import { Borrowers } from '@/utility/helpers/api/BorrowersData/definitions';
import { Correspondence } from '@/utility/helpers/api/Correspondence/definitions';
import { LoginInfo } from '@/utility/helpers/api/LoginInfoContext/definitions';
import { RepaymentSummary } from '@/utility/helpers/api/Repayments/Summary/definitions';
import { RestrictAccessData } from '@/utility/helpers/api/RestrictAccessData/definition';
import { TransactionsProps } from '@/utility/helpers/api/transactionsHistory/definitions';

import { VehicleData } from '../../utilities/helpers/api/VehicleDetails/definitions';

export type UserMetadata = {
  anonymousUser?: boolean;
  email?: string;
  family_name?: string;
  given_name?: string;
  name?: string;
  sub?: string;
};

type APIs = {
  accountsData?: AccountDetails;
  contractsData?: ContractsData;
  loginInfo?: LoginInfo;
  profileData?: any;
  repaymentData?: RepaymentSummary;
  vehicleData?: VehicleData;
  borrowersData?: Borrowers;
  paymentOptionsData?: any;
  billingScheduleApiData?: any;
  dashboardVehicleDetails?: any;
  tcStatusData?: any;
  bankAccountsData?: BankAccountAPI;
  correspondenceData?: Correspondence;
  transactionsHistoryData?: TransactionsProps;
  restrictData?: RestrictAccessData;
};

export type UserData = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isLoading: boolean) => void;
  isFetchingSplitToken?: boolean;
  setIsFetchingSplitToken: (isFetching: boolean) => void;
  setShouldShowAutomatedLogoutWarning: (shouldShowAutomatedLogoutWarning: boolean) => void;
  shouldShowAutomatedLogoutWarning?: boolean;
  apiResponse: APIs;
  addToAPIResponse: (apiKey: string, response: Object | null) => void;
  selectedContract: Contract | null;
  setSelectedContract: (contract: Contract | undefined) => void;

  dashboardRepaymentAPIData: Object;
  setDashboardRepaymentAPIData: (any, Object) => void;
  dashboardAccountDetailsAPIData: Object;
  setDashboardAccountDetailsAPIData: (any, Object) => void;
  dashboardVehicleDetailsAPIData: Object;
  setDashboardVehicleDetailsAPIData: (any, Object) => void;
  dashboardRecentTransactionsAPIData: Object;
  setDashboardRecentTransactionsAPIData: (any, Object) => void;
  dashboardPaidToDateAPIData: Object;
  setDashboardPaidToDateAPIData: (any, Object) => void;
};
