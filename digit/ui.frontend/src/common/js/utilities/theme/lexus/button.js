import colors from './colors';

export default {
  primary: {
    borderRadius: {
      topLeft: 6,
      topRight: 6,
      bottomLeft: 6,
      bottomRight: 6,
    },
    borderStyle: 'solid',
    borderWidth: '2px',
    padding: {
      sm: {
        x: 16,
        y: 8,
      },
      md: {
        x: 20,
        y: 12,
      },
    },
    icon: {
      sm: {
        w: 16,
        h: 16,
      },
      md: {
        w: 16,
        h: 16,
      },
    },
  },
  secondary: {
    borderRadius: {
      topLeft: 6,
      topRight: 6,
      bottomLeft: 6,
      bottomRight: 6,
    },
    borderStyle: 'solid',
    borderWidth: '2px',
    padding: {
      sm: {
        x: 16,
        y: 8,
      },
      md: {
        x: 20,
        y: 12,
      },
    },
    icon: {
      sm: {
        w: 16,
        h: 16,
      },
      md: {
        w: 16,
        h: 16,
      },
    },
  },
  tertiary: {
    borderRadius: {
      topLeft: 0,
      topRight: 0,
      bottomLeft: 0,
      bottomRight: 0,
    },
    borderStyle: 'solid',
    borderWidth: '0 0 2px 0',
    padding: {
      sm: {
        x: 0,
        y: 0,
      },
      md: {
        x: 0,
        y: 0,
      },
    },
    icon: {
      sm: {
        w: 16,
        h: 16,
      },
      md: {
        w: 16,
        h: 16,
      },
    },
  },
  reversed: {
    borderRadius: {
      topLeft: 6,
      topRight: 6,
      bottomLeft: 6,
      bottomRight: 6,
    },
    borderStyle: 'solid',
    borderWidth: '2px',
    padding: {
      sm: {
        x: 16,
        y: 8,
      },
      md: {
        x: 20,
        y: 12,
      },
    },
    icon: {
      sm: {
        w: 16,
        h: 16,
      },
      md: {
        w: 16,
        h: 16,
      },
    },
  },
  colors: {
    primary: {
      background: colors.button.primary['default-1'],
      backgroundActive: null,
      backgroundHover: colors.button.primary['hover-1'],
      borderColor: 'transparent',
      borderActive: null,
      borderHover: null,
      color: colors.button.primary['default-2'],
      colorActive: null,
      colorHover: colors.button.primary['hover-2'],
    },
    primaryDisabled: {
      background: colors.button.primary['disabled-1'],
      backgroundActive: null,
      backgroundHover: colors.button.primary['disabled-1'],
      borderColor: null,
      borderActive: null,
      borderHover: null,
      borderWidth: 0,
      color: colors.button.primary['disabled-2'],
      colorActive: null,
      colorHover: colors.button.primary['disabled-2'],
    },
    reversed: {
      background: 'transparent',
      backgroundActive: null,
      backgroundHover: colors.button.reversed['hover-2'],
      borderColor: colors.button.reversed['default-2'],
      borderActive: null,
      borderHover: colors.button.reversed['hover-2'],
      color: colors.button.reversed['default-3'],
      colorActive: null,
      colorHover: colors.button.reversed['hover-3'],
    },
    reversedDisabled: {
      background: colors.button.reversed['disabled-1'],
      backgroundActive: null,
      backgroundHover: null,
      borderColor: colors.button.reversed['disabled-2'],
      borderActive: null,
      borderHover: colors.button.reversed['disabled-2'],
      color: colors.button.reversed['disabled-3'],
      colorActive: null,
      colorHover: colors.button.reversed['disabled-3'],
    },
    secondary: {
      background: colors.button.secondary['default-1'],
      backgroundActive: null,
      backgroundHover: colors.button.secondary['hover-1'],
      borderColor: colors.button.secondary['default-2'],
      borderActive: null,
      borderHover: colors.button.secondary['hover-1'],
      color: colors.button.secondary['default-2'],
      colorActive: null,
      colorHover: colors.button.secondary['hover-3'],
    },
    secondaryDisabled: {
      background: colors.button.secondary['disabled-1'],
      backgroundActive: null,
      backgroundHover: null,
      borderColor: colors.button.secondary['disabled-2'],
      borderActive: null,
      borderHover: colors.button.secondary['disabled-2'],
      color: colors.button.secondary['disabled-3'],
      colorActive: null,
      colorHover: colors.button.secondary['disabled-3'],
    },
    tertiary: {
      background: 'transparent',
      backgroundActive: null,
      backgroundHover: null,
      borderColor: 'transparent',
      borderActive: null,
      borderHover: colors.button.tertiary['hover-2'],
      color: colors.button.tertiary['default-1'],
      colorActive: null,
      colorHover: colors.button.tertiary['hover-1'],
    },
    tertiaryReversed: {
      background: 'transparent',
      backgroundActive: null,
      backgroundHover: null,
      borderColor: 'transparent',
      borderActive: null,
      borderHover: colors.button.reversed['hover-2'],
      color: null,
      colorActive: null,
      colorHover: null,
    },
  },
};
