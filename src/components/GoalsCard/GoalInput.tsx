interface GoalInputProps {
	label: string;
	onSetGoal: () => void;
}

export const GoalInput = ({ label, onSetGoal }: GoalInputProps) => {
	return (
		<div>
			<label htmlFor='month-goal' className='text-span text-sm'>
				{label}:
			</label>
			<form className='w-full mt-2 flex gap-2'>
				<input
					type='text'
					placeholder='0'
					className='w-full max-w-52 px-3 bg-background placeholder:text-placeholder rounded-md'
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
