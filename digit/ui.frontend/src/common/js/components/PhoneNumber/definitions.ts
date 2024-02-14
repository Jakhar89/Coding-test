import * as forgeRock from '@forgerock/javascript-sdk';

import { AEMErrorMap, GlobalConfigProps } from '@/types/global/aem-definition';
import { CommunicationsConfigProps, VerifyEmailMobileThankYouConfigProps } from '@/types/global/communications-config';

export type PhoneNumberParsedProps = PhoneNumberProps & {
  phoneNumberTitle: string;
};

type PhoneNumberProps = {
  cancelButtonText?: string;
  communicationsConfig?: VerifyEmailMobileThankYouConfigProps;
  errorComponent?: forgeRock.TextOutputCallback | null;
  globalConfig?: GlobalConfigProps;
  homeLabelText: string;
  homeNumber?: string;
  mobileLabelText: string;
  otherLabelText: string;
  otherNumber?: string;
  phoneNumberEditTitle?: string;
  preferredContact?: string;
  preferredContactDescription?: string;
  preferredContactTitle?: string;
  saveButtonText?: string;
  workLabelText: string;
  workNumber?: string;
};

export type PhoneNumberFormValues = {
  errors?: any;
  home?: string;
  other?: string;
  preferredContact: string;
  'preferences/isPreferredPhone': boolean;
  setSubmitting?: (e) => void;
  telephoneNumber: string;
  work?: string;
};

export type EditModeProps = PhoneNumberProps &
  mapCallbacksToComponentsAttributesProps & {
    errorMap: AEMErrorMap;
    handleFormSubmit: any;
    handleOnClickCancel: (e: any) => void;
    hasQuestApiError: boolean;
    initialHomeNumber: string;
    initialMobileNumber: string;
    initialOtherNumber: string;
    initialPreferredContact?: string;
    initialPreferredContactAsMobile?: boolean;
    initialWorkNumber: string;
    isLoading?: boolean;
  };

export enum ManagePhoneNumberSteps {
  'Hidden-Value-Collector' = 0,
  'New-Phone-Number' = 1,
  'Email-OTP' = 2,
  'SMS-OTP' = 3,
  'Change-Successful' = 4,
}

type mapCallbacksToComponentsAttributesProps = {
  nextStep: forgeRock.FRStep;
  site?: string;
  step?: forgeRock.FRStep;
};

type otpProps = {
  cancelButtonText?: string;
  communicationsConfig?: CommunicationsConfigProps;
  errorMap: AEMErrorMap;
  handleFormSubmit: () => void;
  handleOnClickCancel: (e) => void;
};

export type dataToGo = {
  customerDomain: {
    contactTelephone?: {};
  };
};
