import type { Subscription } from '@prisma/client';

import {
  subscriptions,
  subscription,
  // createSubscription,
  updateSubscriptionViaWebhook,
  // deleteSubscription,
  // getSubscriptionCheckoutUrl,
} from './subscriptions';
import type { StandardScenario } from './subscriptions.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('subscriptions', () => {
  scenario('returns all subscriptions', async (scenario: StandardScenario) => {
    const result = await subscriptions();

    expect(result.length).toEqual(Object.keys(scenario.subscription).length);
  });

  scenario(
    'returns a single subscription',
    async (scenario: StandardScenario) => {
      const result = await subscription({
        chargeBeeCustomerId: (scenario.subscription.one as Subscription)
          .chargeBeeCustomerId,
      });

      expect(result).toEqual(scenario.subscription.one);
    }
  );

  // TODO: figure out how to mock Chargebee API
  // scenario('creates a subscription', async () => {
  //   const result = await createSubscription({
  //     input: {
  //       updatedAt: '2024-04-26T23:03:28.622Z',
  //       status: 'ACTIVE',
  //       type: 'String',
  //       data: { foo: 'bar' },
  //     },
  //   });

  //   expect(result.updatedAt).toEqual(new Date('2024-04-26T23:03:28.622Z'));
  //   expect(result.status).toEqual('ACTIVE');
  //   expect(result.type).toEqual('String');
  //   expect(result.data).toEqual({ foo: 'bar' });
  // });

  scenario('updates a subscription', async (scenario: StandardScenario) => {
    const original = (await subscription({
      chargeBeeCustomerId: (scenario.subscription.one as Subscription)
        .chargeBeeCustomerId,
    })) as Subscription;
    const result = (await updateSubscriptionViaWebhook({
      input: {
        chargeBeeCustomerId: (scenario.subscription.one as Subscription)
          .chargeBeeCustomerId,
        status: 'CANCELLED',
        type: 'String',
      },
    })) as Subscription;

    expect(result.status).not.toEqual(original.status);
  });

  // scenario('deletes a subscription', async (scenario: StandardScenario) => {
  //   const original = (await deleteSubscription({
  //     id: scenario.subscription.one.id,
  //   })) as Subscription;
  //   const result = await subscription({ id: original.id });

  //   expect(result).toEqual(null);
  // });

  // TODO: figure out how to mock Chargebee API
  // scenario(
  //   'gets checkout url for a subscription',
  //   async (scenario: StandardScenario) => {
  //     const result = await getSubscriptionCheckoutUrl({
  //       planId: 'Awesome-Plan',
  //     });

  //     expect(result.url).toEqual(
  //       'https://checkout.chargebee.com/checkout/new/awesome-plan'
  //     );
  //   }
  // );
});
