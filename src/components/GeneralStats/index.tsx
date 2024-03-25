'use client';

import { Book } from '@/@types/book';
import { calculateAmountOfDaysToFinish } from '@/utils/calculateAmountOfDaysToFinish';
import { calculateAmountOfReadPages } from '@/utils/calculateAmountOfReadPages';
import { calculateAverageDaysToFinish } from '@/utils/calculateAverageDaysToFinish';
import { calculateAveragePages } from '@/utils/calculateAveragePagesRead';
import { useMemo } from 'react';

interface GeneralStatsProps {
	readingBooks: Book[];
	finishedBooks: Book[];
}

export const GeneralStats = ({
	finishedBooks,
	readingBooks,
}: GeneralStatsProps) => {
	const amountOfPagesRead = useMemo(
		() => calculateAmountOfReadPages([readingBooks, finishedBooks].flat()),
		[finishedBooks, readingBooks],
	);

	const averagesPages = useMemo(
		() =>
			calculateAveragePages({
				amountOfBooks: finishedBooks.length + readingBooks.length,
				amountOfPages: amountOfPagesRead,
			}),
		[amountOfPagesRead, finishedBooks.length, readingBooks.length],
	);

	const amountOfDaysToFinish = useMemo(
		() => calculateAmountOfDaysToFinish(finishedBooks),
		[finishedBooks],
	);

	const averageDaysToFinish = useMemo(
		() =>
			calculateAverageDaysToFinish({
				amountOfBooks: finishedBooks.length,
				amountOfDays: amountOfDaysToFinish,
			}),
		[amountOfDaysToFinish, finishedBooks.length],
	);

	return (
		<div className='w-full flex items-center justify-between mt-8'>
			<div className='text-center'>
				<p className='text-2xl font-bold'>{finishedBooks.length}</p>
				<span className='text-sm text-span'>Books Read</span>
			</div>
			<div className='text-center'>
				<p className='text-2xl font-bold'>
					{new Intl.NumberFormat('en-US').format(amountOfPagesRead)}
				</p>
				<span className='text-sm text-span'>Pages Read</span>
			</div>
			<div className='text-center'>
				<p className='text-2xl font-bold'>{averagesPages}</p>
				<span className='text-sm text-span'>Average Pages</span>
			</div>
			<div className='text-center max-xs:hidden'>
				<p className='text-2xl font-bold'>{averageDaysToFinish}</p>
				<span className='text-sm text-span'>Average Days</span>
			</div>
		</div>
	);
};
