import { Step } from './step';
import { Shepherd, Tour } from './tour';

const isServerSide = typeof window === 'undefined';

class NoOp {
  constructor() {}
}

if (isServerSide) {
  Object.assign(Shepherd, { Tour: NoOp, Step: NoOp });
} else {
  Object.assign(Shepherd, { Tour, Step });
}

export default Shepherd;
