import defaultSteps from './default-steps';

/**
 * Setup a tour
 * @param {Shepherd} Shepherd The Shepherd instance
 * @param {Object} globalDefaults A hash of the `defaultStepOptions`
 * @param {function} customSteps An array of the steps to add to the tour
 * @param {Object} otherOptions A hash of other options to pass to Shepherd
 */
export default function (Shepherd, globalDefaults, customSteps, otherOptions) {
  const defaultStepOptions = Object.assign(
    {},
    {
      cancelIcon: {
        enabled: true
      }
    },
    globalDefaults
  );

  const shepherdOptions = Object.assign(
    {},
    {
      defaultStepOptions,
    },
    otherOptions
  );

  const shepherd = new Shepherd.Tour(shepherdOptions);

  const steps =
    typeof customSteps === 'function'
      ? customSteps(shepherd)
      : defaultSteps(shepherd);

  shepherd.addSteps(steps);

  return shepherd;
}
