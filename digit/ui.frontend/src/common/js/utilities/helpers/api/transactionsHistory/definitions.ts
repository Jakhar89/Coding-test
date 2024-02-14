export type TransactionsProps = {
  customerDomain: CustomerDomain;
};

interface CustomerDomain {
  accountStatementLines: Transaction[];
  financialTransactionAccount: FinancialTransactionAccount;
}

export type Transaction = {
  date?: Date;
  amount: number;
  chargesAndFeesOutstanding: number;
  debitAmount: number;
  description: string;
  effectiveDate: string;
  interestOutstanding: number;
  principalOutstanding: number;
  totalAmountOutstanding: number;
};

interface FinancialTransactionAccount {
  interestAccruedPerDateRange: number;
}
