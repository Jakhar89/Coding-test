import type { GeneratorOptions } from '@/generator/structs/Generator';

export interface DataSourceItem {
  text: string;
  value: string;
}

export interface DataSourceOptions extends GeneratorOptions {
  items: DataSourceItem[];
}
