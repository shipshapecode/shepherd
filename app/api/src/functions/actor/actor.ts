import type { APIGatewayEvent, Context } from 'aws-lambda';
import { PostHog } from 'posthog-node';
import type { JourneyState, Journey } from 'types/graphql';

import { db } from 'src/lib/db';
import { logger } from 'src/lib/logger';
import { unauthResponse } from 'src/lib/utils';
import { captureIntegrationEvent } from 'src/services/integrations/integrations';
import { findOrCreateJourney } from 'src/services/journeys/journeys';

export interface ShepherdEvent {
  eventType: JourneyState;
  currentUserId: number | null;
  currentUrl?: string;
  journeyData?: {
    id: string;
    currentStep: number;
    numberOfSteps: number;
    tourOptions: Journey;
  };
  // @deprecated
  tour?: {
    id: string;
    name: string;
  };
  uniqueId?: string;
  properties: Record<string, string> & { context: Record<string, string> };
}

const phDefaultClient = new PostHog(process.env.POSTHOG_API_KEY, {
  host: 'https://us.posthog.com',
});

/**
 * The handler function is your code that processes http request events.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event: APIGatewayEvent, _context: Context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Authorization,Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS, POST',
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

  const { data }: { data: ShepherdEvent } = JSON.parse(event.body);
  const uniqueId =
    data.journeyData?.id.split('--')[1] ?? data.tour?.id.split('--')[1];
  const eventData = { currentUrl: event.headers.referer, uniqueId, ...data };
  logger.debug(`Shepherd Auth for ${apiKey} at ${event.headers.referer}`);
  logger.debug(
    `Shepherd Journey Action ${data.eventType}: on tour ${data.journeyData?.id} by user ${data.currentUserId}`
  );

  const keyRoot = apiKey.split(' ')[1].split('_')[1];
  const account = await db.account.findUnique({
    where: { apiKey: keyRoot },
    include: {
      integrations: true,
    },
  });

  if (!account) {
    return unauthResponse();
  }
  logger.debug(`Shepherd Journey for Account ${account.id}`);
  // The journeyState is the event type in the Shepherd tour that triggered the request
  const journeyState = data.eventType.toUpperCase();

  // If the user is not identified, create a new actor so we can track the user's journey
  if (!data.currentUserId) {
    // pass in user properties not context
    const userProperties = {
      ...data.properties,
    };
    delete userProperties.context;

    const newActor = await db.actor.create({
      data: {
        Account: {
          connect: {
            id: account.id,
          },
        },
        properties: userProperties,
      },
    });

    if (journeyState === 'SETUP') {
      return {
        statusCode: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'Authorization,Content-Type',
          'Access-Control-Allow-Methods': 'OPTIONS, POST',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          data: {
            actorId: newActor.id,
            accountId: account.id,
          },
        }),
      };
    }
    // set actor id for the rest of the journey
    data.currentUserId = newActor.id;
  }

  const journey = await findOrCreateJourney({
    input: { accountId: account.id, uniqueId },
  });

  await db.metric.create({
    data: {
      Account: {
        connect: {
          id: account.id,
        },
      },
      Actor: {
        connect: {
          id: Number(data.currentUserId),
        },
      },
      Journey: {
        connect: {
          id: journey.id,
        },
      },
      journeyState: journeyState as JourneyState,
      value: eventData,
    },
  });

  phDefaultClient.capture({
    distinctId: `shepherd-user-${data.currentUserId}`,
    event: `Shepherd Journey ${journeyState}`,
    properties: {
      ...eventData,
      $current_url: eventData.currentUrl,
      $set: {
        journeyId: journey.id,
        currentStep: data.journeyData?.currentStep,
        numberOfSteps: data.journeyData?.numberOfSteps,
      },
    },
    groups: {
      account: account.id,
    },
  });

  await phDefaultClient.shutdownAsync();

  // if there are integrations, send the event to the integrations
  captureIntegrationEvent({
    accountId: account.id,
    eventData,
    journeyState: data.eventType as JourneyState,
    userId: data.currentUserId,
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Authorization,Content-Type',
      'Access-Control-Allow-Methods': 'OPTIONS, POST',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      data: 'Shepherd event captured',
    }),
  };
};
