import { GlobalConfigProps } from '@/types/global/aem-definition';

export type AccountDetailsParsedProps = {
  accountCurrentBalanceCaptionText?: string;
  accountCurrentBalanceLabelText: string;
  accountDetailsLabelText: string;
  accountEndDateLabelText: string;
  accountFinancedAmountCaptionText?: string;
  accountFinancedAmountLabelText: string;
  accountGuaranteedFutureValCaptionText?: string;
  accountGuaranteedFutureValLabelText: string;
  accountInterestRateLabelText: string;
  accountMaturityOptionLabelText: string;
  accountMonthsRunCaptionText?: string;
  accountMonthsRunLabelText: string;
  accountNameLabelText: string;
  accountNumberLabelText: string;
  accountProductTypeLabelText: string;
  accountStartDateLabelText: string;
  accountStatusCaptionText?: string;
  accountStatusLabelText: string;
  accountTermCaptionText?: string;
  accountTermLabelText: string;
  accountVehEndOdoCaptionText?: string;
  accountVehEndOdoLabelText: string;
  annualBalanceLabelText: string;
  balloonPaymentAmountCaptionText?: string;
  balloonPaymentAmountLabelText: string;
  dealershipNameCaptionText?: string;
  dealershipNameLabelText: string;
  globalConfig: GlobalConfigProps;
  viewRepaymentsButtonText: string;
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
