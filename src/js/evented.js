import _ from 'lodash';

export class Evented {
  on(event, handler, ctx) {
    const once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

    if (_.isUndefined(this.bindings)) {
      this.bindings = {};
    }
    if (_.isUndefined(this.bindings[event])) {
      this.bindings[event] = [];
    }
    this.bindings[event].push({ handler, ctx, once });
  }

  once(event, handler, ctx) {
    this.on(event, handler, ctx, true);
  }

  off(event, handler) {
    if (_.isUndefined(this.bindings) || _.isUndefined(this.bindings[event])) {
      return false;
    }

    if (_.isUndefined(handler)) {
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
    if (!_.isUndefined(this.bindings) && this.bindings[event]) {
      const _len = arguments.length;
      const args = Array(_len > 1 ? _len - 1 : 0);

      for (let _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

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
