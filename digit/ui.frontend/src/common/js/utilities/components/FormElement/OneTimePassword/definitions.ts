import * as forgeRock from '@forgerock/javascript-sdk';
import { AEMErrorMap } from '@/types/global/aem-definition';

// key is exposed throughout Formik context
export const OTP_KEY = 'preferences/otp';
export const RESEND_VALUE = 'resend';

export type OneTimePasswordInputProps = {
  oneTimeStringAttributeInputCallback?: forgeRock.AttributeInputCallback<string>;
};

export type OneTimePasswordProps = OneTimePasswordInputProps & {
  cancelButtonLabel?: string;
  contactUsDescription?: string;
  continueButtonLabel: string;
  countdownTimerDescription?: string;
  errorComponent?: forgeRock.TextOutputCallback | null;
  errorMap: AEMErrorMap;
  handleOnClickCancel?: (e) => void;
  handleOnClickContinue?: (e) => void;
  handleOnClickResendOtp?: (e) => void;
  heading?: string;
  headingSize?: string;
  oneTimePasswordInputLabel?: string;
  oneTimeStringAttributeInputCallback: forgeRock.AttributeInputCallback<string>;
  resendOtpButtonLabel?: string;
  setTimer: number;
  subheading?: string;
  isLoading?: boolean;
};

export type OneTimePasswordFormValues = {
  [OTP_KEY]?: string;
};

export interface ButtonStyleProps {
  buttonState: 'primary' | 'primaryDisabled' | 'secondary' | 'secondaryDisabled';
  buttonStyle: 'primary' | 'secondary';
}

export interface OneTimePasswordInputStyleProps {
  hasError?: boolean;
}
