import { GlobalConfigProps } from '@/types/global/aem-definition';
import { validFunctionalIcons, validIcons } from '@/utility/components/Icon/definitions';

export type PaymentMethodsParsedProps = {
  bpayDescriptionText?: string;
  bpayLabelText?: string;
  bpayIcon?: validIcons;
  directDebitDescriptionText?: string;
  directDebitLabelText?: string;
  directDebitIcon?: validIcons;
  eftDescriptionText?: string;
  eftLabelText?: string;
  eftIcon?: validIcons;
  nominatedFlagText?: string;
  nominatedPaymentOptionType: 'EFT/BPAY' | 'DirectDebit';
  paymentMethodsDescriptionText?: string;
  paymentMethodsLabelText?: string;
  globalConfig: GlobalConfigProps;
  editIcon?: validFunctionalIcons;
};
