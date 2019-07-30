import Tour from "./tour";
import Evented from "./evented";
import Step from "./step";

declare abstract class Shepherd extends Evented {
    static Tour: { new(options?: Tour.TourOptions): Tour };
    static Step: { new(tour: Tour, options: Step.StepOptions): Step };
    static Evented: { new(): Evented };
}

export default Shepherd;