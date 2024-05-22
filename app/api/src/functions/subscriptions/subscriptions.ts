import type { APIGatewayEvent, Context } from 'aws-lambda';

import {
  subscription as getSubscription,
  updateSubscriptionViaWebhook,
} from 'src/services/subscriptions/subscriptions';
import { logger } from 'src/lib/logger';

// https://apidocs.chargebee.com/docs/api/webhooks?prod_cat_ver=2
// US Region
const CHARGEBEE_WEBHOOKS_REQUEST_ORIGINS = [
  '3.209.65.25',
  '3.215.11.205',
  '3.228.118.137',
  '3.229.12.56',
  '3.230.149.90',
  '3.231.198.174',
  '3.231.48.173',
  '3.233.249.52',
  '18.210.240.138',
  '18.232.249.243',
  '34.195.242.184',
  '34.206.183.55',
  '35.168.199.245',
  '52.203.173.152',
  '52.205.125.34',
  '52.45.227.101',
  '54.158.181.196',
  '54.163.233.122',
  '54.166.107.32',
  '54.84.202.184',
  'localhost:8911',
];

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event: APIGatewayEvent, _context: Context) => {
  logger.info(`${event.httpMethod} ${event.path}: subscriptions function`);

  const requestIp = event.requestContext.identity.sourceIp;

  // Verify the webhook request to ensure it's from Chargebee servers
  if (!CHARGEBEE_WEBHOOKS_REQUEST_ORIGINS.find((ip) => ip === requestIp)) {
    // TODO: Uncomment this block to restrict the IP addresses, but this hasn't been reliable
    logger.info(`Request IP: ${requestIp}`);
    // return {
    //   statusCode: 403,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     data: 'IP Address Not Allowed',
    //   }),
    // };
  }

  const eventBody = JSON.parse(event.body);
  const { event_type: eventType, content } = eventBody;
  logger.info(`Request content: ${content.subscription.id}`);
  logger.info(`Customer CB Id: ${content.customer.id}`);

  const cbSubscription = await getSubscription({
    chargeBeeCustomerId: content.subscription.customer_id,
  });

  if (!cbSubscription) {
    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: 'Subscription not found',
      }),
    };
  }

  switch (eventType) {
    case 'subscription_activated':
    case 'subscription_reactivated':
    case 'subscription_created':
      logger.info(`Subscription created or active: ${content.subscription.id}`);
      await updateSubscriptionViaWebhook({
        input: {
          chargeBeeCustomerId: content.customer.id,
          status: 'ACTIVE',
          type: content.subscription.plan_id,
        },
      });
      break;
    case 'subscription_cancelled':
      logger.info(`Subscription canceled: ${content.subscription.id}`);
      await updateSubscriptionViaWebhook({
        input: {
          chargeBeeCustomerId: content.customer.id,
          status: 'CANCELLED',
          type: content.subscription.plan_id,
        },
      });
      break;
    default:
      // Unhandled event type
      logger.info(`Unhandled event type: ${eventType}.`);
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: 'SUCCESS',
    }),
  };
};
