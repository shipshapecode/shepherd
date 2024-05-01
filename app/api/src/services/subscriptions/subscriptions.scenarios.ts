import type { Prisma, Subscription } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.SubscriptionCreateArgs>({
  subscription: {
    one: {
      data: {
        updatedAt: '2024-04-26T23:03:28.636Z',
        status: 'ACTIVE',
        type: 'String',
        data: { foo: 'bar' },
      },
    },
    two: {
      data: {
        updatedAt: '2024-04-26T23:03:28.636Z',
        status: 'ACTIVE',
        type: 'String',
        data: { foo: 'bar' },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Subscription, 'subscription'>;
