import type { Prisma, Subscription, User, Account } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<
  | Prisma.SubscriptionCreateArgs
  | Prisma.UserCreateArgs
  | Prisma.AccountCreateArgs
>({
  account: {
    default: {
      data: {
        apiKey: '1234',
      },
    },
  },
  user: {
    default: (scenario) => ({
      data: {
        type: 'OWNER',
        email: 'String3611202',
        hashedPassword: 'String',
        salt: 'String',
        accountId: scenario.account.default.id,
      },
    }),
  },
  subscription: {
    one: (scenario) => ({
      data: {
        updatedAt: '2024-04-26T23:03:28.636Z',
        status: 'ACTIVE',
        type: 'String',
        chargeBeeCustomerId: '1',
        data: { foo: 'bar' },
        userId: scenario.user.default.id,
      },
    }),
    two: (scenario) => ({
      data: {
        updatedAt: '2024-04-26T23:03:28.636Z',
        status: 'CANCELLED',
        type: 'String',
        chargeBeeCustomerId: '2',
        data: { foo: 'bar' },
        userId: scenario.user.default.id,
      },
    }),
  },
});

export type StandardScenario = ScenarioData<
  Subscription | Account | User,
  'subscription' | 'user' | 'account'
>;
