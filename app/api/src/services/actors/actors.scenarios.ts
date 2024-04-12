import type { Prisma, Actor, Account, Journey } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<
  Prisma.ActorCreateArgs | Prisma.AccountCreateArgs | Prisma.JourneyCreateArgs
>({
  account: {
    default: {
      data: {
        apiKey: '1234',
      },
    },
  },
  journey: {
    default: (scenario) => ({
      data: {
        accountId: scenario.account.default.id,
        tourName: 'String',
      },
    }),
  },
  actor: {
    one: (scenario) => ({
      data: {
        accountId: scenario.account.default.id,
        metrics: {
          create: {
            createdAt: '2024-02-08T19:03:08.736Z',
            value: 'String',
            accountId: scenario.account.default.id,
            journeyId: scenario.journey.default.id,
          },
        },
      },
    }),
    two: (scenario) => ({
      data: {
        accountId: scenario.account.default.id,
      },
    }),
    three: {
      data: {
        Account: {
          create: {
            apiKey: '12345',
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<
  Actor | Account | Journey,
  'actor' | 'account' | 'journey'
>;
