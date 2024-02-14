export type DatePickerProps = {
  name: string;
  value?: Date;
  readOnly?: boolean;
  minDate?: Date;
  maxDate?: Date | number;
  placeholder?: string;
  FieldHookConfig?: any;
  handleDateChange?: any;
  alignLeft?: boolean;
  isInFormik?: boolean;
  disabled?: boolean;
};
