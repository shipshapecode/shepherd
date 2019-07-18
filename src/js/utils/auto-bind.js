/**
 * Binds all the methods on a JS Class to the `this` context of the class.
 * Adapted from https://github.com/sindresorhus/auto-bind
 * @param {object} self The `this` context of the class
 * @return {object} The `this` context of the class
 */
export default function autoBind(self) {
  for (const [object, key] of getAllProperties(self.constructor.prototype)) {
    if (key === 'constructor') {
      continue;
    }

    const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
    if (descriptor && typeof descriptor.value === 'function') {
      self[key] = self[key].bind(self);
    }
  }

  return self;
}

/**
 * Gets all non-builtin properties up the prototype chain
 * @param {object} object The object to get all the properties from
 * @return {Set<any>}
 */
function getAllProperties(object) {
  const props = new Set();

  do {
    for (const key of Reflect.ownKeys(object)) {
      props.add([object, key]);
    }
  } while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);

  return props;
}
