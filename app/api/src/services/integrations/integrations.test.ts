import type { Integration, Account } from '@prisma/client';

import {
  integrations,
  integration,
  createIntegration,
  updateIntegration,
  deleteIntegration,
} from './integrations';
import type { StandardScenario } from './integrations.scenarios';

describe('integrations', () => {
  scenario('returns all integrations', async (scenario: StandardScenario) => {
    mockCurrentUser({
      Account: scenario.account.default as Account,
      accountId: (scenario.account.default as Account).id,
      id: '1',
      email: '',
      type: 'OWNER',
    });
    const result = await integrations();

    expect(result.length).toEqual(Object.keys(scenario.integration).length);
  });

  scenario(
    'returns a single integration',
    async (scenario: StandardScenario) => {
      const result = await integration({ id: scenario.integration.one.id });

      expect(result).toEqual(scenario.integration.one);
    }
  );

  scenario('creates a integration', async (scenario: StandardScenario) => {
    const result = await createIntegration({
      input: {
        name: 'String',
        option: 'AMPLITUDE',
        settings: { foo: 'bar' },
        accountId: (scenario.account.default as Account).id,
      },
    });

    expect(result.name).toEqual('String');
    expect(result.option).toEqual('AMPLITUDE');
    expect(result.settings).toEqual({ foo: 'bar' });
    expect(result.accountId).toEqual((scenario.account.default as Account).id);
  });

  scenario('updates a integration', async (scenario: StandardScenario) => {
    const original = (await integration({
      id: scenario.integration.one.id,
    })) as Integration;
    const result = await updateIntegration({
      id: original.id,
      input: { name: 'Really great connection' },
    });

    expect(result.name).toEqual('Really great connection');
  });

  scenario('deletes a integration', async (scenario: StandardScenario) => {
    const original = (await deleteIntegration({
      id: scenario.integration.one.id,
    })) as Integration;
    const result = await integration({ id: original.id });

    expect(result).toEqual(null);
  });
});
