'use client';

import { useEffect, useState } from 'react';
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

import { CustomTooltip } from './CustomToolTip';
import { getLeastAndMostMonthRead } from '@/helpers/calculateMostAndLeastMonthsRead';
import isSameMonth from '@/helpers/isSameMonth';

import { useBook } from '@/context/BookContext';

import {
	CharData,
	ChartComponent,
	ChartDataWrapper,
	ChartTitle,
	YearlyChartWrapper,
} from './styles';
import { monthsBooksQtd, resetMonthsQtd } from '@/utils/monthsBooksQtd';
import { MonthLabel } from '@/@types/chartTypes';

const monthsLabels: MonthLabel[] = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

interface Book {
	object: string;
	id: string;
	properties: {
		'Finished Date': {
			id: string;
			type: string;
			date: {
				start: string;
			};
		};
	};
}

interface YearlyChartProps {
	finished_books: Book[];
}

export const YearlyChart = ({ finished_books }: YearlyChartProps) => {
	const [allFinishedBooks, setAllFinishedBooks] =
		useState<Book[]>(finished_books);

	const { books } = useBook();

	const currentYear = new Date().getUTCFullYear(); // 2023

	// Reset the quantity of books on each month
	resetMonthsQtd();

	// Got through the book list and check which month the book was finished
	for (let i = 0; i < allFinishedBooks.length; i++) {
		monthsLabels.map(label => {
			// Check if the books is from the same month as the current label
			const isMonth = isSameMonth({
				monthDate: new Date(`${label}, 1, ${currentYear}`),
				bookDate: new Date(
					allFinishedBooks[i]?.properties['Finished Date']?.date?.start,
				),
			});

			// If the finished date is the same month as the label, add 1 to the books quantity on that month
			if (isMonth) {
				monthsBooksQtd[label].quantity += 1;
			}
		});
	}

	console.log({ booksQTD: monthsBooksQtd.Jan });

	// Get the quantity of each book and push into the amount of books array
	const amountOfBooks: number[] = [];
	for (const [_, value] of Object.entries(monthsBooksQtd)) {
		amountOfBooks.push(value.quantity);
	}

	// Get the least and the most books reads
	const { leastBooksReadMonth, mostBooksReadMonth } = getLeastAndMostMonthRead({
		amountOfBooks,
		monthsBooksQuantity: monthsBooksQtd,
	});

	// If the list changes, update the chart with the updated data
	useEffect(() => {
		const filterBooks = books?.filter(
			book => book.properties.Status.select.name === 'Finished',
		);

		if (books && books.length > 0) {
			setAllFinishedBooks(filterBooks || []);
		}
	}, [books]);

	const chartData = monthsLabels.map(label => ({
		label: monthsBooksQtd[label].name,
		quantity: monthsBooksQtd[label].quantity,
	}));

	return (
		<YearlyChartWrapper>
			<ChartTitle>Books Read by Month</ChartTitle>

			<div className='chart-container'>
				<ChartDataWrapper>
					<CharData>
						<div>
							<GoTriangleUp size={15} color='#28C76F' />
							<span>More books read</span>
						</div>
						<p className='month'>{mostBooksReadMonth}</p>
					</CharData>
					<CharData>
						<div>
							<GoTriangleDown size={15} color='#EA5455' />
							<span>Less books read</span>
						</div>
						<p className='month'>{leastBooksReadMonth}</p>
					</CharData>
				</ChartDataWrapper>

				<ChartComponent>
					<ResponsiveContainer width='100%' height='100%'>
						<BarChart width={450} height={250} data={chartData}>
							<XAxis dataKey='label' />
							<Bar
								dataKey='quantity'
								fill='#1677ff'
								barSize={20}
								radius={[20, 20, 0, 0]}
								minPointSize={2}
								maxBarSize={30}
							/>
							<Tooltip
								content={CustomTooltip}
								cursor={{ fill: 'transparent' }}
							/>
						</BarChart>
					</ResponsiveContainer>
				</ChartComponent>
			</div>
		</YearlyChartWrapper>
	);
};
