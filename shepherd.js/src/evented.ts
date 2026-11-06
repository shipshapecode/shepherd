import { isUndefined } from './utils/type-check.ts';

/**
 * Registered event handlers, by event name.
 */
export type Bindings = {
  [key: string]: Array<{ handler: () => void; ctx?: unknown; once?: boolean }>;
};

/**
 * An event handler. Its arguments depend on the event.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyHandler = (...args: any[]) => void;

/**
 * The event methods shared by `Shepherd`, `Tour` and `Step`.
 */
export class Evented {
  /**
   * The handlers registered through `on` and `once`.
   */
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
    this.bindings = this.bindings || {};
    (this.bindings[event] = this.bindings[event] || []).push({
      handler,
      ctx,
      once
    });

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

    if (bindings) {
      if (isUndefined(handler)) {
        delete this.bindings[event];
      } else {
        this.bindings[event] = bindings.filter(
          (binding) => binding.handler !== handler
        );
      }
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
    // Iterate over a copy, since handlers may add or remove bindings while we
    // are dispatching.
    for (const binding of this.bindings?.[event]?.slice() || []) {
      binding.handler.apply(binding.ctx || this, args as []);

      if (binding.once) {
        // Match by identity, since the same handler may also be bound normally.
        const remaining = this.bindings[event]?.filter((b) => b !== binding);

        if (remaining) {
          this.bindings[event] = remaining;
        }
      }
    }

    return this;
  }
}
