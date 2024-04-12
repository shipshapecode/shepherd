import type { Prisma, Journey, Account } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<
  Prisma.JourneyCreateArgs | Prisma.AccountCreateArgs
>({
  account: {
    default: {
      data: {
        apiKey: '1234',
      },
    },
  },
  journey: {
    one: (scenario) => ({
      data: {
        accountId: scenario.account.default.id,
      },
    }),
    two: (scenario) => ({
      data: {
        accountId: scenario.account.default.id,
      },
    }),
  },
});

export type StandardScenario = ScenarioData<
  Journey | Account,
  'journey' | 'account'
>;
