import type { APIGatewayEvent, Context } from 'aws-lambda';

import { db } from 'src/lib/db';
import { logger } from 'src/lib/logger';
import { unauthResponse } from 'src/lib/utils';

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event: APIGatewayEvent, _context: Context) => {
  logger.info(`${event.httpMethod} ${event.path}: state function`);

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Authorization,Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS, GET',
        'Access-Control-Allow-Origin': '*',
      },
      body: null,
    };
  }

  // Looking for the API key in the headers
  // Format:'Authorization: `ApiKey shp_{value}'
  const apiKey = event.headers['Authorization'] ?? event.headers.authorization;
  if (!apiKey) {
    return unauthResponse();
  }

  const keyRoot = apiKey.split(' ')[1].split('_')[1];
  const account = await db.account.findUnique({
    where: { apiKey: keyRoot },
    include: {
      journeys: {
        select: {
          isActive: true,
          uniqueId: true,
        },
      },
    },
  });

  if (!account) {
    return unauthResponse();
  }

  logger.debug(`Shepherd Journey State for Account: ${account.id}`);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Authorization,Content-Type',
      'Access-Control-Allow-Methods': 'OPTIONS, GET',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      data: account.journeys,
    }),
  };
};
