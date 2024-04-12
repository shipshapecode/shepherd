import type { User, Account } from '@prisma/client';

import { users, user, createUser, updateUser, deleteUser } from './users';
import type { StandardScenario } from './users.scenarios';

describe('users', () => {
  scenario('returns all users', async (scenario: StandardScenario) => {
    mockCurrentUser({
      Account: scenario.account.default as Account,
      accountId: (scenario.account.default as Account).id,
      id: '1',
      email: '',
      type: 'OWNER',
    });
    const result = await users();

    expect(result.length).toEqual(Object.keys(scenario.user).length);
  });

  scenario('returns a single user', async (scenario: StandardScenario) => {
    const result = await user({ id: scenario.user.one.id });

    expect(result).toEqual(scenario.user.one);
  });

  scenario('creates a user', async (scenario) => {
    const result = await createUser({
      input: {
        type: 'OWNER',
        email: 'String8596938',
        hashedPassword: 'String',
        salt: 'String',
        accountId: (scenario.account.default as Account).id,
      },
    });

    expect(result.email).toEqual('String8596938');
    expect(result.hashedPassword).toEqual('String');
    expect(result.salt).toEqual('String');
  });

  scenario('updates a user', async (scenario: StandardScenario) => {
    const original = (await user({ id: scenario.user.one.id })) as User;
    const result = await updateUser({
      id: original.id,
      input: { email: 'String83926402' },
    });

    expect(result.email).toEqual('String83926402');
  });

  scenario('deletes a user', async (scenario: StandardScenario) => {
    const original = (await deleteUser({ id: scenario.user.one.id })) as User;
    const result = await user({ id: original.id });

    expect(result).toEqual(null);
  });
});
