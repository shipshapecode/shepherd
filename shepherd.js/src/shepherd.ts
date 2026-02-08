import { Shepherd, Tour } from './tour.ts';
import { StepNoOp, TourNoOp } from './utils/general.ts';
import { Step } from './step.ts';

const isServerSide = typeof window === 'undefined';

Shepherd.Step = (isServerSide ? StepNoOp : Step) as unknown as typeof Step;
Shepherd.Tour = (isServerSide ? TourNoOp : Tour) as unknown as typeof Tour;

export { ShepherdBase } from './tour.ts';
export default Shepherd;
// Reexport types so they can be more easily used.
export type * from './evented.ts';
export type * from './step.ts';
export type * from './tour.ts';
