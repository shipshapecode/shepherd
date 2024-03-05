import { isObject, type AnyObject } from './type-check';

export function deepMerge(target: AnyObject, source: AnyObject) {
  const result = { ...target, ...source };
  for (const key of Object.keys(result)) {
    if (isObject(target[key]) && isObject(source[key])) {
      result[key] = deepMerge(target[key] as AnyObject, source[key] as AnyObject);
    } else if (Array.isArray(target[key]) && Array.isArray(source[key])) {
      result[key] = [].concat(
        // @ts-expect-error TODO: TS is being weird about this
        structuredClone(target[key]),
        structuredClone(source[key])
      );
    } else {
      result[key] = structuredClone(result[key]);
    }
  }
  return result;
}
