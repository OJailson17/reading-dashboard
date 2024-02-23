import { GoalInput } from './GoalInput';

export const GoalsCard = () => {
	return (
		<div className='w-full min-h-[314px] px-7 py-6 bg-secondary-background rounded-2xl'>
			<h2 className='font-bold text-xl'>Goals</h2>

			<div className='mt-10 space-y-6'>
				<GoalInput label='month goal' onSetGoal={() => {}} />
				<GoalInput label='year goal' onSetGoal={() => {}} />
			</div>
		</div>
	);
};
