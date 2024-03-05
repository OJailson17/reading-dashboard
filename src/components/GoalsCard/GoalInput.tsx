'use client';

import { FormEvent, useState } from 'react';

interface GoalInputProps {
	label: string;
	onSetGoal: (goal: string) => void;
}

export const GoalInput = ({ label, onSetGoal }: GoalInputProps) => {
	const [goalValue, setGoalValue] = useState('');

	const handleSetGoal = (event: FormEvent) => {
		event.preventDefault();

		onSetGoal(goalValue);
	};

	return (
		<div>
			<label htmlFor='month-goal' className='text-span text-sm'>
				{label}:
			</label>
			<form className='w-full mt-2 flex gap-2' onSubmit={handleSetGoal}>
				<input
					type='number'
					placeholder='0'
					className='w-full max-w-52 px-3 bg-background placeholder:text-placeholder rounded-md'
					min={0}
					value={goalValue}
					onChange={e => setGoalValue(e.target.value)}
				/>
				<button
					type='button'
					className='flex-1 h-9 bg-purple rounded-md font-medium text-sm'
				>
					set
				</button>
			</form>
		</div>
	);
};
