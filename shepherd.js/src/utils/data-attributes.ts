/**
 * Represents a single data attribute with an id and value
 */
export interface DataAttribute {
  id: string;
  value: string | number | boolean;
}

/**
 * Converts an array of data attributes to an object of data-* attributes
 * suitable for spreading onto HTML elements.
 * 
 * @param dataAttributes - Array of data attribute objects with id and value
 * @returns Object with data-* attributes as keys
 * 
 * @example
 * ```typescript
 * const attrs = convertDataAttributes([
 *   { id: 'foo', value: 'bar' },
 *   { id: 'count', value: 42 }
 * ]);
 * // Returns: { 'data-foo': 'bar', 'data-count': '42' }
 * ```
 */
export function convertDataAttributes(
  dataAttributes?: DataAttribute[] | null
): Record<string, string> {
  if (!dataAttributes || !Array.isArray(dataAttributes)) {
    return {};
  }

  return dataAttributes.reduce((acc, attr) => {
    if (attr.id) {
      acc[`data-${attr.id}`] = String(attr.value);
    }
    return acc;
  }, {} as Record<string, string>);
}
