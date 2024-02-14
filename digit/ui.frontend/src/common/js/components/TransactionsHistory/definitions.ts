import { GlobalConfigProps } from '@/types/global/aem-definition';

export type TransactionsHistoryProps = {
  globalConfig: GlobalConfigProps;
  transactionTitle: string;
  filtersText: string;
  filter1: string;
  filter1Placeholder: string;
  filter1Icon: string;
  filter2: string;
  filter3: string;
  filter4: string;
  filter4Placeholder: string;
  tableHeader1: string;
  tableHeader2: string;
  tableHeader3: string;
  tableHeader4: string;
  tableHeader5: string;
  exportButtonLabel: string;
  noTransactions: string;
  transactionPeriodText: string;
  transactionTypes: TransactionType[];
};

interface TransactionType {
  type: string;
}

export type LinkProps = {
  linkTo: string;
  newPage: string;
};

export type FilterValues = {
  values: { dateFrom: Date; dateTo: Date; tansactionType: string; searchField: string };
};
