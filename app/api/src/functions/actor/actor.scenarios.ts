import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario({
  account: {
    default: {
      data: {
        apiKey: '1234',
      },
    },
  },
  actor: {
    default: {
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

export type StandardScenario = ScenarioData<unknown>;
