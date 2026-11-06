import { Shepherd, Tour } from './tour.ts';
import { Step } from './step.ts';

const NoOp = class {} as unknown as typeof Tour & typeof Step;
const isServerSide = typeof window === 'undefined';

Shepherd.Step = isServerSide ? NoOp : Step;
Shepherd.Tour = isServerSide ? NoOp : Tour;

export { ShepherdBase } from './tour.ts';
export default Shepherd;
// Reexport types so they can be more easily used.
export type * from './evented.ts';
export type * from './step.ts';
export type * from './tour.ts';
