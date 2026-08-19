import { isUndefined } from './utils/type-check.ts';

export type Bindings = {
  [key: string]: Array<{ handler: () => void; ctx?: unknown; once?: boolean }>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyHandler = (...args: any[]) => void;

export class Evented {
  declare bindings: Bindings;

  /**
   * Adds an event listener for the given event string.
   *
   * @param {string} event
   * @param {Function} handler
   * @param ctx
   * @param {boolean} once
   * @returns
   */
  on(event: string, handler: AnyHandler, ctx?: unknown, once = false) {
    if (isUndefined(this.bindings)) {
      this.bindings = {};
    }
    if (isUndefined(this.bindings[event])) {
      this.bindings[event] = [];
    }
    this.bindings[event]?.push({ handler, ctx, once });

    return this;
  }

  /**
   * Adds an event listener that only fires once for the given event string.
   *
   * @param {string} event
   * @param {Function} handler
   * @param ctx
   * @returns
   */
  once(event: string, handler: AnyHandler, ctx?: unknown) {
    return this.on(event, handler, ctx, true);
  }

  /**
   * Removes an event listener for the given event string.
   *
   * @param {string} event
   * @param {Function} handler
   * @returns
   */
  off(event: string, handler?: AnyHandler) {
    const bindings = this.bindings?.[event];

    if (isUndefined(bindings)) {
      return this;
    }

    if (isUndefined(handler)) {
      delete this.bindings[event];
    } else {
      this.bindings[event] = bindings.filter(
        (binding) => binding.handler !== handler
      );
    }

    return this;
  }

  /**
   * Triggers an event listener for the given event string.
   *
   * @param {string} event
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger(event: string, ...args: any[]) {
    const bindings = this.bindings?.[event];

    if (isUndefined(bindings)) {
      return this;
    }

    // Iterate over a copy, since handlers may add or remove bindings while we
    // are dispatching.
    for (const binding of bindings.slice()) {
      const { ctx, handler, once } = binding;

      const context = ctx || this;

      handler.apply(context, args as []);

      if (once) {
        // Look the binding up by identity rather than by loop index, since
        // indexes shift as bindings are removed.
        const index = this.bindings[event]?.indexOf(binding) ?? -1;

        if (index !== -1) {
          this.bindings[event]?.splice(index, 1);
        }
      }
    }

    return this;
  }
}
