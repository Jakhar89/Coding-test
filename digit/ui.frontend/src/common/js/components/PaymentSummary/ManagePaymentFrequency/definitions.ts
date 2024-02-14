import { PaymentSummaryParsedProps } from '../definitions';

export type QuoteType = {
  customerDomain: CustomerDomain;
};

interface CustomerDomain {
  contract: Contract;
  inLifeQuote: InLifeQuote;
  financialTransactionAccount: FinancialTransactionAccount;
  financialDetailRetailFinance: FinancialDetailRetailFinance;
  customerInteractionCase: CustomerInteractionCase;
}

interface CustomerInteractionCase {
  caseID: string;
}

interface FinancialDetailRetailFinance {
  billedInArrearsOrInAdvance: string;
}

interface FinancialTransactionAccount {
  calculatedBalloonAmount: number;
}

interface InLifeQuote {
  proposedContractEndDate: string;
  proposedBalloonAmount: number;
  proposedInstalmentAmount: number;
  proposedInvoiceDueDate: string;
  proposedRepaymentFrequency: string;
  proposedAdminFee: number;
}

interface Contract {
  contractEndDate: string;
}

export type paramsInterface = {
  jsonData: PaymentSummaryParsedProps;
  paymentFrequencySubHeading: string;
  paymentFrequencyCancelButtonText: string;
  paymentFrequencySaveButtonText: string;
  managePFQuoteTitle: string;
  managePFNextDueDate: string;
  managePFRepaymentAmount: string;
  managePFLoanEndDate: string;
  managePFBalloonLabel: string;
  managePFBalloonAmountTooltip: string;
  managePFAdminFee: string;
  handleOnClickCancel: any;
  errorSuccessMap: any;
  selectedFrequency: any;
  attributes: any;
  setIsEditing: any;
  handleCloseEvent: any;
  getRepaymentsData: Function;
};
