import type { Actor, Account } from '@prisma/client';

// updateActor not tested because user/metric should be immutable
import {
  actors,
  actorsByJourney,
  actorsWithMetrics,
  actor,
  createActor,
  deleteActor,
} from './actors';
import type { StandardScenario } from './actors.scenarios';

describe('actors', () => {
  scenario('returns all actors', async (scenario: StandardScenario) => {
    mockCurrentUser({
      Account: scenario.account.default as Account,
      accountId: (scenario.account.default as Account).id,
      id: '1',
      email: '',
      type: 'OWNER',
    });

    const result = await actors();

    // we check minus 1 because not all seeded actors have the same account
    expect(result.length).toEqual(Object.keys(scenario.actor).length - 1);
  });
  scenario(
    'returns only actors with metrics',
    async (scenario: StandardScenario) => {
      mockCurrentUser({
        Account: scenario.account.default as Account,
        accountId: (scenario.account.default as Account).id,
        id: '1',
        email: '',
        type: 'OWNER',
      });

      const result = await actorsWithMetrics();

      // we check for only one, because only one actor has metrics
      expect(result.length).toEqual(Object.keys(scenario.actor).length - 2);
    }
  );

  scenario(
    'returns only actors from a journey',
    async (scenario: StandardScenario) => {
      mockCurrentUser({
        Account: scenario.account.default as Account,
        accountId: (scenario.account.default as Account).id,
        id: '1',
        email: '',
        type: 'OWNER',
      });

      const result = await actorsByJourney({
        journeyId: String(scenario.journey.default.id),
      });

      // we check for only one, because only one actor has metrics
      expect(await result.count).toEqual(
        Object.keys(scenario.actor).length - 2
      );
    }
  );

  scenario('returns a single actor', async (scenario: StandardScenario) => {
    const result = await actor({ id: Number(scenario.actor.one.id) });

    expect(result.id).toEqual(scenario.actor.one.id);
  });

  scenario('creates a single actor', async (scenario: StandardScenario) => {
    const result = await createActor({
      input: { accountId: (scenario.account.default as Account).id },
    });

    expect(result.accountId).toEqual((scenario.actor.one as Actor).accountId);
  });

  scenario('deletes a actor', async (scenario: StandardScenario) => {
    const original = (await deleteActor({
      id: Number(scenario.actor.one.id),
    })) as Actor;
    const result = await actor({ id: original.id });

    expect(result).toEqual(null);
  });
});
