import { isUndefined } from './utils/type-check.ts';

type Bindings = {
  [key: string]: Array<{ handler: () => void; ctx?: unknown; once?: boolean }>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyHandler = (...args: any[]) => void;

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
  off(event: string, handler: AnyHandler) {
    if (isUndefined(this.bindings) || isUndefined(this.bindings[event])) {
      return this;
    }

    if (isUndefined(handler)) {
      delete this.bindings[event];
    } else {
      this.bindings[event]?.forEach((binding, index) => {
        if (binding.handler === handler) {
          this.bindings[event]?.splice(index, 1);
        }
      });
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
    if (!isUndefined(this.bindings) && this.bindings[event]) {
      this.bindings[event]?.forEach((binding, index) => {
        const { ctx, handler, once } = binding;

        const context = ctx || this;

        handler.apply(context, args as []);

        if (once) {
          this.bindings[event]?.splice(index, 1);
        }
      });
    }

    return this;
  }
}
