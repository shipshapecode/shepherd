import type { Prisma, Group, Account } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<
  Prisma.GroupCreateArgs | Prisma.AccountCreateArgs
>({
  account: {
    default: {
      data: {
        apiKey: '1234',
      },
    },
  },
  group: {
    one: (scenario) => ({
      data: {
        updatedAt: '2024-02-29T21:54:52.751Z',
        name: 'String',
        providerId: 'String',
        key: 'String',
        values: { foo: 'bar' },
        accountId: scenario.account.default.id,
      },
    }),
    two: (scenario) => ({
      data: {
        updatedAt: '2024-02-29T21:54:52.751Z',
        name: 'String',
        providerId: 'String',
        key: 'String',
        values: { foo: 'bar' },
        accountId: scenario.account.default.id,
      },
    }),
  },
});

export type StandardScenario = ScenarioData<
  Group | Account,
  'group' | 'account'
>;
