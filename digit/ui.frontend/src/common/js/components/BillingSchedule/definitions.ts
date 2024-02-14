import { GlobalConfigProps } from '@/types/global/aem-definition';

export type BillingScheduleParsedProps = {
  billingScheduleLabelText: string;
  globalConfig: GlobalConfigProps;
};

export interface PaginationStyleProps {
  canNextPage?: boolean;
  canPreviousPage?: boolean;
  isCurrentPage?: boolean;
}

export interface TablesStyleProps {
  shouldShowGradient?: boolean;
}
