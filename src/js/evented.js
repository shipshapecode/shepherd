export class Evented {
  constructor(/* options = {}*/) {
    // TODO: do we need this empty constructor?
  }

  on(event, handler, ctx) {
    const once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

    if (typeof this.bindings === 'undefined') {
      this.bindings = {};
    }
    if (typeof this.bindings[event] === 'undefined') {
      this.bindings[event] = [];
    }
    this.bindings[event].push({ handler, ctx, once });
  }

  once(event, handler, ctx) {
    this.on(event, handler, ctx, true);
  }

  off(event, handler) {
    if (typeof this.bindings === 'undefined' || typeof this.bindings[event] === 'undefined') {
      return;
    }

    if (typeof handler === 'undefined') {
      delete this.bindings[event];
    } else {
      let i = 0;
      while (i < this.bindings[event].length) {
        if (this.bindings[event][i].handler === handler) {
          this.bindings[event].splice(i, 1);
        } else {
          ++i;
        }
      }
    }
  }

  trigger(event) {
    if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
      const _len = arguments.length;
      const args = Array(_len > 1 ? _len - 1 : 0);
      let i = 0;

      for (let _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      while (i < this.bindings[event].length) {
        const _bindings$event$i = this.bindings[event][i];
        const { ctx, handler, once } = _bindings$event$i;

        let context = ctx;
        if (typeof context === 'undefined') {
          context = this;
        }

        handler.apply(context, args);

        if (once) {
          this.bindings[event].splice(i, 1);
        } else {
          ++i;
        }
      }
    }
  }

}