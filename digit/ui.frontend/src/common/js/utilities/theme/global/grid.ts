import { IGridSettings } from './definitions';

export const grid: IGridSettings = {
  defaultColCount: 12,
  colCount: {
    xs: 4,
    sm: 4,
    md: 12,
    lg: 12,
    xl: 12,
  },
  containerMaxWidth: 1488,
  containerMinWidth: 280,
  gutter: {
    // top and bottom removed and managed on per-component basis
    directions: ['left', 'right'],
    size: {
      xs: 16,
      sm: 16,
      md: 24,
      lg: 24,
      xl: 24,
    },
  },
  margin: {
    xs: 24,
    sm: 48,
    md: 64,
    lg: 80,
    xl: 144,
  },
};
