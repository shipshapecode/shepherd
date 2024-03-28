interface ActorResponse {
  data: Record<string, unknown>;
}

class DataRequest {
  private apiKey: string;
  private apiPath: string;
  private properties?: { [key: string]: unknown };

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

  async sendEvents(body: Record<string, unknown>) {
    body['properties'] = this.properties;

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
