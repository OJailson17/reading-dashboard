/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { Book } from '@/@types/book';
import {
	calculateAmountOfDaysToFinish,
	calculateAmountOfReadPages,
	calculateAverageDaysToFinish,
	calculateAveragePages,
	storageStrings,
} from '@/utils';

interface GeneralStatsProps {
	readingBooks: Book[];
	finishedBooks: Book[];
}

interface Stats {
	amountOfPagesRead: number;
	averagesPages: number;
	averageDaysToFinish: number;
	finishedBooks: number;
}

export const GeneralStats = ({
	finishedBooks,
	readingBooks,
}: GeneralStatsProps) => {
	const searchParams = useSearchParams();
	const query = searchParams.get('q');

	let generalStats: Stats = useMemo(() => {
		const amountOfPagesRead = calculateAmountOfReadPages(
			[readingBooks, finishedBooks].flat(),
		);

		const averagesPages = calculateAveragePages({
			amountOfBooks: finishedBooks.length + readingBooks.length,
			amountOfPages: amountOfPagesRead,
		});

		const amountOfDaysToFinish = calculateAmountOfDaysToFinish(finishedBooks);

		const averageDaysToFinish = calculateAverageDaysToFinish({
			amountOfBooks: finishedBooks.length,
			amountOfDays: amountOfDaysToFinish,
		});

		return {
			amountOfPagesRead,
			averagesPages,
			averageDaysToFinish,
			finishedBooks: finishedBooks.length,
		};
	}, [finishedBooks, readingBooks]);

	const [stats, setStats] = useState(generalStats);

	useEffect(() => {
		const getStorageStats = localStorage.getItem(storageStrings.stats);

		// if the user is searching some book, use the storage stats
		if (query) {
			if (getStorageStats) {
				const convertStats = JSON.parse(getStorageStats) as Stats;

				return setStats(convertStats);
			}
		}

		setStats(generalStats);
		localStorage.setItem(storageStrings.stats, JSON.stringify(generalStats));
	}, [generalStats]);

	return (
		<div className='w-full flex items-center justify-between mt-8'>
			<div className='text-center'>
				<p className='text-2xl font-bold'>{stats.finishedBooks}</p>
				<span className='text-sm text-span'>Books Read</span>
			</div>
			<div className='text-center'>
				<p className='text-2xl font-bold'>
					{new Intl.NumberFormat('en-US').format(stats.amountOfPagesRead)}
				</p>
				<span className='text-sm text-span'>Pages Read</span>
			</div>
			<div className='text-center'>
				<p className='text-2xl font-bold'>{stats.averagesPages}</p>
				<span className='text-sm text-span'>Average Pages</span>
			</div>
			<div className='text-center max-xs:hidden'>
				<p className='text-2xl font-bold'>{stats.averageDaysToFinish}</p>
				<span className='text-sm text-span'>Average Days</span>
			</div>
		</div>
	);
};
