import { GlobalConfigProps } from '@/types/global/aem-definition';
import { CommunicationsConfigProps } from '@/types/global/communications-config';
import { validIcons } from '@/utility/components/Icon/definitions';
import { EventNameType } from '@/utility/helpers/analytics/definitions';

export type LockedAccountParsedProps = {
  communicationsConfig?: CommunicationsConfigProps;
  eventName?: EventNameType;
  globalConfig?: GlobalConfigProps;
  lockedButtonText: string;
  lockedDescription?: string;
  lockedIcon: validIcons;
  lockedTitle: string;
  loginButtonText: string;
  resetButtonText: string;
  setPasswordText: string;
  unlockedDescription?: string;
  unlockedIcon: validIcons;
  unlockedTitle: string;
};

export enum LockedAccountSteps {
  'Hidden-Value-Collector' = 0,
  'Email-OTP' = 1,
  'SMS-OTP' = 2,
  'Reset-Password-Prompt' = 3,
  'Set-Password' = 4,
}
