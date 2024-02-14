const path = require('path');
const tsconfigPaths = require('vite-tsconfig-paths').default;
const { loadConfigFromFile, mergeConfig } = require('vite');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-queryparams',
  ],
  framework: '@storybook/react',
  core: { builder: '@storybook/builder-vite' },
  typescript: {
    reactDocgen: false,
  },
  /**
   * A option exposed by storybook-builder-vite for customising the Vite config.
   * @see https://github.com/eirslett/storybook-builder-vite#customize-vite-config
   * @param {import("vite").UserConfig} config
   * @see https://vitejs.dev/config/
   */
  viteFinal: async (config) => {
    config.plugins.push(
      /** @see https://github.com/aleclarson/vite-tsconfig-paths */
      tsconfigPaths(path.resolve(path.dirname(__dirname), '../tsconfig.json')),
    );

    return config;
  },
};
