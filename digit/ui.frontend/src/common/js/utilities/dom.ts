/**
 * Retrieves the current width of the window.
 */
export function getWindowWidth(): number {
  return window.innerWidth || 0;
}

/**
 * Attempts to find the closest element based on the provided `selector`.
 *
 * @param element target element to test
 * @param selector string to test elements against
 */
export function getClosest(element: Element | null, selector: string): Element | false {
  return (element as HTMLElement).closest(selector) ?? false;
}
