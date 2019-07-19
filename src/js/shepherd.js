import '../scss/shepherd-theme-default.scss';

import { Evented } from './evented.js';
import { Step } from './step.js';
import { Shepherd, Tour } from './tour.js';

Object.assign(Shepherd, { Tour, Step, Evented });

export default Shepherd;
