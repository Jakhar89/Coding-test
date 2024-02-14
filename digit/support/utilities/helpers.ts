import { readFileSync } from 'fs';
import { resolve } from 'path';

import * as xml2js from 'xml2js';

import { config } from './environment';

const pomConfig = readFileSync(resolve(__dirname, '../../pom.xml'), 'utf-8');

let projectDirectory = '';

// @ts-expect-error 'expected because there is no way to type this'
new xml2js.Parser().parseString(pomConfig, (_, { project }) => {
  [projectDirectory] = project.properties[0]['project.directory.apps'];
});

/**
 * Get the project directory name.
 */
export function getProjectDirectoryName() {
  return projectDirectory;
}

/**
 * Adds padding to the given `text` using the provided `padLength`.
 *
 * @param text input text to add padding to
 * @param padLength length of the padding
 * @return original text with padding
 */
export function padText(text: string, padLength = 3) {
  if (config.maven) {
    return text;
  }

  let formattedText = text;

  const padding = ' '.repeat(padLength);

  formattedText = `${padding}${formattedText}${padding}`;

  const line = ' '.repeat(formattedText.length);

  return `${line}\n${formattedText}\n${line}`;
}
