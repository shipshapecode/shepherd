import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api';

import requireAuth from './requireAuth';

describe('requireAuth directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(requireAuth.schema).toBeTruthy();
    expect(getDirectiveName(requireAuth.schema)).toBe('requireAuth');
  });

  it('requireAuth has stub implementation. Should not throw when current user', () => {
    // @ts-ignore
    const mockExecution = mockRedwoodDirective(requireAuth, {
      context: {
        currentUser: {
          id: 1,
          email: 'no@way.com',
          type: 'OWNER',
          accountId: 1,
        },
      },
    });

    expect(mockExecution).not.toThrow();
  });
});
