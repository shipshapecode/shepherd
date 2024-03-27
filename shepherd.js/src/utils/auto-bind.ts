/**
 * Binds all the methods on a JS Class to the `this` context of the class.
 * Adapted from https://github.com/sindresorhus/auto-bind
 * @param self The `this` context of the class
 * @return The `this` context of the class
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function autoBind(self: any) {
  const keys = Object.getOwnPropertyNames(self.constructor.prototype);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i] as keyof typeof self;
    const val = self[key];
    if (key !== 'constructor' && typeof val === 'function') {
      self[key] = val.bind(self);
    }
  }

  return self;
}
