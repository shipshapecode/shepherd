import type { Group, Account } from '@prisma/client';

import { groups, group, createGroup, updateGroup, deleteGroup } from './groups';
import type { StandardScenario } from './groups.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe.skip('groups', () => {
  scenario('returns all groups', async (scenario: StandardScenario) => {
    mockCurrentUser({
      Account: scenario.account.default as Account,
      accountId: (scenario.account.default as Account).id,
      id: '1',
      email: '',
      type: 'OWNER',
    });
    const result = await groups();

    expect(result.length).toEqual(Object.keys(scenario.group).length);
  });

  scenario('returns a single group', async (scenario: StandardScenario) => {
    const result = await group({ id: scenario.group.one.id });

    expect(result).toEqual(scenario.group.one);
  });

  scenario('creates a group', async (scenario: StandardScenario) => {
    const result = await createGroup({
      input: {
        name: 'String',
        providerId: 'String',
        key: 'String',
        values: { foo: 'bar' },
        accountId: (scenario.account.default as Account).id,
      },
    });

    expect(result.name).toEqual('String');
    expect(result.providerId).toEqual('String');
    expect(result.key).toEqual('String');
    expect(result.values).toEqual({ foo: 'bar' });
    expect(result.accountId).toEqual((scenario.account.default as Account).id);
  });

  scenario('updates a group', async (scenario: StandardScenario) => {
    const original = (await group({ id: scenario.group.one.id })) as Group;
    const result = await updateGroup({
      id: original.id,
      input: { name: 'Super Cool Thing' },
    });

    expect(result.name).toEqual('Super Cool Thing');
  });

  scenario('deletes a group', async (scenario: StandardScenario) => {
    const original = (await deleteGroup({
      id: scenario.group.one.id,
    })) as Group;
    const result = await group({ id: original.id });

    expect(result).toEqual(null);
  });
});
