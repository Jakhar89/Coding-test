import * as forgeRock from '@forgerock/javascript-sdk';

import { AEMErrorMap, GlobalConfigProps } from '@/types/global/aem-definition';
import { CommunicationsConfigProps } from '@/types/global/communications-config';
import { validIcons } from '@/utility/components/Icon/definitions';

export type LogInProps = mapCallbacksToComponentsAttributesProps & {
  btnText?: string;
  errorComponent?: forgeRock.TextOutputCallback | null;
  communicationsConfig?: CommunicationsConfigProps;
  errorMap: AEMErrorMap;
  forgotPasswordText?: string;
  forgotPasswordUrl?: string;
  handleFormSubmit: (e) => void;
  isLoading?: boolean;
  loginContact?: string;
  loginDescription?: string;
  loginTitle?: string;
  registerButton?: string;
  registerButtonUrl?: string;
  registerIcon?: validIcons;
  registerTitle?: string;
};

export type LoginParsedProps = {
  agreeTerms?: string;
  agreeTermsButton?: string;
  agreeTermsTitle?: string;
  communicationsConfig?: CommunicationsConfigProps;
  forgotPasswordText?: string;
  forgotPasswordUrl?: string;
  globalConfig?: GlobalConfigProps;
  loginButton?: string;
  loginContact?: string;
  loginDescription?: string;
  loginTitle?: string;
  registerButton?: string;
  registerButtonUrl?: string;
  registerIcon?: validIcons;
  registerTitle?: string;
  termsOfUse?: string;
  termsTitle?: string;
};

export enum LoginSteps {
  'Hidden-Value-Collector' = 0,
  'Log-In' = 1,
  'Terms-of-Use' = 2,
  'SMS-OTP' = 3,
}

type mapCallbacksToComponentsAttributesProps = {
  nextStep: forgeRock.FRStep;
  site?: string;
  step: forgeRock.FRStep;
};
