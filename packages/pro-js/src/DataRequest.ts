interface ActorResponse {
  data: Record<string, unknown>;
}

class DataRequest {
  public data: Record<string, unknown>[] | null;
  private apiKey: string;
  private apiPath: string;

  constructor(apiKey: string, apiPath: string) {
    this.apiKey = apiKey;
    this.apiPath = apiPath;
    this.data = null;
  }

  async sendEvents(body: Record<string, unknown>) {
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
        'Error fetching data:' +
          (error instanceof Error ? error.message : 'Unknown error')
      );
    }
  }
}

export default DataRequest;
