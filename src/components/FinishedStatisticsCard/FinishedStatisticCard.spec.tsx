import { describe, it, afterEach, expect, vi } from 'vitest';

import { cleanup, render } from '@testing-library/react';

import { FinishedStatisticCard } from './index';

vi.mock('next/font/google', () => ({
  Aclonica: () => ({
    style: {
      fontFamily: 'mocked',
    },
  }),
}));

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: vi.fn(),
  }),
}));

const bookGoals = {
  month: '6',
  year: '39',
};

vi.mock('../../context/GoalContext.tsx', () => ({
  useGoal: () => ({ bookGoals }),
}));

describe('Finished Statistic Card Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should be able to render the monthly goals card', () => {
    const { getByText } = render(
      <FinishedStatisticCard books={{ current: 3 }} card="month" />,
    );

    expect(getByText('books read this month')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
    expect(getByText(`/${bookGoals.month}`)).toBeInTheDocument();
    expect(getByText('50%')).toBeInTheDocument();
  });

  it('should be able to render the yearly goals card', () => {
    const { getByText } = render(
      <FinishedStatisticCard books={{ current: 25 }} card="year" />,
    );

    expect(getByText('25')).toBeInTheDocument();
    expect(getByText(`/${bookGoals.year}`)).toBeInTheDocument();
    expect(getByText('64%')).toBeInTheDocument();
  });
});
