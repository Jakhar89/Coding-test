import { GlobalConfigProps } from '@/types/global/aem-definition';
import { ThankYouConfigProps } from '@/types/global/communications-config';

export type MarketingAndCommunicationsParsedProps = MarketingAndCommunicationsEditModeProps &
  ThankYouConfigProps & {
    cancelButtonText?: string;
    globalConfig?: GlobalConfigProps;
    marketingAndCommunicationsTitle?: string;
    saveButtonText?: string;
  };

export type MarketingAndCommunicationsEditModeProps = {
  communicationsConfig?: ThankYouConfigProps;
  correspondenceMethodDescription?: string;
  correspondenceMethodEmail?: string;
  correspondenceMethodPaper?: string;
  hasError?: boolean;
  marketingAndCommunicationsEditTitle: string;
  marketingPreferenceDescription?: string;
  marketingPreferenceNo?: string;
  marketingPreferenceYes?: string;
  marketingCommunicationsErrorTitle?: string;
  marketingCommunicationsErrorDescription?: string;
  values?: MarketingAndCommunicationsValues;
};

export type MarketingAndCommunicationsValues = {
  customerCorrespondencePreference: string;
  customerMarketingPreference: string;
};
