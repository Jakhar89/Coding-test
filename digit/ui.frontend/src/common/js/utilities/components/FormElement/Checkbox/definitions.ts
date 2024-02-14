import { SpacingKey } from '@/utility/theme/global/definitions';

export type CheckboxProps = React.HTMLProps<HTMLInputElement> & {
  hasError?: boolean;
  isChecked?: boolean;
  isDisabled?: boolean;
  label?: string;
  richTextLabel?: React.ReactNode | undefined;
  marginTopSize?: SpacingKey | string;
  name: string;
  onChange?: (e) => void;
  type?: 'checkbox' | 'hidden';
  value?: string;
  alignItems?: string;
};

export interface CheckboxStyleProps {
  marginTopSize?: SpacingKey | string;
  isDisabled?: boolean;
  alignItems?: string;
}
