import { GlobalConfigProps } from '@/types/global/aem-definition';
import { StateSetter } from '@/types/global/generic';

export type AddressDetailsParsedProps = AEMFields & {
  cancelButtonText?: string;
  globalConfig?: GlobalConfigProps;
  saveButtonText?: string;
};

export type StreetTypes = {
  code?: string;
  label?: string;
};

export type SuburbList = {
  postcode?: string;
  state?: string;
  suburb?: string;
};

export type MailingFormFields = {
  'mailing-addressLine1'?: string;
  'mailing-addressLine2'?: string;
  'mailing-addressPurposeType': 'Residential' | 'Mailing';
  'mailing-citySuburb'?: string;
  'mailing-country'?: string;
  'mailing-postZipCode'?: string;
  'mailing-propertyName'?: string;
  'mailing-stateProvince'?: string;
  'mailing-streetName'?: string;
  'mailing-streetNumber'?: string;
  'mailing-streetType'?: string;
  'mailing-unitNumber'?: string;
};

export type ResidentialFormFields = {
  'residential-addressLine1'?: string;
  'residential-addressLine2'?: string;
  'residential-addressPurposeType': 'Residential' | 'Mailing';
  'residential-citySuburb'?: string;
  'residential-country'?: string;
  'residential-postZipCode'?: string;
  'residential-propertyName'?: string;
  'residential-stateProvince'?: string;
  'residential-streetName'?: string;
  'residential-streetNumber'?: string;
  'residential-streetType'?: string;
  'residential-unitNumber'?: string;
};

export type AddressTypeFormFields = MailingFormFields | ResidentialFormFields;

export type AddressDetailBaseProps = AddressTypeFormFields & {
  addressTitle?: string;
};

type AEMFields = {
  mailingAddressTitle: string;
  resAddressLine1: string;
  resAddressLine2: string;
  resCitySuburb: string;
  resCountry: string;
  resPostZipCode: string;
  resStateTerritory: string;
  residentialAddressSubTitle: string;
  residentialAddressTitle: string;
  streetTypes: StreetTypes[];
  suburbList: SuburbList[];
};

export type AddressDetailsFormValues = AddressTypeFormFields & {
  copyAddressTo?: boolean;
  isPoBox?: boolean;
};

export type AddressTypePrefix = 'mailing' | 'residential';

export type ManualAddressProps = {
  addressDetailsJson?: any;
  setShowManualAddress: StateSetter<boolean>;
  addressType: AddressTypePrefix;
};
