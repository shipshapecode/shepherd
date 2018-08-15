import { Evented } from './evented';
import { Step } from './step';
import { Shepherd, Tour } from './tour';

Object.assign(Shepherd, { Tour, Step, Evented });

export default Shepherd;
