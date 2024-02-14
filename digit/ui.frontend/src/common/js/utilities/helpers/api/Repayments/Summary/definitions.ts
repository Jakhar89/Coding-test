export type RepaymentSummary = {
  customerDomain: CustomerDomain;
};

interface CustomerDomain {
  financeAccount: FinanceAccount;
  paymentProcessing: PaymentProcessing;
  retailFinanceLoanItems: RetailFinanceLoanItem[];
  repaymentBilling: RepaymentBilling;
  addressDependentEntity: AddressDependentEntity;
  bankAccount: BankAccount;
}

interface BankAccount {
  bankAccountSequenceNumber: number;
  bsbNumber: string;
  bankAccountNumber: string;
}

interface AddressDependentEntity {
  addressSequenceNumber: number;
}

interface RepaymentBilling {
  repaymentBillingMode: string;
}

interface RetailFinanceLoanItem {
  scheduledAmount: number;
  scheduledItemDescription: string;
}

interface PaymentProcessing {
  paymentReceivedDate: string;
  paymentAppliedDate: string;
}

interface FinanceAccount {
  nextPaymentDate: string;
  nextPaymentType: string;
  scheduledPaymentDueDate: string;
  cycleDay: string;
  billedAmount: number;
  currentBalanceOutstanding: number;
  arrears: number;
  creditAmount: number;
  repaymentFrequency: string;
  balloonAmount: number;
}
