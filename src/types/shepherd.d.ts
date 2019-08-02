import _Evented from './evented';
import _Step from './step';
import _Tour from './tour';

declare class Shepherd extends _Evented {
  activeTour?: _Tour;
}

declare namespace Shepherd {
  export import Step = _Step;
  export import Tour = _Tour;
}

export default Shepherd;

