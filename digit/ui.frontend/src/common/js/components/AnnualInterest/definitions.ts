import { GlobalConfigProps } from '@/types/global/aem-definition';

export type AnnualInterestParsedProps = {
  globalConfig: GlobalConfigProps;
  annualInterestLabelText?: string;
  financialYearText?: string;
  setSuffixYear?: boolean;
};
