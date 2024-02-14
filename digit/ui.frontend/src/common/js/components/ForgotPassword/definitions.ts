import * as forgeRock from '@forgerock/javascript-sdk';

import { GlobalConfigProps } from '@/types/global/aem-definition';
import { CommunicationsConfigProps } from '@/types/global/communications-config';
import { OtpProps } from '@/types/global/otp';

export type ForgotPasswordParsedProps = forgotPasswordDetails & {
  communicationsConfig?: CommunicationsConfigProps;
  globalConfig?: GlobalConfigProps;
  setPasswordText?: string;
  agreeTerms?: string;
  agreeTermsButton?: string;
  agreeTermsTitle?: string;
  termsOfUse?: string;
  termsTitle?: string;
};

type forgotPasswordDetails = {
  forgotPasswordButton?: string;
  forgotPasswordContact?: string;
  forgotPasswordDescription?: string;
  forgotPasswordTitle?: string;
};

export enum ForgotPasswordSteps {
  'Hidden-Value-Collector' = 0,
  'Reset-Password' = 1,
  'Email-OTP' = 2,
  'SMS-OTP' = 3,
  'New-Password' = 4,
  'Terms-of-Use' = 5,
}

export type ForgotYourPasswordProps = forgotPasswordDetails &
  OtpProps & {
    btnText?: string;
    isLoading: boolean;
  };

export type ResetPasswordProps = OtpProps & {
  communicationsConfig?: CommunicationsConfigProps;
  errorComponent?: forgeRock.TextOutputCallback | null;
  setPasswordText?: string;
};
