import { FRStep } from '@forgerock/javascript-sdk';

export type HiddenCollectorProps = {
  errorMap: any;
  handleFormSubmit: () => void;
  nextStep?: (step: FRStep) => void;
  site?: string;
  step?: FRStep;
};
