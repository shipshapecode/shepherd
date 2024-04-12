import { mockHttpEvent } from '@redwoodjs/testing/api';

import { handler } from './state';

describe('State function', () => {
  it('Should respond with 200, if OPTIONS', async () => {
    const httpEvent = mockHttpEvent({
      httpMethod: 'OPTIONS',
    });

    const response = await handler(httpEvent, null);

    expect(response.statusCode).toBe(200);
    expect(response.headers['Access-Control-Allow-Origin']).toBe('*');
  });
  it('Should respond with 401 Unauthorized', async () => {
    const httpEvent = mockHttpEvent({
      httpMethod: 'GET',
    });

    const response = await handler(httpEvent, null);

    expect(response.statusCode).toBe(401);
  });

  it('Should respond with 401 Unauthorized, if key does not exist', async () => {
    const httpEvent = mockHttpEvent({
      httpMethod: 'GET',
      headers: {
        Authorization: 'ApiKey shp_notValidKey',
        'Content-Type': 'application/json',
      },
      body: null,
    });

    const response = await handler(httpEvent, null);

    expect(response.statusCode).toBe(401);
  });

  scenario('Has a valid API key and returns account journey data', async () => {
    const httpEvent = mockHttpEvent({
      httpMethod: 'GET',
      headers: {
        Authorization: 'ApiKey shp_12345',
        'Content-Type': 'application/json',
      },
      body: null,
    });

    const response = await handler(httpEvent, null);

    const { data } = JSON.parse(response.body);
    const first = data[0];
    const second = data[1];

    expect(response.statusCode).toBe(200);
    expect(first.isActive).toBeTruthy();
    expect(second.isActive).toBeFalsy();
  });
});
