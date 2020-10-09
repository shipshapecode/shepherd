import _Step from './step';
import _Tour from './tour';

declare namespace Shepherd {
  /**
   * The currently active tour instance
   */
  export const activeTour: _Tour | undefined;
  export import Step = _Step;
  export import Tour = _Tour;
}

export default Shepherd;

