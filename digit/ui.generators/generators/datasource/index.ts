import execute from '@/generator/support/execute';

import * as components from './components';

export { components };

if (!module.parent) {
  execute({
    datasource: {
      components,
    },
  });
}
