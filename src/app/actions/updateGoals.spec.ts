import { describe, expect, it, vi } from 'vitest';

import {
  APIErrorCode,
  APIResponseError,
  ClientErrorCode,
  RequestTimeoutError,
} from '@notionhq/client';

import { updateGoals } from './updateGoals';

vi.mock('next/cache', () => ({
  revalidateTag: (tag: string) => {},
}));

const updateBookMock = vi.fn();

vi.mock('../../lib/notion.ts', () => {
  return {
    notion: {
      pages: {
        update: () => updateBookMock(),
      },
    },
  };
});

describe('Update Goals', () => {
  it('should be able to update the goals', async () => {
    const goalUpdated = await updateGoals({
      goal: { month: 3, year: 20 },
      page_id: '123',
    });

    expect(goalUpdated.status).toBe(201);
  });

  it('should be able to return an error while updating the goals', async () => {
    updateBookMock.mockRejectedValueOnce(() => {});

    const goalUpdated = await updateGoals({
      goal: { month: 3, year: 20 },
      page_id: '123',
    });

    expect(goalUpdated.status).toBe(400);
  });
});
