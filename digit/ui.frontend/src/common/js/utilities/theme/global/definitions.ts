export interface IButtonColors {
  background: string;
  backgroundActive?: string;
  backgroundHover: string;
  borderActive?: string;
  borderColor: string;
  borderHover?: string;
  borderImage?: string;
  borderStyle?: string;
  color: string;
  colorActive?: string;
  colorHover: string;
}

export interface IButtonSettings {
  fontSize: {
    [key: string]: number;
  };
  lineHeight: {
    [key: string]: number;
  };
  padding: {
    [key: string]: {
      [key: string]: number;
    };
  };
  icon: {
    [key: string]: {
      [key: string]: number;
    };
  };
  borderStyle?: string;
  borderWidth?: number | string;
  fontFamily?: string;
  fontWeight?: string | number;
  borderRadius?: {
    [key: string]: number;
  };
}

export interface IGridSettings {
  margin: {
    [key: string]: number;
  };
  gutter: {
    size: { [key: string]: number };
    directions: string[];
  };
  defaultColCount: number;
  colCount: {
    [key: string]: number;
  };
  containerMinWidth: number;
  containerMaxWidth: number;
}
export interface ITypographySetting {
  color?: {
    [key: string]: string;
  };
  fontSize?: {
    [key: string]: number;
  };
  letterSpacing?: number;
  lineHeight?: {
    [key: string]: string | number;
  };
  fontFamily?: string;
  fontWeight?: string | number;
  spacing?: {
    [key: string]: number;
  };
  textTransform?: string;
}

export interface IFixedTypographySetting {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string | number;
  letterSpacing?: string | number;
  lineHeight?: string | number;
  spacing?: number;
  textDecoration?: string;
  textTransform?: string;
}
export interface ITypographySettings {
  headings: {
    H1: ITypographySetting;
    H2: ITypographySetting;
    H3: ITypographySetting;
    H4: ITypographySetting;
    H5: ITypographySetting;
    H6: ITypographySetting;
  };
  text: {
    body0: ITypographySetting;
    body1: ITypographySetting;
    body2: ITypographySetting;
    body3: ITypographySetting;
    body4: ITypographySetting;
    boldBody0: ITypographySetting;
    boldBody1: ITypographySetting;
    boldBody2: ITypographySetting;
    boldBody3: ITypographySetting;
    boldBody4: ITypographySetting;
    boldFixedBody8: IFixedTypographySetting;
    boldFixedBody10: IFixedTypographySetting;
    boldFixedBody12: IFixedTypographySetting;
    boldFixedBody14: IFixedTypographySetting;
    boldFixedBody16: IFixedTypographySetting;
    fixedBody8: IFixedTypographySetting;
    fixedBody10: IFixedTypographySetting;
    fixedBody12: IFixedTypographySetting;
    fixedBody14: IFixedTypographySetting;
    fixedBody16: IFixedTypographySetting;
    label1: IFixedTypographySetting;
    label2: IFixedTypographySetting;
    label3: IFixedTypographySetting;
  };
}

export type Spacing = {
  [key: string]: {
    [key: string]: number;
  };
};

export type SpacingKey =
  | 'macro1'
  | 'macro2'
  | 'macro3'
  | 'micro1'
  | 'micro2'
  | 'micro3'
  | 'micro4'
  | 'micro5'
  | '-macro1'
  | '-macro2'
  | '-macro3'
  | '-micro1'
  | '-micro2'
  | '-micro3'
  | '-micro4'
  | '-micro5';

type BasicString = { [key: string]: string };
type KeyedBasicString = {
  [key: string]: BasicString;
};

export type Color = BasicString | KeyedBasicString;
export interface ITheme {
  button: IButtonSettings;
  colors?: any;
  grid: IGridSettings;
  spacing: Spacing;
  typography: ITypographySettings;
}
