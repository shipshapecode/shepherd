import { Evented } from './evented.js';
import { Step } from './step.jsx';
import { Shepherd, Tour } from './tour.js';

Object.assign(Shepherd, { Tour, Step, Evented });

export default Shepherd;
