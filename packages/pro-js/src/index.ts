import Shepherd, { ShepherdBase } from 'shepherd.js';
import type {
  Tour as ITour,
  TourOptions,
  EventOptions,
  StepOptions,
  StepOptionsButton
} from 'shepherd.js';

import DataRequest from './DataRequest';
import type { StateResponse, ProStepOptionsButton } from './DataRequest';
import { getContext } from './utils/context.ts';

interface Actor {
  actorId: number;
}

export const SHEPHERD_DEFAULT_API = 'https://shepherdpro.com' as const;
export const SHEPHERD_USER_ID = 'shepherdPro:userId' as const;

class ProTour extends Shepherd.Tour {
  static trackedEvents = ['active', 'cancel', 'complete', 'show'];

  #currentUserId: string | null = null;

  constructor(options?: TourOptions) {
    super(options);

    this.#currentUserId = localStorage.getItem(SHEPHERD_USER_ID);

    const { dataRequester } = ShepherdProInstance;

    if (dataRequester) {
      this.trackedEvents.forEach((event) =>
        this.on(event, (opts: EventOptions) => {
          const { tour } = opts;
          const { id, steps } = tour;
          let position;

          if (event !== 'active') {
            const { step: currentStep } = opts;

            if (currentStep) {
              position =
                steps.findIndex((step) => step.id === currentStep.id) + 1;
            }
          }

          const data = {
            currentUserId: this.#currentUserId,
            eventType: event,
            journeyData: {
              id,
              currentStep: position,
              numberOfSteps: steps.length,
              tourOptions: tour.options
            }
          };
          dataRequester?.sendEvents({ data });
        })
      );

      this.isTourAutoStart(this.options.id as string);
    }
  }

  /**
   * Start the tour, if enabled
   */
  async start() {
    // Check if the tour id is active or not
    if (!(await ShepherdProInstance.isTourEnabled(this.options.id as string))) {
      return;
    }

    ShepherdProInstance.activeTour = this;
    await super.start();
  }

  /**
   * Checks if a given tour's rules are met
   * @param tourId A string denoting the id of the tour
   */
  async isTourAutoStart(tourId: string) {
    const { dataRequester } = ShepherdProInstance;
    if (!dataRequester) return;

    const tourState = await dataRequester.tourStateDb?.get('tours', tourId);

    // result of parsed rules from the application
    if (tourState?.isAutoStart) {
      this.start();
    }
  }
}

export class ShepherdPro extends ShepherdBase {
  apiKey?: string;
  apiPath?: string;
  dataRequester?: DataRequest;
  /**
   * Extra properties to pass to Shepherd Pro App
   */
  properties?: { [key: string]: unknown };

  constructor() {
    super();

    this.Tour = ProTour;
    this.Step = Shepherd.Step;
  }

  /**
   * Call init to take full advantage of ShepherdPro functionality
   * @param {string} apiKey The API key for your ShepherdPro account
   * @param {string} apiPath
   * @param {object} properties Extra properties to be passed to Shepherd Pro
   */
  async init(
    apiKey?: string,
    apiPath?: string,
    properties?: { [key: string]: unknown }
  ) {
    if (!apiKey) {
      throw new Error('Shepherd Pro: Missing required apiKey option.');
    }

    this.apiKey = apiKey;
    this.apiPath = apiPath ?? SHEPHERD_DEFAULT_API;
    this.properties = properties ?? {};
    this.properties['context'] = getContext(window);

    if (this.apiKey) {
      // Setup actor before first tour is loaded if none exists
      const shepherdProId = localStorage.getItem(SHEPHERD_USER_ID);
      this.properties['actorId'] = shepherdProId;
      this.dataRequester = new DataRequest(
        this.apiKey,
        this.apiPath,
        this.properties
      );

      const promises = [this.dataRequester.getTourState()];

      if (!shepherdProId) {
        promises.push(this.createNewActor());
      }

      await Promise.all(promises);

      return this;
    }
  }

  async createNewActor() {
    if (!this.dataRequester) return;

    // Setup type returns an actor
    const response = (await this.dataRequester.sendEvents({
      data: {
        currentUserId: null,
        eventType: 'setup'
      }
    })) as unknown as Actor;

    localStorage.setItem(SHEPHERD_USER_ID, String(response.actorId));
  }

  /**
   * Checks if a given tour's id is enabled
   * @param tourId A string denoting the id of the tour
   */
  async isTourEnabled(tourId: string) {
    if (!this.dataRequester) return;

    const tourState = await this.dataRequester.tourStateDb?.get(
      'tours',
      tourId
    );

    return tourState?.isActive ?? true;
  }

  #makeButton(button: ProStepOptionsButton): StepOptionsButton {
    const {
      classes,
      disabled,
      label,
      secondary,
      text,
      action: actionText
    } = button;
    const builtInButtonTypes = ['back', 'cancel', 'next'];

    if (!actionText || !builtInButtonTypes.includes(actionText)) {
      return button as unknown as StepOptionsButton;
    }

    const action = function () {
      // @ts-ignore
      (this as ITour)[actionText]();
    };

    return {
      action,
      classes,
      disabled,
      label,
      secondary,
      text
    };
  }

  async startJourney(journeyId: string) {
    const journeyData: StateResponse | undefined =
      await this.dataRequester?.tourStateDb?.get('tours', journeyId);

    if (!journeyData) return;

    journeyData.steps.forEach((step) => {
      if (step.buttons) {
        return ((step.buttons as StepOptionsButton[]) = step.buttons.map(
          (button) => {
            return this.#makeButton(button);
          }
        ));
      }

      return step;
    });
    const { id, steps, rules, useModalOverlay, ...defaultStepOptions } =
      journeyData;
    const tourOptions = {
      id,
      defaultStepOptions: {
        scrollTo: {
          behavior: 'smooth',
          block: 'center'
        },
        cancelIcon: {
          enabled: true
        },
        ...defaultStepOptions
      },
      useModalOverlay
    } as TourOptions;

    const journey = new this.Tour(tourOptions);
    // Need to filter out returned null values so that they don't break defaultStepOptions
    const filteredNullValuesFromSteps = (steps: StepOptions[]) =>
      steps.map((obj) =>
        Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null))
      );
    journey.addSteps(filteredNullValuesFromSteps(steps as StepOptions[]));

    await journey.start();

    return Promise.resolve(journey);
  }
}

const ShepherdProInstance = new ShepherdPro();

export default ShepherdProInstance;
