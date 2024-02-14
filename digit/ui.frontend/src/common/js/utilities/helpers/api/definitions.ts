import { AEMErrorSuccessProps } from '@/types/global/aem-definition';

export type apiNames =
  | 'account-details'
  | 'account-statement'
  | 'account-statement'
  | 'bankAccounts'
  | 'billing-schedule'
  | 'borrowers'
  | 'change-payment-frequency'
  | 'contracts'
  | 'customer-profile'
  | 'editBankAccount'
  | 'login-info'
  | 'logout'
  | 'manage-due-date'
  | 'marketing-communications'
  | 'override-amount'
  | 'paid-to-date'
  | 'paid-to-date'
  | 'payment-method-update'
  | 'payment-options'
  | 'portal-gateway'
  | 'recent-messages'
  | 'recent-transactions'
  | 'repayment'
  | 'restrictAccess'
  | 'submit-payment-frequency'
  | 'tc-status'
  | 'transactions-history'
  | 'update-address'
  | 'update-customer'
  | 'vehicle-details'
  | 'account-statements';

export type callMethod = 'post' | 'put' | 'delete';

export type errorMap = AEMErrorSuccessProps | undefined;

export type getCallParams = {
  apiName: apiNames;
  baseUrl?: string;
  apiKey?: string;
  errorSuccessMap?: errorMap;
  addMethod?: any;
  configs?: any;
};
