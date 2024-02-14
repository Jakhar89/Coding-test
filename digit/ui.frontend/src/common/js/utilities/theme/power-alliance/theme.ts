import { ITheme } from '../global/definitions';
import { grid } from '../global/grid';
import { spacing } from '../global/spacing';
import button from './button';
import colors from './colors';

const FONT_FAMILY_TEXT = 'Poppins';
const Theme: ITheme = {
  button,
  colors,
  spacing,
  grid,
  typography: {
    headings: {
      H1: {
        fontFamily: FONT_FAMILY_TEXT,
        fontWeight: 700,
        fontSize: {
          lg: 68,
          sm: 48,
          xs: 32,
        },
        lineHeight: {
          lg: '120%',
          sm: '120%',
          xs: '120%',
        },
      },
      H2: {
        fontFamily: FONT_FAMILY_TEXT,
        fontWeight: 700,
        fontSize: {
          lg: 48,
          sm: 40,
          xs: 28,
        },
        lineHeight: {
          lg: '120%',
          sm: '120%',
          xs: '120%',
        },
      },
      H3: {
        fontFamily: FONT_FAMILY_TEXT,
        fontWeight: 700,
        fontSize: {
          lg: 40,
          sm: 32,
          xs: 24,
        },
        lineHeight: {
          lg: '120%',
          sm: '120%',
          xs: '120%',
        },
      },
      H4: {
        fontFamily: FONT_FAMILY_TEXT,
        fontWeight: 700,
        fontSize: {
          lg: 30,
          sm: 26,
          xs: 18,
        },
        lineHeight: {
          lg: '140%',
          sm: '140%',
          xs: '140%',
        },
      },
      H5: {
        fontFamily: FONT_FAMILY_TEXT,
        fontWeight: 700,
        fontSize: {
          lg: 28,
          sm: 24,
          xs: 18,
        },
        lineHeight: {
          lg: '140%',
          sm: '140%',
          xs: '140%',
        },
      },
      H6: {
        fontFamily: FONT_FAMILY_TEXT,
        fontWeight: 700,
        fontSize: {
          lg: 24,
          sm: 20,
          xs: 16,
        },
        lineHeight: {
          lg: '140%',
          sm: '140%',
          xs: '140%',
        },
      },
    },
    text: {
      body0: {
        fontFamily: FONT_FAMILY_TEXT,
        fontWeight: 400,
        fontSize: {
          lg: 28,
          sm: 23,
          xs: 18,
        },
        lineHeight: {
          lg: '140%',
          sm: '140%',
          xs: '140%',
        },
      },
      body1: {
        fontFamily: FONT_FAMILY_TEXT,
        fontWeight: 500,
        fontSize: {
          lg: 20,
          sm: 18,
          xs: 16,
        },
        lineHeight: {
          lg: '140%',
          sm: '140%',
          xs: '140%',
        },
        spacing: {
          lg: 30,
          sm: 27,
          xs: 24,
        },
      },
      body2: {
        fontFamily: FONT_FAMILY_TEXT,
        fontWeight: 500,
        fontSize: {
          lg: 18,
          sm: 16,
          xs: 14,
        },
        lineHeight: {
          lg: '140%',
          sm: '140%',
          xs: '140%',
        },
        spacing: {
          lg: 27,
          sm: 24,
          xs: 21,
        },
      },
      body3: {
        fontFamily: FONT_FAMILY_TEXT,
        fontWeight: 500,
        fontSize: {
          lg: 16,
          sm: 14,
          xs: 12,
        },
        lineHeight: {
          lg: '140%',
          sm: '140%',
          xs: '140%',
        },
      },
      body4: {
        fontFamily: FONT_FAMILY_TEXT,
        fontWeight: 400,
        fontSize: {
          lg: 14,
          sm: 12,
          xs: 10,
        },
        lineHeight: {
          lg: '140%',
          sm: '140%',
          xs: '140%',
        },
        spacing: {
          lg: 21,
          sm: 18,
          xs: 15,
        },
      },
      boldBody0: {
        fontWeight: 700,
      },
      boldBody1: {
        fontWeight: 700,
      },
      boldBody2: {
        fontWeight: 700,
      },
      boldBody3: {
        fontWeight: 700,
      },
      boldBody4: {
        fontWeight: 700,
      },
      fixedBody16: {
        fontSize: 16,
        lineHeight: '140%',
        fontWeight: 500,
        fontFamily: FONT_FAMILY_TEXT,
        spacing: 24,
      },
      fixedBody14: {
        fontSize: 14,
        lineHeight: '140%',
        fontWeight: 500,
        fontFamily: FONT_FAMILY_TEXT,
        spacing: 21,
      },
      fixedBody12: {
        fontSize: 12,
        lineHeight: '140%',
        fontWeight: 500,
        fontFamily: FONT_FAMILY_TEXT,
        spacing: 18,
      },
      fixedBody10: {
        fontSize: 10,
        lineHeight: '140%',
        fontWeight: 400,
        fontFamily: FONT_FAMILY_TEXT,
        spacing: 15,
      },
      fixedBody8: {
        fontSize: 8,
        lineHeight: '140%',
        fontWeight: 400,
        fontFamily: FONT_FAMILY_TEXT,
        spacing: 12,
      },
      boldFixedBody16: {
        fontWeight: 700,
      },
      boldFixedBody14: {
        fontWeight: 700,
      },
      boldFixedBody12: {
        fontWeight: 700,
      },
      boldFixedBody10: {
        fontWeight: 700,
      },
      boldFixedBody8: {
        fontWeight: 700,
      },
      label1: {
        fontSize: 20,
        lineHeight: '140%',
        fontWeight: 600,
        fontFamily: FONT_FAMILY_TEXT,
        spacing: 24,
      },
      label2: {
        fontSize: 18,
        lineHeight: '140%',
        fontWeight: 600,
        fontFamily: FONT_FAMILY_TEXT,
        spacing: 21,
      },
      label3: {
        fontSize: 16,
        lineHeight: '140%',
        fontWeight: 600,
        fontFamily: FONT_FAMILY_TEXT,
        spacing: 18,
      },
    },
  },
};

export const DarkTheme = {
  ...Theme,
};

export default Theme;
