import { faker } from '@faker-js/faker';

import { mockHttpEvent } from '@redwoodjs/testing/api';

import { handler } from './actor';

describe('Actor function', () => {
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
      httpMethod: 'POST',
    });

    const response = await handler(httpEvent, null);

    expect(response.statusCode).toBe(401);
  });

  it('Should respond with 401 Unauthorized, if key does not exist', async () => {
    const httpEvent = mockHttpEvent({
      httpMethod: 'POST',
      headers: {
        Authorization: 'ApiKey shp_notValidKey',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          eventType: 'setup',
          currentUserId: null,
        },
      }),
    });

    const response = await handler(httpEvent, null);

    expect(response.statusCode).toBe(401);
  });

  scenario(
    'Has a valid API key, but user is not identified, create a new actor so we can track the user journey',
    async (scenario) => {
      const httpEvent = mockHttpEvent({
        httpMethod: 'POST',
        headers: {
          Authorization: 'ApiKey shp_1234',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            eventType: 'setup',
            currentUserId: null,
          },
        }),
      });

      const response = await handler(httpEvent, null);

      const { data } = JSON.parse(response.body);

      expect(response.statusCode).toBe(201);
      expect(data.accountId).toBe(scenario.account.default.id);
      expect(data.actorId).toBeDefined();
    }
  );

  scenario('Has a valid API key and user is defined', async (scenario) => {
    const httpEvent = mockHttpEvent({
      httpMethod: 'POST',
      headers: {
        Authorization: 'ApiKey shp_12345',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          eventType: 'active',
          currentUserId: scenario.actor.default.id,
          journeyData: {
            id: faker.string.uuid(),
            currentStep: 1,
            numberOfSteps: 5,
            tourOptions: {
              tourName: faker.commerce.productName(),
            },
          },
        },
      }),
    });

    const response = await handler(httpEvent, null);

    const { data } = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(data).toBe('Shepherd event captured');
  });
});
