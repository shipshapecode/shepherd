import Shepherd, { ShepherdBase } from 'shepherd.js';
import type { TourOptions, EventOptions } from 'shepherd.js/tour';

import DataRequest from './DataRequest';
import { getContext } from './utils/context.ts';

interface Actor {
  actorId: number;
}

const SHEPHERD_DEFAULT_API = 'https://shepherdpro.com' as const;
const SHEPHERD_USER_ID = 'shepherdPro:userId' as const;

class ProTour extends Shepherd.Tour {
  public events = ['active', 'cancel', 'complete', 'show'];

  private currentUserId: string | null = null;

  constructor(options?: TourOptions) {
    super(options);

    this.currentUserId = localStorage.getItem(SHEPHERD_USER_ID);

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
            currentUserId: this.currentUserId,
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
    }
  }
}

export class ShepherdPro extends ShepherdBase {
  // Shepherd Pro fields
  apiKey?: string;
  apiPath?: string;
  dataRequester?: DataRequest;
  isProEnabled = false;
  /**
   * Extra properties to pass to Shepherd Pro App
   */
  properties?: { [key: string]: unknown };

  constructor() {
    super();

    this.Tour = ProTour;
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
      this.dataRequester = new DataRequest(
        this.apiKey,
        this.apiPath,
        this.properties
      );

      // Setup actor before first tour is loaded if none exists
      const shepherdProId = localStorage.getItem(SHEPHERD_USER_ID);

      const promises = [this.dataRequester.getTourState()];

      if (!shepherdProId) {
        promises.push(this.createNewActor());
      }

      await Promise.all(promises);
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
}

const ShepherdProInstance = new ShepherdPro();

export default Object.assign(ShepherdProInstance, Shepherd) as ShepherdPro;
