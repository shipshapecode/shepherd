import Tour from "./tour";
import Evented from "./evented";
import Step from "./step";

declare class Shepherd extends Evented {
    static Tour: Tour;
    static Step: Step;
    static Evented: Evented;
}

export = Shepherd;