/*! shepherd.js 12.0.0-alpha.3 */

class DataRequest {
    constructor(apiKey, apiPath) {
        if (!apiKey) {
            throw new Error('Shepherd Pro: Missing required apiKey option.');
        }
        if (!apiPath) {
            throw new Error('Shepherd Pro: Missing required apiPath option.');
        }
        this.apiKey = apiKey;
        this.apiPath = apiPath;
    }
    async sendEvents(body) {
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
            const { data } = (await response.json());
            return data;
        }
        catch (error) {
            throw new Error('Error fetching data:' +
                (error instanceof Error ? error.message : 'Unknown error'));
        }
    }
}

export { DataRequest as default };
//# sourceMappingURL=datarequest.js.map
