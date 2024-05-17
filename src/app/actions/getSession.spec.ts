import { describe, expect, it, vi } from 'vitest';

import { getSession } from './getSession';

vi.mock('../../utils/auth/decrypt.ts', () => {
  return {
    decrypt: async () => {
      return 'decryptedCookie';
    },
  };
});

const getCookie = vi.fn();

vi.mock('next/headers', () => {
  return {
    cookies: () => ({
      get: getCookie,
    }),
  };
});

describe('Get Session', () => {
  it('should be able to get session', async () => {
    getCookie.mockImplementationOnce((name: string) => {
      return {
        value: 'encryptedCookie',
      };
    });

    const session = await getSession();

    expect(session).toEqual('decryptedCookie');
  });

  it('should not be able to get session', async () => {
    const session = await getSession();

    expect(session).toEqual(null);
  });
});
