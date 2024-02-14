import react from '@vitejs/plugin-react';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

import baseConfig from './base.config';

const config = baseConfig('suzuki', ({ base }) => ({
  build: {
    rollupOptions: {
      input: {
        bundle: 'src/suzuki/js/app.tsx',
        styles: 'src/common/css/styles.css',
      },
    },
  },
  plugins: [react(), typescriptPaths()],
}));

export default config;
