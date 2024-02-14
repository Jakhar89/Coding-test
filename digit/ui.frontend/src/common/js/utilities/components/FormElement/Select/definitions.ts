export interface SelectProps {
  register?: any;
  errors?: any;
  control?: any;
  independent?: boolean;
  changeFunc?: any;
  hasError?: boolean;
  errorMessage?: string;
  label?: string;
  heading?: string;
  subheading?: string;
  defaultValue?: string;
  name: string;
  validation?: any;
  validationMsg?: string;
  placeholder?: string;
  styles?: object;
  isDisabled?: boolean;
  searchable?: boolean;
  options?: Array<{
    label: string;
    value: any;
  }>;
  value: any;
  setFieldValue: Function;
  isInFormik?: boolean;
}
