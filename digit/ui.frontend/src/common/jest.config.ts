import { resolve } from 'path';
import { pathsToModuleNameMapper } from 'ts-jest';
import { defaults as tsjPreset } from 'ts-jest/presets';

import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

import tsConfig from '../../tsconfig.json';

export default {
  rootDir: resolve(process.cwd(), 'src'),
  testEnvironment: 'jsdom',

  collectCoverageFrom: ['<rootDir>/js/**/*.{ts,tsx}'],

  displayName: {
    color: 'white',
    name: 'ui.frontend.common',
  },

  moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths, {
    prefix: '<rootDir>',
  }),

  transform: {
    ...tsjPreset.transform,
  },
} as InitialOptionsTsJest;
