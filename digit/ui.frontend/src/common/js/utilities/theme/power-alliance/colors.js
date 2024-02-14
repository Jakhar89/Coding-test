import { globalColors } from '../global/colors';

const GRADIENT_BLUE_GREEN = 'linear-gradient(90deg, rgb(0, 188, 231) 0%, rgb(98, 187, 70) 100%)';
const GRADIENT_BLUE_GREEN_TRANSPARENT = 'linear-gradient(90deg, rgba(0, 188, 231, 0) 0%, rgba(98, 187, 70, 0) 100%)';
const GRADIENT_ORANGE = 'linear-gradient(90deg, rgb(228, 86, 36) 0%, rgb(247, 146, 30) 100%)';
const GRADIENT_BORDER = `linear-gradient(#fff, #fff) padding-box, ${GRADIENT_BLUE_GREEN}`;
// TODO - cannot support transparent background so using black - check with designers
const GRADIENT_BORDER_REVERSED = `linear-gradient(#000, #000) padding-box, ${GRADIENT_BLUE_GREEN}`;

export default {
  global: globalColors,
  button: {
    primary: {
      'default-1': GRADIENT_BLUE_GREEN,
      'default-2': '#231F20',
      'hover-1': '#62BB46',
      'hover-2': '#231F20',
      'disabled-1': '#CCCCCC',
      'disabled-2': '#FFFFFF',
    },
    secondary: {
      'default-1': '#FFFFFF00',
      'default-2': GRADIENT_BLUE_GREEN,
      'default-3': '#231F20',
      'hover-1': '#FFFFFF',
      'hover-2': '#62BB46',
      'hover-3': '#231F20',
      'disabled-1': '#FFFFFF00',
      'disabled-2': '#CCCCCC',
      'disabled-3': '#CCCCCC',
      'gradient-border': GRADIENT_BORDER,
    },
    tertiary: {
      'default-1': '#231F20',
      'default-2': GRADIENT_BLUE_GREEN_TRANSPARENT,
      'hover-1': '#231F20',
      'hover-2': GRADIENT_BLUE_GREEN,
      'disabled-1': '#CCCCCC',
      'disabled-2': '#CCCCCC',
    },
    reversed: {
      'default-1': '#231F20',
      'default-2': GRADIENT_BLUE_GREEN,
      'default-3': '#FFFFFF',
      'gradient-border': GRADIENT_BORDER_REVERSED,
      'hover-1': '#FFFFFF',
      'hover-2': '#FFFFFF',
      'hover-3': '#231F20',
      'disabled-1': '#231F2000',
      'disabled-2': '#757575',
      'disabled-3': '#757575',
    },
  },
  text: {
    heading: {
      'dark-1': '#000000',
      'dark-2': '#333333',
      'light-1': '#FFFFFF',
      'light-2': '#62BB46',
    },
    body: {
      'dark-1': '#000000',
      'dark-2': '#757575',
      'light-1': '#FFFFFF',
      'light-2': '#F5F5F5',
    },
  },
  link: {
    'dark-1': '#000000',
    'dark-2': '#62BB46',
    'light-1': '#FFFFFF',
    'light-2': '#62BB46',
  },
  background: {
    'dark-1': '#000000',
    'dark-2': '#333333',
    'light-1': '#FFFFFF',
    'light-2': '#F5F5F5',
  },
  icon: {
    'dark-1': '#231F20',
    'dark-2': '#333333',
    'light-1': '#FFFFFF',
    'light-2': '#62BB46',
  },
  border: {
    'divider-1': GRADIENT_ORANGE,
    'divider-2': GRADIENT_BLUE_GREEN,
    'divider-3': '#62BB46',
    'border-1': '#CCCCCC',
    'border-2': '#231F20',
  },
  forms: {
    'form-1': '#62BB46',
  },
};
