import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { load } from 'js-yaml';

import type { CustomIcon, Icon } from '@/frontend/support/types/icons';

const duplicateRefs: Record<string, true> = {};

const brandIcons: Partial<Icon>[] = [];
const solidIcons: Partial<Icon>[] = [];

let customIcons: CustomIcon[] = [];

/**
 * Checks if the given `refName` exists already in the `list`.
 *
 * @param list icons list
 * @param refName name of the icon reference
 */
function hasDuplicateIcon(list: Icon[], refName: string): boolean {
  return list.filter((icon) => icon.refName === refName).length >= 1;
}

/**
 * Substitute the reference name of the icon with a deduped version so icons across categories
 * can be imported at the same time.
 *
 * @param icon said icon to check
 * @param forImport ES6 import statement?
 */
function substituteIconRefName(icon: Icon, forImport: boolean): string {
  if (duplicateRefs[icon.refName]) {
    const substitute = `${icon.refName}${icon.suffix}`;

    return forImport ? `${icon.refName} as ${substitute}` : substitute;
  }

  return icon.refName;
}

/**
 * Generates the correct list of icons for the given `forImport` context.
 *
 * @param icons list of icons
 * @param forImport ES6 import statement?
 */
function generateIconsList(icons: Icon[], forImport = false): string {
  return icons
    .map((icon) => substituteIconRefName(icon, forImport))
    .sort()
    .join(', ');
}

/**
 * Import SVGs from the file system and generate Font Awesome definitions for each of them.
 *
 * @return custom Font Awesome definitions
 */
function generateCustomIcons() {
  return customIcons.map((icon) => {
    const { class: iconName, path, prefix, size } = icon;

    const iconFilePath = resolve(process.cwd(), 'src', `${path}.svg`);
    const vectorContents = readFileSync(iconFilePath, 'utf-8').toString();
    const vectorPaths = vectorContents.match(/d="([^"]*)"/g);

    if (!vectorPaths) {
      return;
    }

    const trimmedVectorPath = vectorPaths[0].substr(3, vectorPaths[0].length - 4);

    return {
      prefix,
      iconName,

      icon: [size, size, [], null, trimmedVectorPath],
    };
  });
}

/**
 * Build the icon lists from the pre-defined icons YAML configuration.
 *
 * @param configFileName configuration file name for the icons
 * @throws {Error} when the icons file path is invalid
 */
function buildIcons(configFileName: string) {
  const iconsConfigPath = resolve(process.cwd(), `support/configs/icons/${configFileName}.yml`);

  if (!existsSync(iconsConfigPath)) {
    throw new Error("Icons configuration file doesn't exist!");
  }

  const icons = load(readFileSync(iconsConfigPath, 'utf-8')) as Icon[];
  const fontAwesomeIcons = icons.filter((icon) => !(icon as CustomIcon).path);

  customIcons = (icons as CustomIcon[]).filter((icon) => icon.path);

  for (const icon of fontAwesomeIcons) {
    const iconClass = icon.class
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.substr(1))
      .join('');

    const refName = `fa${iconClass}`;
    const suffix = icon.prefix.charAt(0).toUpperCase() + icon.prefix.substr(1);

    // Check if the reference name already exists
    if (hasDuplicateIcon(solidIcons as Icon[], refName) || hasDuplicateIcon(brandIcons as Icon[], refName)) {
      duplicateRefs[refName] = true;
    }

    // Assign the icon to a specific category based on its prefix
    if (icon.prefix === 'fas') {
      solidIcons.push({ refName, suffix });
    } else if (icon.prefix === 'fab') {
      brandIcons.push({ refName, suffix });
    }
  }
}

/**
 * Save the generated icons file to the given `path`.
 *
 * @param path location to store the generated file
 * @throws {Error} when the path is invalid
 */
function saveIcons(path: string) {
  if (!path) {
    throw new Error(`Unable to save icons as 'path' is invalid: ${path} `);
  }

  const customIconsMap = generateCustomIcons();
  const iconsStubPath = resolve(process.cwd(), 'support/files/stubs/icons.ts.stub');

  const iconsList = [generateIconsList(brandIcons as Icon[]), generateIconsList(solidIcons as Icon[])];

  if (customIconsMap.length) {
    customIconsMap.forEach((icon) => iconsList.push(`${JSON.stringify(icon)} as unknown as IconDefinition`));
  }

  const stubbedOutput = readFileSync(iconsStubPath, 'utf-8')
    .toString()
    .replace('%%brands-import%%', generateIconsList(brandIcons as Icon[], true))
    .replace('%%solid-import%%', generateIconsList(solidIcons as Icon[], true))
    .replace('%%all-icons%%', iconsList.filter((x) => x).join(', '));

  const prettierConfig = JSON.parse(readFileSync(resolve(process.cwd(), '.prettierrc')).toString());
  prettierConfig.parser = 'typescript';

  writeFileSync(path, format(stubbedOutput, prettierConfig));
}

/**
 * Build the icon lists from the pre-defined icons YAML configuration.
 *
 * @param path location to store the generated file
 * @param filename configuration file name for the icons
 * @throws {Error} when the path is invalid
 */
export function buildAndSaveIcons(path: string | null = null, filename: string) {
  if (!path) {
    throw new Error(`Unable to continue as 'path' is invalid: ${path} `);
  }

  buildIcons(filename);
  saveIcons(path);
}
