import { GlobalConfigProps } from '@/types/global/aem-definition';
import { VerifyEmailMobileThankYouConfigProps } from '@/types/global/communications-config';
import { OtpProps } from '@/types/global/otp';
import * as forgeRock from '@forgerock/javascript-sdk';

export type EmailAddressParsedProps = EmailAddressEditModeProps & {
  cancelButtonText?: string;
  communicationsConfig?: VerifyEmailMobileThankYouConfigProps;
  emailAddressLabelText?: string;
  globalConfig?: GlobalConfigProps;
  saveButtonText?: string;
};

export type EmailAddressEditModeProps = {
  emailAddressEditTitle?: string;
  errorComponent?: forgeRock.TextOutputCallback | null;
  hasQuestApiError?: boolean;
  introductoryText?: string;
  loginEmailDescription?: string;
  loginEmailText?: string;
  loginEmailTitle?: string;
  loginLabelText?: string;
  preferredContact?: string;
  personalEmail?: string;
  personalLabelText?: string;
  preferredContactDescription?: string;
  preferredContactTitle?: string;
  workEmail?: string;
  workLabelText?: string;
};

export type EmailAddressFormValues = {
  mail: string;
  personalEmail?: string;
  preferredContactEmail: string;
  usePersonalEmailAsLogin?: boolean;
  useWorkEmailAsLogin?: boolean;
  workEmail: string;
};

export enum ManageEmailAddressSteps {
  'Hidden-Value-Collector' = 0,
  'New-Email' = 1,
  'SMS-OTP' = 2,
  'Email-OTP' = 3,
  'Change-Successful' = 4,
}

export type ManageEmailAddressProps = EmailAddressEditModeProps &
  Omit<OtpProps, 'handleFormSubmit'> & {
    cancelButtonText?: string;
    handleFormSubmit: (values: EmailAddressFormValues, setSubmitting: any) => void;
    handleOnClickCancel: (e) => void;
    initialValues: EmailAddressFormValues;
    saveButtonText?: string;
  };

export type dataToGo = {
  customerDomain: {
    contactEmail?: {};
  };
};
