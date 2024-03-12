import { Shepherd, Tour } from './tour';
import { NoOp } from './utils/general';
import { Step } from './step';

const isServerSide = typeof window === 'undefined';

Shepherd.Step = isServerSide ? NoOp : Step;
Shepherd.Tour = isServerSide ? NoOp : Tour;

export default Shepherd;
