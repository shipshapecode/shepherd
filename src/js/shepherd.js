import 'es6-symbol/implement';

import { Step } from './step';
import { Shepherd, Tour } from './tour';

Object.assign(Shepherd, { Tour, Step });

export default Shepherd;
