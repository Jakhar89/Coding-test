import { spawn } from 'child_process';
import { writeFile } from 'fs';
import { dirname, join } from 'path';

import mkdirp from 'mkdirp';

import { getProjectDirectoryName } from '@/base/utility/helpers';

export interface GeneratorOptions {
  /**
   * Final output location of the generated content.
   */
  outputPath: string;
}

export interface GeneratorWriteOptions {
  filename: string;
  holdCommit?: boolean;
}

export default class Generator {
  protected outputPath!: string;

  protected projectDirectory!: string;

  protected watchMode!: boolean;

  protected workingDirectory!: string;

  constructor(options: GeneratorOptions) {
    this.outputPath = options.outputPath;
    this.projectDirectory = getProjectDirectoryName();
    this.watchMode = process.env.ENV_WATCH === 'true';
    this.workingDirectory = process.cwd();
  }

  get extension(): string {
    let filename = module.parent?.filename;
    filename = filename?.substring(filename?.lastIndexOf('/') + 1);

    throw new Error(`Base extension method has not being overidden for: ${filename}`);
  }

  getFileName(filename: string): string {
    return filename;
  }

  getFolderName(filename: string): string {
    return '';
  }

  getSaveToPath(filename: string, withFilename = true): string {
    const watchModePath = !withFilename ? join('sync', 'jcr_root') : 'jcr_root';

    const basePath = join(
      this.watchMode ? watchModePath : join(this.workingDirectory, '..'),
      this.outputPath,
      this.getFolderName(filename),
    );

    if (!withFilename) {
      return basePath;
    }

    return join(basePath, `${this.getFileName(filename)}.${this.extension}`);
  }

  async writeToDisk(options: GeneratorWriteOptions): Promise<NodeJS.ErrnoException | string[] | string> {
    await mkdirp(this.getSaveToPath(options.filename, false));

    return new Promise((resolve, reject) => {
      const filePath = this.getSaveToPath(options.filename);

      writeFile(
        join(this.watchMode ? this.workingDirectory : '', this.watchMode ? 'sync' : '', filePath),
        this.getFileContents(options),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(`...${options.filename}.${this.extension} has been written!`);

            if (this.watchMode && options.holdCommit !== true) {
              Generator.runVltCommand(
                'vlt:add',
                dirname(filePath),
                `successfully added '${filePath}' to VLT source control!`,
              );

              Generator.runVltCommand(
                'vlt:commit',
                dirname(filePath),
                `successfully committed '${filePath}' to AEM!\n\n`,
              );
            }
          }
        },
      );
    });
  }

  getFileContents(options: GeneratorWriteOptions): string {
    let filename = module.parent?.filename;
    filename = filename?.substring(filename?.lastIndexOf('/') + 1);

    throw new Error(`Base extension method has not being overridden for: ${filename}`);
  }

  static runVltCommand(command: string, filePath: string, successMessage: string): void {
    const commit = spawn('yarn', [command, filePath.replace(/^jcr_root\//, '')], {
      cwd: process.cwd(),
    });

    commit.stdout.on('end', () => console.log(successMessage));

    commit.stderr.on('data', (m) => {
      if (!m.includes('integer expression expected')) {
        console.error('Unexpected VLT error has occurred!\n', m.toString());
      }
    });
  }
}
