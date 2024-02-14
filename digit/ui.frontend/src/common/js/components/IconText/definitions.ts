import { IconProps } from '@/utility/components/Icon/definitions';

export type IconTextProps = {
  iconTextList: Datum[];
};

interface Datum {
  icon: IconProps['name'];
  alt: string;
  description: string;
}
