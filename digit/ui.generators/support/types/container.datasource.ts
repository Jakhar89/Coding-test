import type { DataSourceItem, DataSourceOptions } from '@/generator/support/types/datasource';

export interface ContainerDataSourceItemLayoutColumn {
  /**
   * Set the number of columns for this column to span.
   */
  columnSpan: number;
  /**
   * Set where the column should start and end.
   * Note that offsets start at '1' and end at one number above the total number of columns.
   */
  offset?: {
    end: number;
    start: number;
  };
  /**
   * Set the number of rows for this column to span.
   */
  rowSpan: number;
}

export interface ContainerDataSourceItemLayoutOptions {
  /**
   * The total number of columns to visually display.
   */
  displayColumns?: number;
  /**
   * Define the layout of the columns. By design you can skip columns entirely and also apply
   * custom spans along with offsets.
   *
   * Column indexes start from `0` and you can skip any that don't require custom layouts applied.
   *
   * If the total number of display `columns` is `5`, but the generated `columns` is `3`, we can
   * skip column 0 & 2 and apply a layout to only column 1 to make it span across more display columns.
   * @example
   * ```ts
   * {
   *   layout: {
   *     1: 3,
   *   },
   * }
   * ```
   *
   * @example
   * ```ts
   * {
   *   layout: {
   *     1: {
   *       span: 3,
   *     },
   *   },
   * }
   * ```
   */
  layout: Record<number, ContainerDataSourceItemLayoutColumn | number>;
}

export interface ContainerDataSourceItemLayout {
  sm?: ContainerDataSourceItemLayoutOptions | number;
  md?: ContainerDataSourceItemLayoutOptions | number;
  lg?: ContainerDataSourceItemLayoutOptions | number;
  xl?: ContainerDataSourceItemLayoutOptions | number;
  '2xl'?: ContainerDataSourceItemLayoutOptions | number;
}

export interface ContainerDataSourceItem extends DataSourceItem {
  /**
   * The number of columns to generate.
   *
   * When `layout` is omitted, the model will automatically assume that the `sm` breakpoint will
   * inherit this value as the total number of displayed columns.
   */
  columns: number;
  /**
   * The initial layout which is assumed as one column when not set.
   */
  initialLayout?: ContainerDataSourceItemLayoutOptions | number;
  /**
   * Define the layout of the container column. Each layout correlates directly to the out-of-the-box
   * **Tailwind** breakpoints.
   *
   * Providing just a single number assumes all columns share an equal span width.
   */
  layout?: ContainerDataSourceItemLayout;
}

export interface ContainerDataSourceOptions extends DataSourceOptions {
  items: ContainerDataSourceItem[];
}
