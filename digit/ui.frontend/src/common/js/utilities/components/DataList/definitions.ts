export type DataListProps = {
  data: DataListItem[];
  shouldHideEmptyValues?: boolean;
};

export type DataListItem = {
  disclaimer?: string;
  isBoldText?: boolean;
  isNegativeAmount?: boolean;
  title?: string;
  value?: string | number;
  editable?: boolean;
  actionItem?: {
    handleOnClick?: (item?: string) => void;
    item?: string;
  };
};

export interface DataListStyleProps {
  isNegativeAmount?: boolean;
}

export type DynamicDataListProps = {
  listHeaders: Object;
  data: any;
  shouldHideEmptyValues?: boolean;
  listCustomColumnsWidth?: Array<number>;
};

export type ContentWrapperProps = {
  justify?: string;
  direction?: string;
};

export type ListHeader = {
  listSize?: number;
  regular?: boolean;
  columnWidth?: number | null;
};
