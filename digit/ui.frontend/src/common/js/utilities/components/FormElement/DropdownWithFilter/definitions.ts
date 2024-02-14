import { SelectProps } from 'react-functional-select';

export type DropdownWithFilterProps = SelectProps & {
  description?: string;
  // This is used to hide/show the search/chevron icon and only show the X icon
  selectedOption: any | null;
  name: string;
};

export interface DropdownWithFilterStyleProps {
  hasError?: boolean;
  hasOptions?: boolean;
  isLoading?: boolean;
  isSearchable?: boolean;
  isSelected?: DropdownWithFilterProps['selectedOption'];
}
