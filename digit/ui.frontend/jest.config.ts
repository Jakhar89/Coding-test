import { sync as fgSync } from 'fast-glob';

import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

export default {
  preset: 'ts-jest/presets/js-with-ts-esm',
  verbose: true,

  coveragePathIgnorePatterns: ['**/*.json', '**/*.ts', 'jest.config.ts', '/node_modules/'],

  extensionsToTreatAsEsm: ['.ts'],

  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
      useESM: true,
    },
  },

  projects: [...fgSync('src/**/jest.config.ts')],

  testPathIgnorePatterns: ['tsconfig.json'],
} as InitialOptionsTsJest;
