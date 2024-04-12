import type { Prisma, Account } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.AccountCreateArgs>({
  account: {
    one: {
      data: { updatedAt: '2024-02-09T02:48:11.866Z', apiKey: 'String8399520' },
    },
    two: {
      data: { updatedAt: '2024-02-09T02:48:11.866Z', apiKey: 'String6580515' },
    },
  },
});

export type StandardScenario = ScenarioData<Account, 'account'>;
