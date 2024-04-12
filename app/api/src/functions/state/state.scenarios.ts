import type { Prisma, Journey, Account } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<
  Prisma.JourneyCreateArgs | Prisma.AccountCreateArgs
>({
  account: {
    default: {
      data: {
        apiKey: '12345',
      },
    },
  },
  journey: {
    one: (scenario) => ({
      data: {
        accountId: scenario.account.default.id,
        isActive: true,
      },
    }),
    two: (scenario) => ({
      data: {
        accountId: scenario.account.default.id,
        isActive: false,
      },
    }),
  },
});

export type StandardScenario = ScenarioData<
  Journey | Account,
  'journey' | 'account'
>;
