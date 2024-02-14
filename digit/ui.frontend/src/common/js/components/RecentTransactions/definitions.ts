import { GlobalConfigProps } from '@/types/global/aem-definition';

export type RecentTransactionProps = {
  recentTransactionsTitle?: string;
  recentTransactionsTooltip?: string;
  buttonLabel?: string;
  noTransactionsText?: string;
  tableTitle1?: string;
  tableTitle2?: string;
  tableTitle3?: string;
  dynamicData?: any;
  buttonLink?: string;
  globalConfig: GlobalConfigProps;
};
