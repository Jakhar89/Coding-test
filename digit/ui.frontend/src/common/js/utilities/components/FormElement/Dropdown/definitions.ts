export type DropdownProps = React.HTMLProps<HTMLInputElement> & {
  hasError?: boolean;
  items: DropdownItemData[] | undefined;
  name: string;
  canSelectItem?: boolean;
};

export type DropdownItemData = {
  label: string;
  onClick?: (e?) => void;
  value?: string;
  default?: boolean;
};
