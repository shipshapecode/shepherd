import { type Mock, afterAll, describe, expect, it, vi } from 'vitest';

import DataRequest from '../src/DataRequest';

global.fetch = vi.fn();

describe('DataRequest', () => {
  const dataRequesterMock = vi
    .spyOn(DataRequest.prototype, 'sendEvents')
    .mockImplementation(() => Promise.resolve({}));

  afterAll(() => {
    dataRequesterMock.mockReset();
  });

  it('exists and creates an instance', () => {
    const requestInstance = new DataRequest(
      'apiKey_12345',
      'https://shepherdpro.com',
      { extra: 'stuff' }
    );

    expect(DataRequest).toBeTruthy();
    expect(requestInstance).toBeInstanceOf(DataRequest);
  });

  it('returns an error if no apiKey is passed', () => {
    expect(() => new DataRequest()).toThrow(
      'Shepherd Pro: Missing required apiKey option.'
    );
  });

  it('returns an error if no apiPath is passed', () => {
    expect(() => new DataRequest('apiKey_12345')).toThrow(
      'Shepherd Pro: Missing required apiPath option.'
    );
  });

  it('can use the dataRequester to getTourState()', async () => {
    const tourData = {
      confirmCancel: false,
      exitOnEsc: true,
      id: 'clxw6cez30005qheo5w7s3gph',
      isActive: true,
      isAutoStart: false,
      keyboardNavigation: true,
      rules: [],
      steps: [],
      uniqueId: 'tour-1',
      useModalOverlay: true
    };
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: () =>
        new Promise((resolve) =>
          resolve({
            data: [tourData]
          })
        )
    });
    const dataRequester = new DataRequest(
      'apiKey_12345',
      'https://shepherdpro.com',
      { extra: 'stuff' }
    );

    expect(typeof dataRequester.getTourState).toBe('function');

    await dataRequester.getTourState();

    expect(
      await dataRequester.tourStateDb?.get('tours', tourData.id)
    ).toMatchObject(tourData);
  });

  it('can use the dataRequester to sendEvents()', async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: () => new Promise((resolve) => resolve({ data: {} }))
    });
    const dataRequester = new DataRequest(
      'apiKey_12345',
      'https://shepherdpro.com',
      { extra: 'stuff' }
    );

    expect(typeof dataRequester.sendEvents).toBe('function');
    expect(dataRequester.getConfig().apiKey).toBe('apiKey_12345');
    expect(dataRequester.getConfig().apiPath).toBe('https://shepherdpro.com');
    expect(dataRequester.getConfig().properties).toMatchObject({
      extra: 'stuff'
    });

    const data = await dataRequester.sendEvents({ data: {} });

    expect(data).toMatchObject({});
  });
});
