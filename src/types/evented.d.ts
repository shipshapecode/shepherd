import Tour from "./tour";
import Step from "./step";

declare class Evented {
    on(event: string, handler: Function, ctx: Step | Tour): void;

    once(event: string, handler: Function, ctx: Step | Tour): void;

    off(event: string, handler: Function): boolean | void;

    trigger(event: string): void;
}

export default Evented;