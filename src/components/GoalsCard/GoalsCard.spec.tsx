import { describe, it, afterEach, expect, vi } from 'vitest';

import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { GoalsCard } from './index';

const bookGoals = {
  month: '6',
  year: '39',
};

const onSetGoal = vi.fn();

vi.mock('../../context/GoalContext.tsx', () => ({
  useGoal: () => ({
    bookGoals,
    onSetGoal,
  }),
}));

describe('Goals Card Component', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should be able to render the component', () => {
    const { getByText } = render(<GoalsCard />);

    expect(getByText('Goals')).toBeInTheDocument();
    expect(getByText('month goal:')).toBeInTheDocument();
    expect(getByText('year goal:')).toBeInTheDocument();
  });

  it('should be able to update the month goal', async () => {
    const { getAllByRole, getByPlaceholderText } = render(<GoalsCard />);

    const monthInput = getByPlaceholderText(
      bookGoals.month,
    ) as HTMLInputElement;
    const submitButton = getAllByRole('button');

    await userEvent.type(monthInput, '4');
    await userEvent.click(submitButton[0]);

    expect(onSetGoal).toHaveBeenCalled();
  });

  it('should be able to update the year goal', async () => {
    const { getAllByRole, getByPlaceholderText } = render(<GoalsCard />);

    const monthInput = getByPlaceholderText(bookGoals.year) as HTMLInputElement;
    const submitButton = getAllByRole('button');

    await userEvent.type(monthInput, '4');
    await userEvent.click(submitButton[1]);

    expect(onSetGoal).toHaveBeenCalled();
  });

  it('should not be able to update goals with empty inputs', async () => {
    const { getAllByRole } = render(<GoalsCard />);

    const submitButton = getAllByRole('button');

    await userEvent.click(submitButton[0]);
    await userEvent.click(submitButton[1]);

    expect(onSetGoal).not.toHaveBeenCalled();
  });
});
