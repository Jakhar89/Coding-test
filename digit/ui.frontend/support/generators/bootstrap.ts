import chalk from 'chalk';
import { readdirSync, existsSync } from 'fs';
import { resolve } from 'path';

import { padText } from '@/support/utility/helpers';

import { buildAndSaveIcons } from '@/frontend/support/generator/icons';
import { getProjectNameFromModuleId } from '@/frontend/support/utility/helpers';

import { type ProjectNeeds } from '@/frontend/support/types/project';

console.log();
console.log(chalk.bgBlue.white.bold(padText('Getting ready to bootstrap things...')));
console.log();

// Try to parse the original command npm stored
const originalCommand = JSON.parse(process.env.npm_config_argv || '{}').original || [];

let projects: string[] | null = null;

if (originalCommand && originalCommand.length) {
  if (originalCommand[0].startsWith('serve:')) {
    projects = [
      getProjectNameFromModuleId(process.env[`npm_package_scripts_${originalCommand[0].replace(/:/g, '_')}`] as string),
    ];
  } else {
    projects = [getProjectNameFromModuleId(originalCommand[originalCommand.length - 1])];
  }
} else {
  console.log(chalk.yellow('No project detected, all projects will be bootstrapped...'));

  const potentionalProjects = readdirSync(resolve(process.cwd(), 'support/configs/vite'));

  projects = potentionalProjects
    .filter((project) => /\.config\.js$/.test(project) && !project.startsWith('base'))
    .map((project) => project.split('.')[0]);
}

console.log(chalk.green('✔ Detected project(s) to use:', chalk.bold(projects.join(', '))));

projects.forEach((project) => {
  console.log();
  console.log(chalk.blueBright(`Looking for needs of ${chalk.bold(project)}...`));

  const needsFilePath = resolve(process.cwd(), `support/configs/needs/${project}.ts`);

  if (existsSync(needsFilePath)) {
    const { default: projectNeeds }: { default: ProjectNeeds } = require(needsFilePath);

    console.log(chalk.cyanBright(`Found some needs.. ${chalk.whiteBright(Object.keys(projectNeeds).join(', '))}`));

    if (
      projectNeeds.icons &&
      typeof projectNeeds.icons.typescript === 'string' &&
      projectNeeds.icons.typescript.length
    ) {
      buildAndSaveIcons(resolve(process.cwd(), 'src', projectNeeds.icons.typescript), project);
      console.log(chalk.white('Generated TypeScript file for icons.'));
    }
  } else {
    console.log(chalk.yellow(`${chalk.bold(project)} doesn't have any needs!`));
  }
});

console.log();
console.log(chalk.greenBright('Bootstrapping is complete!'));
console.log();
