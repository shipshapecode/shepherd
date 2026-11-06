import { Shepherd, Tour as TourClass } from './tour.ts';
import { Step as StepClass } from './step.ts';

// Server rendering runs module-level tour setup, so every method must exist.
const NoOp = class {
  constructor() {
    const noOp: object = new Proxy(this, {
      get: (_target, key) => (key === 'then' ? undefined : () => noOp)
    });
    return noOp;
  }
} as unknown as typeof TourClass & typeof StepClass;
const isServerSide = typeof window === 'undefined';

/**
 * The `Step` class, also available as `Shepherd.Step`. Steps are usually created
 * through `tour.addStep`.
 */
export const Step: typeof StepClass = isServerSide ? NoOp : StepClass;
/**
 * A step instance.
 */
export type Step = StepClass;

/**
 * The `Tour` class, also available as `Shepherd.Tour`. On the server every
 * method of it does nothing, so tour setup at module scope is safe.
 */
export const Tour: typeof TourClass = isServerSide ? NoOp : TourClass;
/**
 * A tour instance.
 */
export type Tour = TourClass;

Shepherd.Step = Step;
Shepherd.Tour = Tour;

export { ShepherdBase } from './tour.ts';
export default Shepherd;
// Reexport types so they can be more easily used.
export type * from './evented.ts';
export type * from './step.ts';
export type * from './tour.ts';
