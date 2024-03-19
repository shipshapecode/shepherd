import { Shepherd, Tour } from './tour.ts';
import { NoOp } from './utils/general.ts';
import { Step } from './step.ts';

const isServerSide = typeof window === 'undefined';

Shepherd.Step = isServerSide ? NoOp : Step;
Shepherd.Tour = isServerSide ? NoOp : Tour;

export default Shepherd;
