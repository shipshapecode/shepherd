import { Shepherd, Tour as TourClass } from './tour.ts';
import { Step as StepClass } from './step.ts';

const NoOp = class {} as unknown as typeof TourClass & typeof StepClass;
const isServerSide = typeof window === 'undefined';

export const Step: typeof StepClass = isServerSide ? NoOp : StepClass;
export type Step = StepClass;

export const Tour: typeof TourClass = isServerSide ? NoOp : TourClass;
export type Tour = TourClass;

Shepherd.Step = Step;
Shepherd.Tour = Tour;

export { ShepherdBase } from './tour.ts';
export default Shepherd;
// Reexport types so they can be more easily used.
export type * from './evented.ts';
export type * from './step.ts';
export type * from './tour.ts';
