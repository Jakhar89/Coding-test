import { join, sep } from 'path';

import Generator from '@/generator/structs/Generator';

import type { DataSourceItem, DataSourceOptions } from '@/generator/support/types/datasource';

export default class DataSource extends Generator {
  private items!: DataSourceItem[];

  private readonly fileExtension = 'json';

  constructor(options: DataSourceOptions) {
    super(options);

    this.items = options.items;

    this.outputPath = join(
      this.watchMode ? sep : join('ui.apps', 'src', 'main', 'content', 'jcr_root'),
      'apps',
      this.projectDirectory,
      options.outputPath,
    );
  }

  get extension(): string {
    return this.fileExtension;
  }

  getFileContents(): string {
    return JSON.stringify(
      {
        items: this.items,
      },
      null,
      2,
    );
  }
}
