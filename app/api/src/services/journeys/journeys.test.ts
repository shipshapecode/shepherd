import type { Journey, Account } from '@prisma/client';

import {
  journeys,
  journey,
  createJourney,
  updateJourney,
  deleteJourney,
} from './journeys';
import type { StandardScenario } from './journeys.scenarios';

describe.skip('journeys', () => {
  scenario('returns all journeys', async (scenario: StandardScenario) => {
    mockCurrentUser({
      Account: scenario.account.default as Account,
      accountId: (scenario.account.default as Account).id,
      id: '1',
      email: '',
      type: 'OWNER',
    });
    const result = await journeys();

    expect(result.length).toEqual(Object.keys(scenario.journey).length);
  });

  scenario('returns a single journey', async (scenario: StandardScenario) => {
    const result = await journey({ id: scenario.journey.one.id });

    expect(result).toEqual(scenario.journey.one);
  });

  scenario('creates a journey', async (scenario: StandardScenario) => {
    const result = await createJourney({
      input: {
        accountId: (scenario.account.default as Account).id,
        uniqueId: 'String',
      },
    });

    expect(result.accountId).toEqual(scenario.account.default.id);
  });

  scenario('updates a journey', async (scenario: StandardScenario) => {
    const original = (await journey({
      id: scenario.journey.one.id,
    })) as Journey;
    const result = await updateJourney({
      id: original.id,
      input: { tourName: 'Another great journey' },
    });

    expect(result.tourName).toEqual('Another great journey');
  });

  scenario('deletes a journey', async (scenario: StandardScenario) => {
    const original = (await deleteJourney({
      id: scenario.journey.one.id,
    })) as Journey;
    const result = await journey({ id: original.id });

    expect(result).toEqual(null);
  });
});
