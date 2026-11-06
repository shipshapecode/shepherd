/**
 * Binds all the methods on a JS Class to the `this` context of the class.
 * Adapted from https://github.com/sindresorhus/auto-bind
 * @param self The `this` context of the class
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function autoBind(self: any) {
  for (const key of Object.getOwnPropertyNames(self.constructor.prototype)) {
    if (key !== 'constructor' && typeof self[key] === 'function') {
      self[key] = self[key].bind(self);
    }
  }
}
