'use client';

import { calculatePercentage } from '@/utils/calculatePercentage';
import { CircularProgressBar } from '../CircularProgressBar';
import { useEffect, useState } from 'react';
import { localStorageStrings } from '@/utils/constants/localStorageStrings';
import { useBook } from '@/context/BookContext';

interface Book {
	current: number;
}

interface FinishedStatisticCardProps {
	card?: 'month' | 'year';
	books: Book;
}

export const FinishedStatisticCard = ({
	card = 'month',
	books,
}: FinishedStatisticCardProps) => {
	const [booksTotalGoal, setBooksTotalGoal] = useState('0');
	const [goalPercentage, setGoalPercentage] = useState(0);

	const { bookGoals } = useBook();

	useEffect(() => {
		if (card === 'month') {
			setBooksTotalGoal(bookGoals.month);
		} else {
			setBooksTotalGoal(bookGoals.year);
		}

		if (Number(booksTotalGoal) <= 0) {
			return setGoalPercentage(0);
		}

		const finishedPercentage = calculatePercentage({
			total: Number(booksTotalGoal),
			value: books.current,
		});

		setGoalPercentage(finishedPercentage);
		console.log('rendered');
	}, [bookGoals, books, booksTotalGoal, card]);

	return (
		<div className='max-w-[403px] h-48 px-8 lg:px-3 xl:px-8 bg-secondary-background flex items-center justify-center gap-6 rounded-2xl'>
			<CircularProgressBar bar_percentage={goalPercentage} />

			<div className='text-span flex-1 lg:text-sm xl:text-base'>
				<p>
					<span className='font-bold'>{books.current}</span>/{booksTotalGoal}
				</p>

				{card === 'month' && <p>books read this month</p>}
				{card === 'year' && (
					<p>
						books completed to <span className='font-bold'>year</span> challenge
					</p>
				)}
			</div>
		</div>
	);
};
