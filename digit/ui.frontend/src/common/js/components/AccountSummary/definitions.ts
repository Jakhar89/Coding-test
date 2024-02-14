import { GlobalConfigProps } from '@/types/global/aem-definition';

export type AccountSummaryProps = {
  globalConfig: GlobalConfigProps;
  nextRepayment: string;
  recentTransactions: string;
  menuItems: MenuItem[];
  transactionButtonText: string;
};

interface MenuItem {
  title: string;
  url: string;
}

export type InnerContainerProps = {
  size?: Number[];
};

export type CardTitleProps = {
  divider?: boolean;
};
