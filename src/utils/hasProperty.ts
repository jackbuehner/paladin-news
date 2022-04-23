/**
 * Whether a given object has a given property.
 */
function hasProperty<K extends string>(
  toCheck: unknown,
  key: K
): toCheck is { [key in K]: unknown } {
  return toCheck !== undefined && toCheck !== null && typeof toCheck === 'object' && key in toCheck;
}

export { hasProperty };
