import react from '@vitejs/plugin-react';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

import baseConfig from './base.config';

const config = baseConfig('lexus', ({ base }) => ({
  build: {
    rollupOptions: {
      input: {
        bundle: 'src/lexus/js/app.tsx',
        styles: 'src/common/css/styles.css',
      },
    },
  },
  plugins: [react(), typescriptPaths()],
}));

export default config;
