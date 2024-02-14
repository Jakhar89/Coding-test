import { mergeConfig, type UserConfigExport } from 'vite';

import { getProjectDirectoryName } from '../../../support/utilities/helpers';

/**
 * Generate the public proxy path for AEM ClientLibs.
 *
 * @return the public path for the ClientLibs
 */
export function getClientLibsPublicPath() {
  return `/etc.clientlibs/${getProjectDirectoryName()}/clientlibs`;
}

/**
 * Retrieve the project name using the given module identifier.
 *
 * @param id module name identifier
 * @return project name
 * @throws when the project name cannot be determined using the identifier
 */
export function getProjectNameFromModuleId(id: string) {
  if (!id.endsWith('.config.ts')) {
    throw new Error(`Unable to determine the module name using the given id: ${id}`);
  }

  return id.substring(id.lastIndexOf('/') + 1).split('.')[0];
}

/**
 * Merge the configurations passed through together.
 *
 * @param baseConfig base vite configuration
 * @param overrides a set of configuration overrides
 * @return a single (merged) configuration object
 */
export function mergeConfigurations(baseConfig: UserConfigExport, overrides: UserConfigExport) {
  return mergeConfig(baseConfig, overrides);
}
