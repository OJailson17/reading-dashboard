'use client';

import { localStorageStrings } from '@/utils/constants/localStorageStrings';
import { GoalInput } from './GoalInput';
import { useBook } from '@/context/BookContext';
import { useEffect } from 'react';

export const GoalsCard = () => {
	const { onSetGoal, bookGoals } = useBook();

	const handleSetMonthlyGoal = (goal: string) => {
		onSetGoal(goal, 'month');
	};

	const handleSetYearlyGoal = (goal: string) => {
		onSetGoal(goal, 'year');
	};

	useEffect(() => {
		console.log({ bookGoals });
	}, [bookGoals]);

	return (
		<div className='w-full h-full max-h-80 xs:px-4 sm:px-7 pt-6 pb-8 bg-secondary-background rounded-2xl'>
			<h2 className='font-bold text-xl'>Goals</h2>

			<div className='mt-8 space-y-6'>
				<GoalInput label='month goal' onSetGoal={handleSetMonthlyGoal} />
				<GoalInput label='year goal' onSetGoal={handleSetYearlyGoal} />
			</div>
		</div>
	);
};
