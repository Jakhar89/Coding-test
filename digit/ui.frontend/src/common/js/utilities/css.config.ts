const { getPropertyValue } = getComputedStyle(document.documentElement);

const prefix = getPropertyValue('--variable-prefix');

export function getVariablePrefix() {
  return prefix;
}

export function getCssPropertyValue(propertyName: string) {
  return getPropertyValue(`--${prefix}${propertyName}`);
}
