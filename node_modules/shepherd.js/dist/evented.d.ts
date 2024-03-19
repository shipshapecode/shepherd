type Bindings = {
    [key: string]: Array<{
        handler: Function;
        ctx?: unknown;
        once?: boolean;
    }>;
};
export declare class Evented {
    bindings: Bindings;
    on(event: string, handler: Function, ctx?: unknown, once?: boolean): this;
    once(event: string, handler: Function, ctx?: unknown): this;
    off(event: string, handler: Function): this;
    trigger(event: string, ...args: Array<any>): this;
}
export {};
//# sourceMappingURL=evented.d.ts.map