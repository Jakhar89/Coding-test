import _isObject from 'lodash/isObject';
import Queue from 'queue';

import Generator from '@/generator/structs/Generator';

type GeneratorItems = Record<string, Generator>;

// @ts-expect-error why aren't circular types allowed?
type GeneratorCategories = GeneratorItems | Record<string, GeneratorCategories | GeneratorItems>;

const watchMode = process.env.ENV_WATCH === 'true';

/**
 * Determine if the provided object is a `Generator` type.
 */
function isGenerator(obj: Generator | GeneratorCategories): obj is Generator {
  return (obj as Generator).writeToDisk !== undefined;
}

/**
 * Runs over the provided categories structure and executes each generator.
 */
export function processCategories(categories: GeneratorCategories, q?: Queue, parents: string[] = []) {
  for (const category of Object.keys(categories)) {
    const next = categories[category];

    if (isGenerator(next)) {
      if (watchMode || !q) {
        next
          .writeToDisk({ filename: category })
          .then(console.info)
          .catch((error) => console.error(error.message));
      } else {
        q.push(() => next.writeToDisk({ filename: category }));
      }
    } else {
      processCategories(next, q, [...parents, category]);
    }
  }
}

export default function execute(categories: GeneratorCategories) {
  const startDate = new Date();

  const q = new Queue({
    concurrency: 2000,
    results: [],
  });

  q.on('error', (err, job) => {
    throw new Error(`Error while processing job:\nError: ${err}\n${JSON.stringify(job)}`);
  });

  q.on('success', (message: NodeJS.ErrnoException | string) => {
    if (_isObject(message)) {
      console.error(message.message);
    }
  });

  processCategories(categories, q, []);

  q.start((err) => {
    if (err) {
      throw err;
    }

    console.log('Finished in %d seconds', (new Date().getTime() - startDate.getTime()) / 1000);
    console.log('Total results:', q.results?.length);
  });
}
