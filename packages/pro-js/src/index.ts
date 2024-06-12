import Shepherd from 'shepherd.js';
import { Step } from 'shepherd.js/dist/step';
import { Tour } from 'shepherd.js/dist/tour';

import DataRequest from './DataRequest';

import type { Step as IStep } from 'shepherd.js/dist/step';
import type { Tour as ITour, TourOptions } from 'shepherd.js/dist/tour';

interface ActiveTour extends ITour {
  id: string;
}

interface Actor {
  actorId: number;
}

interface EventTrigger {
  tour: ActiveTour;
  step?: IStep;
  previous?: IStep;
}

class ProTour extends Tour {
  public dataRequester;
  public events = ['active', 'cancel', 'complete', 'show'];

  private currentUserId: string | null = null;

  constructor(options?: TourOptions) {
    super(options);

    const { apiKey, apiPath } = ShepherdProInstance;
    // If we have an API key, then setup Pro features
    if (apiKey && apiPath) {
      this.dataRequester = new DataRequest(apiKey, apiPath);

      const shepherdProId = localStorage.getItem('shepherdPro:userId');
      this.currentUserId = shepherdProId;

      this.events.forEach((event) =>
        this.on(event, (opts: EventTrigger) => {
          const { tour } = opts;
          const { id, steps } = tour;

          const data = {
            currentUserId: this.currentUserId,
            eventType: event,
            tour: { id, numberOfSteps: steps.length }
          };
          if (this.dataRequester) this.dataRequester.sendEvents({ data });
        })
      );
    }
  }
}

class ShepherdPro {
  public apiKey: string | undefined;
  public apiPath: string | undefined;
  public activeTour: ITour | undefined;
  public dataRequester: DataRequest | undefined;

  init(apiKey: string, apiPath?: string) {
    if (!apiKey) {
      throw new Error('Shepherd Pro: Missing required apiKey option.');
    }
    this.apiKey = apiKey;
    this.apiPath = apiPath ?? 'https://shepherdpro.com';

    if (this.apiKey) {
      this.dataRequester = new DataRequest(this.apiKey, this.apiPath);
      // Setup actor before first tour is loaded if none exists
      const shepherdProId = localStorage.getItem('shepherdPro:userId');

      if (!shepherdProId) {
        this.createNewActor();
      }
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
    })) as Record<string, Actor>;
    const newUser = response.data;

    localStorage.setItem('shepherdPro:userId', String(newUser.actorId));
  }

  public Tour = ProTour;
  public Step = Step;
}

const ShepherdProInstance = new ShepherdPro();

export default Object.assign(ShepherdProInstance, Shepherd) as ShepherdPro;

// export type { default as Shepherd } from 'shepherd.js';
// export type { default as Step } from 'shepherd.js/step';
// export type { default as Tour } from 'shepherd.js/tour';
