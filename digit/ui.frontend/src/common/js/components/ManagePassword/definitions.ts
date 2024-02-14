import { GlobalConfigProps } from '@/types/global/aem-definition';
import { CommunicationsConfigProps } from '@/types/global/communications-config';

export type ManagePasswordParsedProps = {
  cancelButtonText?: string;
  communicationsConfig?: CommunicationsConfigProps;
  globalConfig?: GlobalConfigProps;
  managePasswordTitle?: string;
  passwordText?: string;
  saveButtonText?: string;
};

export enum ManagePasswordSteps {
  'Hidden-Value-Collector' = 0,
  'New-Password' = 1,
  'SMS-OTP' = 2,
  'Change-Successful' = 3,
}
