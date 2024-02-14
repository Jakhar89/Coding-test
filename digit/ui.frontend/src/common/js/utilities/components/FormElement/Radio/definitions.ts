export type RadioListProps = React.HTMLProps<HTMLInputElement> & {
  items: RadioListItemData[];
  name: string;
  verticalAlign?: boolean;
  gridChilds?: number;
  isFullWidth?: boolean;
};

export type RadioListItemData = {
  id?: string;
  htmlFor?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  label?: string;
  onBlur?: (e) => void;
  onChange?: (e) => void;
  value?: string;
};

export interface RadioStylingProps {
  disabled?: boolean;
  hasError?: boolean;
  verticalAlign?: boolean;
  gridChilds?: number;
  isFullWidth?: boolean;
}
