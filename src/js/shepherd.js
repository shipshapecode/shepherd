import '../scss/shepherd-theme-dark.scss';
import '../scss/shepherd-theme-default.scss';
import '../scss/shepherd-theme-square.scss';
import '../scss/shepherd-theme-square-dark.scss';

import { Evented } from './evented.js';
import { Step } from './step.js';
import { Shepherd, Tour } from './tour.js';

Object.assign(Shepherd, { Tour, Step, Evented });

export default Shepherd;
