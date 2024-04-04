import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

interface ActorResponse {
  data: Record<string, unknown>;
}

interface TourStateDb extends DBSchema {
  tours: {
    key: string;
    value: { isActive: boolean; uniqueId: string };
  };
}

class DataRequest {
  private apiKey: string;
  private apiPath: string;
  private properties?: { [key: string]: unknown };
  tourStateDb?: IDBPDatabase<TourStateDb>;

  constructor(
    apiKey?: string,
    apiPath?: string,
    properties?: { [key: string]: unknown }
  ) {
    if (!apiKey) {
      throw new Error('Shepherd Pro: Missing required apiKey option.');
    }
    if (!apiPath) {
      throw new Error('Shepherd Pro: Missing required apiPath option.');
    }

    this.apiKey = apiKey;
    this.apiPath = apiPath;
    this.properties = properties;
  }

  /**
   * Gets a list of the state for all the tours associated with a given apiKey
   */
  async getTourState() {
    try {
      const response = await fetch(`${this.apiPath}/api/v1/state`, {
        headers: {
          Authorization: `ApiKey ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('Could not fetch state for tours 🐑');
      }

      const { data } = await response.json();

      this.tourStateDb = await openDB<TourStateDb>('TourState', 1, {
        upgrade(db) {
          db.createObjectStore('tours', {
            keyPath: 'uniqueId'
          });
        }
      });

      if (Array.isArray(data) && data.length) {
        const tx = this.tourStateDb.transaction('tours', 'readwrite');
        const tourAddTxs = data.map((tourState) => {
          return tx.store.put(tourState);
        });

        await Promise.all([...tourAddTxs, tx.done]);
      }
    } catch (error) {
      throw new Error(
        'Error fetching data: ' +
          (error instanceof Error ? error.message : 'Unknown error')
      );
    }
  }

  /**
   * Send events to the ShepherdPro API
   * @param body The data to send for the event
   */
  async sendEvents(body: { data: Record<string, unknown> }) {
    body.data['properties'] = this.properties;

    try {
      const response = await fetch(`${this.apiPath}/api/v1/actor`, {
        headers: {
          Authorization: `ApiKey ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error('Could not create an event 🐑');
      }
      const { data } = (await response.json()) as ActorResponse;

      return data;
    } catch (error) {
      throw new Error(
        'Error fetching data: ' +
          (error instanceof Error ? error.message : 'Unknown error')
      );
    }
  }
}

export default DataRequest;
