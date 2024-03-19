declare class DataRequest {
    private apiKey;
    private apiPath;
    constructor(apiKey?: string, apiPath?: string);
    sendEvents(body: Record<string, unknown>): Promise<Record<string, unknown>>;
}
export default DataRequest;
//# sourceMappingURL=datarequest.d.ts.map