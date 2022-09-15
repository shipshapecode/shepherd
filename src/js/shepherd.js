import { Step } from './step.js';
import { Shepherd, Tour } from './tour.js';

const isServerSide = typeof window === 'undefined';
const noop = () => undefined;

if (isServerSide) {
  Object.assign(Shepherd, { Tour: noop });
} else {
  Object.assign(Shepherd, { Tour, Step });
}

export default Shepherd;
