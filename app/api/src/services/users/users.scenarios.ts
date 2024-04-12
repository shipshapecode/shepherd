import type { Prisma, User, Account } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<
  Prisma.UserCreateArgs | Prisma.AccountCreateArgs
>({
  account: {
    default: {
      data: {
        apiKey: '1234',
      },
    },
  },
  user: {
    one: (scenario) => ({
      data: {
        type: 'OWNER',
        email: 'String3611202',
        hashedPassword: 'String',
        salt: 'String',
        accountId: scenario.account.default.id,
      },
    }),
    two: (scenario) => ({
      data: {
        type: 'VIEWER',
        email: 'String1811370',
        hashedPassword: 'String',
        salt: 'String',
        accountId: scenario.account.default.id,
      },
    }),
  },
});

export type StandardScenario = ScenarioData<User | Account, 'user' | 'account'>;
