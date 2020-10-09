declare class Evented {
  on(event: string, handler: Function): void;

  once(event: string, handler: Function): void;

  off(event: string, handler: Function): boolean | void;

  trigger(event: string): void;
}

export default Evented;
