import { validIcons } from '@/utility/components/Icon/definitions';

export type PaymentMethodsCardProps = {
  accountNumber?: string;
  billerCode?: string;
  bsb?: string;
  description?: string;
  disclaimer?: string;
  iconName?: validIcons;
  info?: string;
  referenceNumber?: string;
  title?: string;
  testAttribute?: string;
};

export type PaymentAccountInfoProps = {
  detail?: string;
  title?: string;
  testAttribute?: string;
};
