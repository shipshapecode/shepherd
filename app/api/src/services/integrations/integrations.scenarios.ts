import type { Prisma, Integration, Account } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<
  Prisma.IntegrationCreateArgs | Prisma.AccountCreateArgs
>({
  account: {
    default: {
      data: {
        apiKey: '1234',
      },
    },
  },
  integration: {
    one: (scenario) => ({
      data: {
        updatedAt: '2024-03-01T00:20:50.164Z',
        name: 'String',
        option: 'AMPLITUDE',
        settings: { foo: 'bar' },
        accountId: scenario.account.default.id,
      },
    }),
    two: (scenario) => ({
      data: {
        updatedAt: '2024-03-01T00:20:50.164Z',
        name: 'String',
        option: 'AMPLITUDE',
        settings: { foo: 'bar' },
        accountId: scenario.account.default.id,
      },
    }),
  },
});

export type StandardScenario = ScenarioData<
  Integration | Account,
  'integration' | 'account'
>;
