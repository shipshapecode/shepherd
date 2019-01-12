import drop from 'lodash-es/drop';
import isUndefined from 'lodash-es/isUndefined';

export class Evented {
  on(event, handler, ctx) {
    const once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

    if (isUndefined(this.bindings)) {
      this.bindings = {};
    }
    if (isUndefined(this.bindings[event])) {
      this.bindings[event] = [];
    }
    this.bindings[event].push({ handler, ctx, once });
  }

  once(event, handler, ctx) {
    this.on(event, handler, ctx, true);
  }

  off(event, handler) {
    if (isUndefined(this.bindings) || isUndefined(this.bindings[event])) {
      return false;
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
  }

  trigger(event) {
    if (!isUndefined(this.bindings) && this.bindings[event]) {
      const args = drop(arguments);

      this.bindings[event].forEach((binding, index) => {
        const { ctx, handler, once } = binding;

        const context = ctx || this;

        handler.apply(context, args);

        if (once) {
          this.bindings[event].splice(index, 1);
        }
      });
    }
  }

}
