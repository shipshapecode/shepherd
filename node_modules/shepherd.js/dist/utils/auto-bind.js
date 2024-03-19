/*! shepherd.js 12.0.0-alpha.3 */

/**
 * Binds all the methods on a JS Class to the `this` context of the class.
 * Adapted from https://github.com/sindresorhus/auto-bind
 * @param self The `this` context of the class
 * @return The `this` context of the class
 */
function autoBind(self) {
    const keys = Object.getOwnPropertyNames(self.constructor.prototype);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const val = self[key];
        if (key !== 'constructor' && typeof val === 'function') {
            self[key] = val.bind(self);
        }
    }
    return self;
}

export { autoBind as default };
//# sourceMappingURL=auto-bind.js.map
