import DataSource from '@/generator/structs/datasource/DataSource';

import type { ContainerDataSourceOptions } from '@/generator/support/types/container.datasource';

export const layouts = new DataSource({
  outputPath: 'components/container/dialog',

  items: [
    {
      columns: 2,
      text: 'Standard Two Columns',
      value: 'standard-two-columns',
    },
    {
      columns: 3,
      text: 'Standard Three Columns',
      value: 'standard-three-columns',
    },
    {
      columns: 4,
      text: 'Standard Four Columns',
      value: 'standard-four-columns',

      layout: {
        sm: 2,
        lg: 4,
      },
    },
    {
      columns: 3,
      text: 'Grid Layout',
      value: 'grid',

      layout: {
        lg: {
          layout: {
            0: {
              rowSpan: 3,
            },
            1: {
              columnSpan: 2,
            },
            2: {
              columnSpan: 2,
              rowSpan: 2,
            },
          },
        },
      },
    },
  ],
} as ContainerDataSourceOptions);
