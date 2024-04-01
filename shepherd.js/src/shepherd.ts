import { Shepherd, Tour } from './tour.ts';
import { StepNoOp, TourNoOp } from './utils/general.ts';
import { Step } from './step.ts';

const isServerSide = typeof window === 'undefined';

Shepherd.Step = isServerSide ? StepNoOp : Step;
Shepherd.Tour = isServerSide ? TourNoOp : Tour;

export default Shepherd;
