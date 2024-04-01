import { Shepherd, Tour } from './tour.ts';
import { StepNoOp, TourNoOp } from './utils/general.ts';
import { Step } from './step.ts';

const isServerSide = typeof window === 'undefined';

Shepherd.Step = (isServerSide ? StepNoOp : Step) as unknown as typeof Step;
Shepherd.Tour = (isServerSide ? TourNoOp : Tour) as unknown as typeof Tour;

export default Shepherd;
