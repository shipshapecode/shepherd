function isRecord(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== 'object') return false;
  const proto = Object.getPrototypeOf(value);
  // The second check accepts plain objects from another realm, such as an iframe.
  return !proto || !Object.getPrototypeOf(proto);
}

/**
 * Merges `floatingUIOptions`. Records merge recursively, arrays concatenate,
 * `undefined` never overrides a value, and anything else takes the last value.
 *
 * @param base The lower priority value
 * @param override The higher priority value
 * @return A new value, sharing any nested value only one side defined
 */
export function merge<T>(base: T, override: T): T {
  if (override === undefined) return base;
  if (Array.isArray(base) && Array.isArray(override)) {
    return [...base, ...override] as T;
  }
  if (!isRecord(base) || !isRecord(override)) return override;

  // Spreading first makes any `__proto__` key an own property, so the
  // assignment below writes to that property rather than the prototype.
  const merged: Record<string, unknown> = { ...base, ...override };
  for (const key of Object.keys(override)) {
    if (Object.prototype.hasOwnProperty.call(base, key)) {
      merged[key] = merge(base[key], override[key]);
    }
  }
  return merged as T;
}
