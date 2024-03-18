'use client';

import { ImSpinner2 } from 'react-icons/im';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { toast } from '../ui/use-toast';

interface GoalInputProps {
	label: string;
	placeholder: string;
	onSetGoal: (goal: string) => Promise<void>;
}

const goalInputValidation = yup.object({
	goal: yup
		.number()
		.min(0, 'it needs to be 0 or more')
		.required('field required!')
		.typeError('it needs to be a number'),
});

type GoalFormProps = yup.InferType<typeof goalInputValidation>;

export const GoalInput = ({
	label,
	onSetGoal,
	placeholder,
}: GoalInputProps) => {
	const {
		register,
		handleSubmit,
		resetField,
		formState: { errors, isSubmitting },
	} = useForm<GoalFormProps>({
		resolver: yupResolver(goalInputValidation),
	});

	const handleSetGoal = async ({ goal }: GoalFormProps) => {
		await onSetGoal(String(goal));
		resetField('goal');
	};

	useEffect(() => {
		if (errors.goal)
			toast({
				description: errors.goal.message,
				variant: 'destructive',
			});
	}, [errors]);

	return (
		<div>
			<label htmlFor='month-goal' className='text-span text-sm'>
				{label}:
			</label>
			<form
				className='w-full mt-2 flex gap-2'
				onSubmit={handleSubmit(handleSetGoal)}
			>
				<input
					type='number'
					placeholder={placeholder}
					className='w-full max-w-52 px-3 bg-background placeholder:text-placeholder rounded-md'
					{...register('goal', {
						valueAsNumber: true,
					})}
				/>
				<button
					type='submit'
					className='flex-1 h-9 bg-purple rounded-md font-medium text-sm flex items-center justify-center'
				>
					{isSubmitting ? (
						<ImSpinner2 className='text-white animate-spin' />
					) : (
						<p>set</p>
					)}
				</button>
			</form>
		</div>
	);
};
