import { Step } from './step';
import { Shepherd, Tour } from './tour';
import DataRequest from './utils/datarequest';

interface ActiveTour extends Tour {
  id: string;
}

interface Actor {
  actorId: number;
}

interface EventTrigger {
  tour: ActiveTour;
  step?: Step;
  previous?: Step;
}

const isServerSide = typeof window === 'undefined';

class NoOp {
  constructor() {}
}

class ShepherdPro {
  public apiKey: string | undefined;
  public apiPath: string | undefined;
  public activeTour: Tour | undefined;
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
    })) as unknown as Actor;

    localStorage.setItem('shepherdPro:userId', String(response.actorId));
  }

  public Tour = isServerSide ? NoOp : Tour;
  public Step = isServerSide ? NoOp : Step;
}

const ShepherdProInstance = new ShepherdPro();

export default Object.assign(Shepherd, ShepherdProInstance) as ShepherdPro;
