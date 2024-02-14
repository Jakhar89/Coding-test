import { GlobalConfigProps } from '@/types/global/aem-definition';

export type AccountStatementParsedProps = {
  accountStatementTitle?: string;
  accountToDateLabel: string;
  dateRangeLabel: string;
  dateFromLabel: string;
  dateToLabel?: string;
  generateStatementCta: string;
  statementTitle?: string;
  statementTableHeader1: string;
  statementTableHeader2: string;
  statementDownloadedLabel: string;
  statementGeneratedLabel?: string;
  downloadedDescription?: string;
  generatedDescription?: string;
  noStatementLabel?: string;
  globalConfig?: GlobalConfigProps;
};

export type FrequencyInterval = {
  Monthly: string;
  Fortnightly: string;
  Weekly: string;
  Quarterly: string;
  Annual: string;
  Structured: string;
  P1M: string; //temporary
};
