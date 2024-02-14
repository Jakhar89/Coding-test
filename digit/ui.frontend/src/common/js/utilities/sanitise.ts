/**
 * Sanitize and encode all HTML in a user-submitted string.
 *
 * @copyright Chris Ferdinandi
 * @license MIT
 * @external https://gomakethings.com
 * @param input The user-submitted string
 */
export function sanitiseHTML(input: string): string {
  const temp = document.createElement('div');
  temp.textContent = input;

  return temp.innerHTML;
}
