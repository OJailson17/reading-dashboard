'use client';

import { FormEvent, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from '../ui/use-toast';

interface GoalInputProps {
	label: string;
	placeholder: string;
	onSetGoal: (goal: string) => Promise<void>;
}

export const GoalInput = ({
	label,
	onSetGoal,
	placeholder,
}: GoalInputProps) => {
	const [goalValue, setGoalValue] = useState('');
	const [isUpdatingGoal, setIsUpdatingGoal] = useState(false);

	const handleSetGoal = async (event: FormEvent) => {
		event.preventDefault();

		setIsUpdatingGoal(true);

		await onSetGoal(goalValue);

		setIsUpdatingGoal(false);
		setGoalValue('');
	};

	return (
		<div>
			<label htmlFor='month-goal' className='text-span text-sm'>
				{label}:
			</label>
			<form className='w-full mt-2 flex gap-2' onSubmit={handleSetGoal}>
				<input
					type='number'
					placeholder={placeholder}
					className='w-full max-w-52 px-3 bg-background placeholder:text-placeholder rounded-md'
					min={0}
					value={goalValue}
					onChange={e => setGoalValue(e.target.value)}
					required
				/>
				<button
					type='submit'
					className='flex-1 h-9 bg-purple rounded-md font-medium text-sm flex items-center justify-center'
				>
					{isUpdatingGoal ? (
						<ImSpinner2 className='text-white animate-spin' />
					) : (
						<p>set</p>
					)}
				</button>
			</form>
		</div>
	);
};
