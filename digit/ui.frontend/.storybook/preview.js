import { default as ToyotaTheme } from '../src/common/js/utilities/theme/toyota';
import { default as LexusTheme } from '../src/common/js/utilities/theme/lexus';
import { default as PowerTorqueTheme } from '../src/common/js/utilities/theme/powertorque';
import { default as PowerAllianceTheme } from '../src/common/js/utilities/theme/power-alliance';
import { default as MazdaTheme } from '../src/common/js/utilities/theme/mazda';
import { default as HinoTheme } from '../src/common/js/utilities/theme/hino';
import { default as SuzukiTheme } from '../src/common/js/utilities/theme/suzuki';

const customViewports = {
  xs: {
    name: 'XS',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
  sm: {
    name: 'SM',
    styles: {
      width: '576px',
      height: '667px',
    },
  },
  md: {
    name: 'MD',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  lg: {
    name: 'LG',
    styles: {
      width: '992px',
      height: '1440px',
    },
  },
  xl: {
    name: 'XL',
    styles: {
      width: '1200px',
      height: '1440px',
    },
  },
  xlfigma: {
    name: 'XL (Figma 1440)',
    styles: {
      width: '1440px',
      height: '2000px',
    },
  },
};

export const THEMES = {
  Hino: HinoTheme,
  Lexus: LexusTheme,
  Mazda: MazdaTheme,
  'Power-Alliance': PowerAllianceTheme,
  PowerTorque: PowerTorqueTheme,
  Toyota: ToyotaTheme,
  Suzuki: SuzukiTheme
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  viewport: { viewports: customViewports },
};

export const globalTypes = {
  site: {
    name: 'Site',
    description: 'Toggle between sites',
    defaultValue: 'Toyota',
    toolbar: {
      icon: 'globe',
      items: Object.keys(THEMES),
    },
  },
};
