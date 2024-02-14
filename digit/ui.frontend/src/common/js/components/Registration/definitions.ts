import * as forgeRock from '@forgerock/javascript-sdk';

import { AEMErrorMap, GlobalConfigProps } from '@/types/global/aem-definition';
import { CommunicationsConfigProps } from '@/types/global/communications-config';
import { validIcons } from '@/utility/components/Icon/definitions';

export type RegistrationParsedProps = {
  agreeTerms?: string;
  agreeTermsButton?: string;
  agreeTermsTitle?: string;
  communicationsConfig?: CommunicationsConfigProps;
  globalConfig?: GlobalConfigProps;
  loginButton?: string;
  loginButtonUrl?: string;
  loginIcon?: validIcons;
  loginTitle?: string;
  registerButton?: string;
  registerContact?: string;
  registerDescription?: string;
  registerTitle?: string;
  resetPasswordText?: string;
  termsOfUse?: string;
  termsTitle?: string;
};

export type RegistrationFormValues = {
  Registration: {
    mail?: string;
    recaptcha?: string;
  };
};

export enum RegistrationSteps {
  'Hidden-Value-Collector' = 0,
  Registration = 1,
  'Terms-of-Use' = 2,
  'Email-OTP' = 3,
  'SMS-OTP' = 4,
  Password = 5,
}

export type RegisterAccountProps = mapCallbacksToComponentsAttributesProps & {
  btnText?: string;
  errorComponent?: forgeRock.TextOutputCallback | null;
  errorMap: AEMErrorMap;
  handleFormSubmit: () => void;
  isLoading: boolean;
  loginButton?: string;
  loginButtonUrl?: string;
  loginIcon?: validIcons;
  loginTitle?: string;
  registerContact?: string;
  registerDescription?: string;
  registerTitle?: string;
};

export type SetPasswordProps = mapCallbacksToComponentsAttributesProps & {
  btnText?: string;
  description?: string;
  errorMap: AEMErrorMap;
  handleFormSubmit: () => void;
  title?: string;
  isLoading?: boolean;
};

// shared with LogIn component
export type TermsOfUseProps = mapCallbacksToComponentsAttributesProps & {
  agreeTerms?: string;
  agreeTermsTitle?: string;
  handleFormSubmit: () => void;
  btnText?: string;
  termsOfUse?: string;
  termsTitle?: string;
  errorMap: AEMErrorMap;
  attributes?: any;
  errorSuccessMap?: any;
  isLoading?: boolean;
};

type mapCallbacksToComponentsAttributesProps = {
  nextStep: forgeRock.FRStep;
  site?: string;
  step?: forgeRock.FRStep;
};
