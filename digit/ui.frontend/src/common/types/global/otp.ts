import { FRStep, TextOutputCallback } from '@forgerock/javascript-sdk';

import { AEMErrorMap } from '@/types/global/aem-definition';
import { CommunicationsConfigProps } from '@/types/global/communications-config';

export type OtpProps = {
  communicationsConfig?: CommunicationsConfigProps;
  errorComponent?: TextOutputCallback | null;
  errorMap: AEMErrorMap;
  handleFormSubmit: () => void;
  handleOnClickCancel?: (e) => void;
  nextStep: FRStep;
  site?: string;
  step: FRStep;
  isLoading?: boolean;
};
