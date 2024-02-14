import { StateSetter } from '@/types/global/generic';
import { AddressDetailsParsedProps, AddressTypePrefix } from '../definitions';

export type StreetAddressProps = {
  addressDetailsJson: AddressDetailsParsedProps;
  addressType: AddressTypePrefix;
  errorPagePath: string;
  questApiKey?: string;
  initialData?: any;
  setShowManualMailingAddress: StateSetter<boolean | null>;
  setShowManualResidentialAddress: StateSetter<boolean | null>;
};
