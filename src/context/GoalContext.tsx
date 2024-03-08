'use client';

import { onSignOut } from '@/app/actions/signOut';
import { updateGoals } from '@/app/actions/updateGoals';
import { toast } from '@/components/ui/use-toast';
import { storageStrings } from '@/utils/constants/storageStrings';
import { useRouter } from 'next/navigation';
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

interface GoalContextProviderProps {
	children: ReactNode;
}

interface Goal {
	month: string;
	year: string;
}

interface UpdateGoalProps {
	goal: string;
	user_id: string;
}

interface GoalContextProps {
	bookGoals: Goal;
	onSetGoal: (goal: string, period: 'month' | 'year') => Promise<void>;
	onSetInitialGoals: (goals: Goal) => void;
}

const GoalContext = createContext({} as GoalContextProps);

export const GoalContextProvider = ({ children }: GoalContextProviderProps) => {
	const [bookGoals, setBookGoals] = useState({
		month: '0',
		year: '0',
	});

	const handleSetInitialBookGoals = (goals: Goal) => {
		setBookGoals(goals);

		localStorage.setItem(storageStrings.goals, JSON.stringify(goals));
	};

	const updateMonthGoal = async ({ goal, user_id }: UpdateGoalProps) => {
		const updatedGoalResponse = await updateGoals({
			goal: {
				month: Number(goal),
				year: Number(bookGoals.year),
			},
			page_id: user_id,
		});

		if (updatedGoalResponse.error) {
			toast({
				description: 'ERROR: Goal not updated!',
				variant: 'destructive',
			});
			console.log(updatedGoalResponse);
			return;
		}

		localStorage.setItem(
			storageStrings.goals,
			JSON.stringify({
				...bookGoals,
				month: goal,
			}),
		);

		toast({
			description: 'Goal updated!',
			variant: 'success',
		});

		return setBookGoals(oldData => {
			return {
				...oldData,
				month: goal,
			};
		});
	};

	const updateYearGoal = async ({ goal, user_id }: UpdateGoalProps) => {
		const updatedGoalResponse = await updateGoals({
			goal: {
				month: Number(bookGoals.month),
				year: Number(goal),
			},
			page_id: user_id,
		});

		if (updatedGoalResponse.error) {
			toast({
				description: 'ERROR: Goal not updated!',
				variant: 'destructive',
			});
			console.log(updatedGoalResponse);
			return;
		}

		localStorage.setItem(
			storageStrings.goals,
			JSON.stringify({
				...bookGoals,
				year: goal,
			}),
		);

		toast({
			description: 'Goal updated!',
			variant: 'success',
		});

		return setBookGoals(oldData => {
			return {
				...oldData,
				year: goal,
			};
		});
	};

	const handleSetBookGoals = async (goal: string, period: 'month' | 'year') => {
		const user_id = localStorage.getItem(storageStrings.user_id);

		if (!user_id) {
			toast({
				description: 'User not found',
				variant: 'destructive',
			});

			await onSignOut();
			return;
		}

		if (period === 'month') {
			return await updateMonthGoal({ goal, user_id });
		}

		return await updateYearGoal({ goal, user_id });
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const goals = localStorage.getItem(storageStrings.goals);

			if (goals) {
				handleSetInitialBookGoals(JSON.parse(goals));
			}
		}
	}, []);

	return (
		<GoalContext.Provider
			value={{
				bookGoals,
				onSetGoal: handleSetBookGoals,
				onSetInitialGoals: handleSetInitialBookGoals,
			}}
		>
			{children}
		</GoalContext.Provider>
	);
};

export const useGoal = () => useContext(GoalContext);
