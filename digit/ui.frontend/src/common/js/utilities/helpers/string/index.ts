import { values } from 'lodash';

export const toTitleCase = (str: string) => {
  if (!str) return '';

  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const toSentenceCase = (str?: string) => {
  if (!str) return '';

  return [str?.slice(0, 1).toUpperCase(), str?.slice(1)].join('');
};

export const ommitSpaceInput = (value: string) => {
  return value.replace(/\s+/g, '');
};

export const acceptNumberInputOnly = (value: string) => {
  return value.replace(/[^\d]/g, '');
};

export const convertObjectValuesToLowercase = (obj: object) =>
  values(obj).map((v: string | undefined) => v?.toLowerCase());

type FromAPItoAPI = 'fromAPI' | 'toAPI';

export const convertYesNotoYN = (str: string, method: FromAPItoAPI = 'fromAPI') => {
  if (method === 'fromAPI') {
    return str?.toLocaleLowerCase() === 'y' ? 'Yes' : 'No';
  }
  if (method === 'toAPI') {
    return str?.toLocaleLowerCase() === 'yes' ? 'Y' : 'N';
  }
};

/**
 * Removes anything between Angled brackets
 * <ABCde123>  to ' ' | empty space
 * Empty space needs to be there as it removes spaces before and after brackets
 * */
export const replaceAuthoredBrackets = (str: string, replacement?: string): string =>
  str.replace(/(\s+<.*?\>+\s+)/g, replacement ? replacement : ' ');

/**Select any special characters and between text
 * <ABC> or  {abc} or [abc]
 * Replace with given text or space
 * Note : No white space will be affected
 */
export const dynamicContent = (str: string, replacement: any): string => {
  let i = 0;
  return str.replace(/([^\s\w+]+\w*[^\s\w+]+)/g, () => (replacement ? replacement : `$${++i}`));
};

// Format number to AUD Currency
export const currencyFormatter = (aud: number) => {
  if (isNaN(aud)) return '';

  const formatter = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  });
  return formatter.format(aud);
};

// convenience method for dangerouslySetInnerHTML
// provides no sanitation - don't use for user generated content
export const decodeHTML = (html: string | undefined) => {
  if (!html) return;
  var e = document.createElement('textarea');
  e.innerHTML = html;
  return e?.value;
};

export const capitalizeFirstLetter = (string: string | undefined) => {
  if (!string) return '';
  return string.charAt(0)?.toUpperCase() + string.toLowerCase()?.slice(1);
};
