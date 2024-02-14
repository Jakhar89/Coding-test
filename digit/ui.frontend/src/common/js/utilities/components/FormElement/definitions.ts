import { SpacingKey } from '@/utility/theme/global/definitions';

export interface AddressSectionProps {
  isAddressSame: boolean;
}

export interface FormSectionStyleProps {
  size?: 'macro1' | 'macro2';
}

export type FormSectionProps = React.HTMLProps<HTMLDivElement> & {
  spacingSize?: 'macro1' | 'macro2';
  sectionWidth: 'fullwidth' | 'halfwidth' | 'threeQuartersWidth';
  children: React.ReactNode;
};

export type FormFieldProps = {
  marginBottomSize?: SpacingKey | null;
  isSmallTitle?: boolean;
  hasLink?: boolean;
};

export type FormikEditModeProps = {
  errors: any;
  handleBlur: (e) => void;
  handleChange: (e) => void;
};
