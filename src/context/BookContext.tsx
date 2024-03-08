'use client';

import { storageStrings } from '@/utils/constants/storageStrings';
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

interface BookContextProviderProps {
	children: ReactNode;
}

interface Goal {
	month: string;
	year: string;
}

interface BookContextProps {
	bookGoals: Goal;
	onSetGoal: (goal: string, period: 'month' | 'year') => void;
}

const BookContext = createContext({} as BookContextProps);

export const BookContextProvider = ({ children }: BookContextProviderProps) => {
	const [bookGoals, setBookGoals] = useState({
		month: '0',
		year: '0',
	});

	const handleSetBookGoals = (goal: string, period: 'month' | 'year') => {
		if (period === 'month') {
			localStorage.setItem(
				storageStrings.goals,
				JSON.stringify({
					...bookGoals,
					month: goal,
				}),
			);

			return setBookGoals(oldData => {
				return {
					...oldData,
					month: goal,
				};
			});
		}

		localStorage.setItem(
			storageStrings.goals,
			JSON.stringify({
				...bookGoals,
				year: goal,
			}),
		);
		return setBookGoals(oldData => {
			return {
				...oldData,
				year: goal,
			};
		});
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const goals = localStorage.getItem(storageStrings.goals);

			if (goals) {
				setBookGoals(JSON.parse(goals));
			}
		}
	}, []);

	return (
		<BookContext.Provider value={{ bookGoals, onSetGoal: handleSetBookGoals }}>
			{children}
		</BookContext.Provider>
	);
};

export const useBook = () => useContext(BookContext);
