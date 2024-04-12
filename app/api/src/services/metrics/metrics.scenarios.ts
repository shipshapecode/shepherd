import type { Prisma, Metric, Account } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<
  Prisma.MetricCreateArgs | Prisma.AccountCreateArgs
>({
  account: {
    default: {
      data: {
        apiKey: '1234',
      },
    },
  },
  metric: {
    one: (scenario) => ({
      data: {
        createdAt: '2024-02-08T19:03:08.736Z',
        value: 'String',
        accountId: scenario.account.default.id,
      },
    }),
    two: (scenario) => ({
      data: {
        createdAt: '2024-02-08T19:03:08.736Z',
        value: 'String',
        accountId: scenario.account.default.id,
      },
    }),
  },
});

export type StandardScenario = ScenarioData<
  Metric | Account,
  'metric' | 'account'
>;
