import { mockHttpEvent } from '@redwoodjs/testing/api';

import { handler } from './subscriptions';

describe('subscriptions function', () => {
  // it('Should respond with 200', async () => {
  //   const httpEvent = mockHttpEvent({
  //     queryStringParameters: {
  //       id: '42', // Add parameters here
  //     },
  //   });

  //   const response = await handler(httpEvent, null);
  //   const { data } = JSON.parse(response.body);

  //   expect(response.statusCode).toBe(200);
  //   expect(data).toBe('subscriptions function');
  // });

  it('Should respond with 403 if unrecognized IP missing x-real-ip header', async () => {
    const httpEvent = mockHttpEvent({
      httpMethod: 'GET',
    });

    const response = await handler(httpEvent, null);

    expect(response.statusCode).toBe(403);
  });
});
