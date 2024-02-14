type YesNoType = 'No' | 'Yes';

type AddressDetails = {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  streetName: string;
  propertyName: string;
  unitNumber: string;
  streetType: string;
  streetNumber: string;
  citySuburb: string;
  stateProvince: string;
  country?: null;
  countryCode: string;
  postZipCode: string;
  fullAddress: string;
  addressPurposeType: 'Residential' | 'Mailing';
};

export type ContactEmailAddress = {
  email: string;
  emailType: 'Work' | 'Personal';
  primaryEmail: boolean;
};

export type ContactTelephone = {
  telephoneNumber: string;
  telephoneNumberType: 'Home' | 'Mobile' | 'Work' | 'Alternate';
  primaryTelephoneNumber: boolean;
};

// Require to re-visit again, as this hasn't been documented on confluence
// see https://tfal.atlassian.net/wiki/spaces/SSP/pages/2976055297/1.+Get+Customer+Profile
export type CustomerProfile = {
  customerDomain?: {
    addressDetail?: AddressDetails[];
    contactTelephone?: ContactTelephone[];
    contactEmailAddress?: ContactEmailAddress[];
    customer?: {
      customerId?: string;
    };
    customerConsent?: {
      customerCorrespondencePreference?: 'Email' | 'Letter';
      customerMarketingPreference?: YesNoType;
    };
    person?: {
      salutation?: string;
      givenName1?: string;
      givenName2?: string;
      surname: string;
    };
  };
};
