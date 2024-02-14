import { bundlesImportRewriter } from '@aem-vite/import-rewriter';
import { viteForAem } from '@aem-vite/vite-aem-plugin';

import { defineConfig, type ConfigEnv, type UserConfig, type UserConfigExport } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslintPlugin from '@nabla/vite-plugin-eslint';

import * as environment from '../../utilities/environment';
import { getClientLibsPublicPath, mergeConfigurations } from '../../utilities/helpers';

export default (project: string, config: (config: ConfigEnv & { origin: string; base: string }) => UserConfig) =>
  defineConfig(({ command, mode }) => {
    const origin =
      command === 'serve' ? `http://${environment.config.devServerHost}:${environment.config.devServerPort}` : '/';

    const base = command === 'build' ? `${getClientLibsPublicPath()}/` : '/';
    const baseOutputPath = `clientlib-${project}/resources`;
    const entryAliases: string[] = [];
    const projectConfig = config({ base, command, mode, origin });

    for (const key of Object.keys(projectConfig.build?.rollupOptions?.input ?? {})) {
      entryAliases.push(key);
    }

    const baseConfig: UserConfigExport = {
      base,
      publicDir: command === 'build' ? false : 'src/assets',

      build: {
        assetsDir: `${baseOutputPath}/static`,
        brotliSize: false,
        emptyOutDir: !environment.config.maven,
        manifest: false,
        minify: mode === 'development' ? false : 'terser',
        outDir: environment.paths.output,
        sourcemap: mode === 'development' || command === 'serve' ? 'inline' : false,

        rollupOptions: {
          output: {
            assetFileNames(chunk) {
              if (chunk.name?.endsWith('.css')) {
                const isEntryChunk = entryAliases.find((alias) => chunk.name?.endsWith(`${alias}.css`));

                return `${baseOutputPath}/css/[name]${
                  mode === 'production' && !isEntryChunk ? '.[hash]' : ''
                }[extname]`;
              }

              return `${baseOutputPath}/static/[name]${mode === 'production' ? '.[hash]' : ''}[extname]`;
            },

            // If there is a cache on vendor JS, 
            // and, even after the new hash value is not getting generated on new/next build,
            // Please add some ramdom value at the end of hash, 
            // as it's a HACK for temporary solution to unblock the QA/user
            // Please find example below, xxx can be any value
            // [name].[hash].js ----> [name].[hash]xxx.js
            chunkFileNames: `${baseOutputPath}/js/chunks/[name].[hash].js`,
            entryFileNames: `${baseOutputPath}/js/[name].js`,
          },
        },

        terserOptions: {
          compress: {
            defaults: false,
            drop_console: true,
          },

          mangle: {
            eval: true,
            module: true,
            toplevel: true,
            safari10: true,
            properties: false,
          },

          format: {
            comments: false,
            ecma: 2019,
          },
        },
      },

      plugins: [
        eslintPlugin(),
        tsconfigPaths(),

        // @ts-ignore
        viteForAem({
          contentPaths: ['sscp'],
          publicPath: `${getClientLibsPublicPath()}/clientlib-${project}`,

          aem: {
            host: environment.aem.hostname,
            port: environment.aem.port,
          },
        }),

        // @ts-ignore
        bundlesImportRewriter({
          minify: environment.aem.useCaching,
          publicPath: `${getClientLibsPublicPath()}/clientlib-${project}`,
          resourcesPath: 'resources/js',
          caching: {
            enabled: command === 'build' && mode === 'production' && environment.aem.useCaching,
          },
        }),
      ],

      server: {
        host: environment.config.devServerHost,
        port: environment.config.devServerPort,
      },
    };

    return mergeConfigurations(baseConfig, projectConfig);
  });
