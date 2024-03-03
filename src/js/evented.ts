// @ts-nocheck
import { isUndefined } from './utils/type-check';

type Bindings = {
  [key: string]: Array<{ handler: Function; ctx?: unknown; once?: boolean }>;
};

export class Evented {
  declare bindings: Bindings;

  on(event: string, handler: Function, ctx?: unknown, once = false) {
    if (isUndefined(this.bindings)) {
      this.bindings = {};
    }
    if (isUndefined(this.bindings[event])) {
      this.bindings[event] = [];
    }
    this.bindings[event].push({ handler, ctx, once });

    return this;
  }

  once(event: string, handler: Function, ctx?: unknown) {
    return this.on(event, handler, ctx, true);
  }

  off(event: string, handler: Function) {
    if (isUndefined(this.bindings) || isUndefined(this.bindings[event])) {
      return this;
    }

    if (isUndefined(handler)) {
      delete this.bindings[event];
    } else {
      this.bindings[event].forEach((binding, index) => {
        if (binding.handler === handler) {
          this.bindings[event].splice(index, 1);
        }
      });
    }

    return this;
  }

  trigger(event: string, ...args: Array<any>) {
    if (!isUndefined(this.bindings) && this.bindings[event]) {
      this.bindings[event].forEach((binding, index) => {
        const { ctx, handler, once } = binding;

        const context = ctx || this;

        handler.apply(context, args);

        if (once) {
          this.bindings[event].splice(index, 1);
        }
      });
    }

    return this;
  }
}
