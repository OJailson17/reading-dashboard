'use client';

import { useGoal } from '@/context/GoalContext';

import { GoalInput } from './GoalInput';

export const GoalsCard = () => {
  const { onSetGoal, bookGoals } = useGoal();

  const handleSetMonthlyGoal = async (goal: string) => {
    await onSetGoal(goal, 'month');
  };

  const handleSetYearlyGoal = async (goal: string) => {
    await onSetGoal(goal, 'year');
  };

  return (
    <div className="h-full max-h-80 w-full rounded-2xl bg-secondary-background pb-8 pt-6 xs:px-4 sm:px-7">
      <h2 className="text-xl font-bold">Goals</h2>

      <div className="mt-8 space-y-6">
        <GoalInput
          label="month goal"
          onSetGoal={handleSetMonthlyGoal}
          placeholder={bookGoals.month}
        />
        <GoalInput
          label="year goal"
          onSetGoal={handleSetYearlyGoal}
          placeholder={bookGoals.year}
        />
      </div>
    </div>
  );
};
