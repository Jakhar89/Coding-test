import watch from 'node-watch';

import Generator from '@/generator/structs/Generator';
import { processCategories } from '@/generator/support/execute';

/**
 * Prevent Node.js from loading a cached version of the given `module`.
 *
 * @author luff
 * @see https://stackoverflow.com/a/16060619
 */
function requireUncached(module: string) {
  delete require.cache[require.resolve(module)];

  // eslint-disable-next-line global-require,import/no-dynamic-require
  return require(module);
}

watch(
  './generators',
  {
    filter: (f) => !/(all|index)\.ts$/.test(f),
    recursive: true,
  },
  (event, filePath) => {
    if (filePath) {
      if (event === 'update') {
        console.log("Got an 'update' event for:", filePath);

        const generators = requireUncached(filePath) as Record<string, Generator>;

        processCategories(generators);
      }

      if (event === 'remove') {
        console.log("Got an 'remove' event for: %s ... [skipping]", filePath);
      }
    }
  },
);
