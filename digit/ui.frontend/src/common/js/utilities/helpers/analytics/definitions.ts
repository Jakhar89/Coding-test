export type DigitalData = SuccessInteraction &
  UpdateInteraction & {
    keyLink?: KeyLinkInteraction;
  };

type PageType = {
  accountProductType?: string;
  accountStatus?: string;
  accountStartDate?: string;
  pageBrand?: string;
  pageName?: string;
  pageURL?: string;
};

export type TrackEventProps = {
  name: EventNameType;
  data?: TrackEventPayload;
};

export type EventNameType =
  | 'accountLockout'
  | 'accountsPage'
  | 'accountSwitch'
  | 'accountUnlock'
  | 'cancelUpdate'
  | 'continueLogin'
  | 'continueRegister'
  | 'continueUpdate'
  | 'error'
  | 'keyLinkInteraction'
  | 'loginCTA'
  | 'loginSuccess'
  | 'logout'
  | 'registerCTA'
  | 'registrationSuccess'
  | 'saveChanges'
  | 'sessionTimedout'
  | 'timeoutWarning'
  | 'updateClick'
  | 'updateSuccess'
  | 'contactUsSubmit'
  | 'modalOpened'
  | 'modalClosed'
  | 'paymentMethodSaved'
  | 'paymentMethodAMBA'
  | 'paymentFrequencySaved'
  | 'paymentRepaymentSaved'
  | 'paymentNextDDateSaved'
  | 'bankAccountAdd'
  | 'bankAccountEdited'
  | 'bankAccountRemoved';

type NodeOptionType =
  | 'cancelSection'
  | 'continueSection'
  | 'modalTitle'
  | 'preferredContactNumber'
  | 'saveSection'
  | 'setLoginEmail'
  | 'updateSection'
  | 'updateSuccessSection';

export type TrackEventPayload = UpdateInteraction &
  SuccessInteraction &
  SubmitInteraction & {
    error?: ErrorResponse;
    keyLink?: KeyLinkInteraction;
    page?: PageType;
  };

type ErrorResponse = {
  errorAPI?: 'Forgerock' | 'Quest';
  errorDetails?: string;
  errorField?: string;
  modalTitle?: string;
  errorFlow?: string;
};

type KeyLinkInteraction = {
  linkDestinationURL?: string;
  linkOriginationPage: string;
  linkPosition?: string;
  linkTitle?: string;
};

type SuccessInteraction = {
  mailingAddressInput?: 'Manual' | 'Look up';
  mailingAddressSameAsREsidential?: YesNoType;
  marketingCommunicationsPreference?: YesNoType;
  methodOfCorrespondenceSelected?: 'Email' | 'Paper';
  preferredContactEmail?: 'Personal' | 'Work';
  preferredContactNumber?: 'Mobile' | 'Work' | 'Home' | 'Other';
  residentialAddressInput?: string;
  residentialAddressType?: 'Street Address' | 'PO Box';
  setLoginEmail?: string;
  updateSuccessSection?: SectionType;
};

type SubmitInteraction = {
  enquiryType?: string;
  enquiryMethod?: string;
};

type UpdateInteraction = {
  cancelSection?: SectionType;
  continueSection?: SectionType;
  modalTitle?: string;
  saveSection?: SectionType;
  updateSection?: SectionType;
  paymentMethod?: 'EFT' | 'BPAY';
  paymentPeriod?: string;
  rePaymentAmount?: string;
  paymentNextDDate?: string;
};

//prettier-ignore
export type SectionType =
 'Email Address' |
 'Log in' |
 'Mailing Address' |
 'Marketing and Communications' |
 'Password' |
 'Phone Number' |
 'Register' |
 'Residential Address';

type YesNoType = 'No' | 'Yes';

export type ClientValidationErrors = {
  errors?: {
    [key: string]: string;
  };
  journeyFlow?: string;
  modalTitle?: string;
};
