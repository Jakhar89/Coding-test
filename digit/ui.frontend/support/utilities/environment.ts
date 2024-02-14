import { resolve } from 'path';

import { config as baseConfig } from '../../../support/utilities/environment';
import { getProjectDirectoryName } from '../../../support/utilities/helpers';

export const aem = {
  /**
   * AEM hostname to use.
   */
  hostname: process.env.AEM_HOSTNAME || 'localhost',

  /**
   * AEM port to use.
   */
  port: process.env.AEM_PORT ? parseInt(process.env.AEM_PORT, 10) : 4502,

  /**
   * The HTTP scheme to use.
   */
  scheme: process.env.AEM_SCHEME || 'http',

  /**
   * Is AEM caching been used for this particular build?
   */
  useCaching: (process.env.AEM_CACHING && process.env.AEM_CACHING === 'true') || false,
};

export const config = {
  ...baseConfig,

  /**
   * Should the DevServer be enabled?
   */
  devServer: !!process.env.DEV_SERVER,

  /**
   * DevServer host to bind with.
   */
  devServerHost: process.env.DEV_SERVER_HOST || 'localhost',

  /**
   * DevServer port to use.
   */
  devServerPort: (process.env.DEV_SERVER_PORT && parseInt(process.env.DEV_SERVER_PORT, 10)) || 3000,

  /**
   * Which mode to build with: `development`, `production`.
   */
  mode: process.env.NODE_ENV || 'development',
};

export const paths = {
  /**
   * Output folder path to save assets and code.
   */
  output: resolve(process.cwd(), `target/classes/apps/${getProjectDirectoryName()}/clientlibs`),

  /**
   * Path to the `src` folder.
   */
  src: resolve(process.cwd(), 'src'),
};
