import { defaults as jestDefaults } from 'jest-config';
import { resolve } from 'path';
import { pathsToModuleNameMapper } from 'ts-jest';
import { defaults as tsjPreset } from 'ts-jest/presets';

import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

import tsConfig from '../../tsconfig.json';

export default {
  rootDir: resolve(process.cwd(), 'src', 'toyota'),
  testEnvironment: 'jsdom',

  collectCoverageFrom: ['<rootDir>/js/**/*.{ts,vue}'],

  displayName: {
    color: 'blue',
    name: 'ui.frontend.toyota',
  },

  moduleFileExtensions: [...jestDefaults.moduleFileExtensions, 'tsx'],

  moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths, {
    prefix: '<rootDir>',
  }),

  transform: {
    ...tsjPreset.transform,
  },

  transformIgnorePatterns: ['/node_modules/(?!(vue3-jest)/)'],
} as InitialOptionsTsJest;
