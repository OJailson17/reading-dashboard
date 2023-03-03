'use client';

import { ChartDataWrapper, StatusComponent } from '@/styles/common';
import { DonutComponent } from '../Donut';

interface BookStatusProps {
	amountOfBooks: number;
	amountOfFinishedBooks: number;
}

export const BookStatus = ({
	amountOfBooks,
	amountOfFinishedBooks,
}: BookStatusProps) => {
	// Calculate the percentage of read books
	const percentageOfReadBooks = Math.floor(
		(amountOfFinishedBooks / amountOfBooks) * 100,
	);

	return (
		<StatusComponent>
			<p className='status-component-title'>Books Read</p>

			<span className='status-component-description'>
				All books on the to read list
			</span>

			<DonutComponent read_percentage={percentageOfReadBooks} />

			<ChartDataWrapper>
				<div className='chart-data'>
					<div className='circle-data'></div>
					<p className='chart-label'>Total Books</p>
					<span className='chart-data-value'>{amountOfBooks}</span>
				</div>
				<div className='chart-data'>
					<div className='circle'></div>
					<p className='chart-label'>Finished Books</p>
					<span className='chart-data-value'>{amountOfFinishedBooks}</span>
				</div>
			</ChartDataWrapper>
		</StatusComponent>
	);
};
