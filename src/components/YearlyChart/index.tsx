'use client';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';
import { getYear, isSameMonth } from 'date-fns';

import {
	CharData,
	ChartComponent,
	ChartDataWrapper,
	ChartTitle,
	YearlyChartWrapper,
} from './styles';
import { getLeastAndMostMonthRead } from '@/utils/calculateMostAndLeastMonthsRead';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

const options = {
	responsive: true,
	plugins: {
		title: {
			display: false,
		},
		legend: {
			display: false,
		},
	},
	scales: {
		y: {
			display: false,
		},
		x: {
			grid: {
				drawOnChartArea: false,
			},
		},
	},
	elements: {
		bar: {
			borderRadius: 999,
			backgroundColor: '#32CCBC',
		},
	},
};

type MonthLabel =
	| 'Jan'
	| 'Feb'
	| 'Mar'
	| 'Apr'
	| 'May'
	| 'Jun'
	| 'Jul'
	| 'Aug'
	| 'Sep'
	| 'Oct'
	| 'Nov'
	| 'Dec';

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

interface TitleProperty {
	plain_text: string;
}

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
	// Book quantity in each month
	const monthsBooksQtd = {
		Jan: {
			quantity: 0,
			name: 'January',
		},
		Feb: {
			quantity: 0,
			name: 'February',
		},
		Mar: {
			quantity: 0,
			name: 'March',
		},
		Apr: {
			quantity: 0,
			name: 'April',
		},
		May: {
			quantity: 0,
			name: 'May',
		},
		Jun: {
			quantity: 0,
			name: 'June',
		},
		Jul: {
			quantity: 0,
			name: 'July',
		},
		Aug: {
			quantity: 0,
			name: 'August',
		},
		Sep: {
			quantity: 0,
			name: 'September',
		},
		Oct: {
			quantity: 0,
			name: 'October',
		},
		Nov: {
			quantity: 0,
			name: 'November',
		},
		Dec: {
			quantity: 0,
			name: 'December',
		},
	};

	// It return the current year
	const currentYear = getYear(new Date()); // 2023

	// Got through the book list and check which month the book was finished
	for (let i = 0; i < finished_books.length; i++) {
		monthsLabels.map(label => {
			// Check if the books is from the same month as the current label
			const isMonth = isSameMonth(
				new Date(`${label}, 1, ${currentYear}`),
				new Date(finished_books[i]?.properties['Finished Date']?.date?.start),
			);

			// If the finished date is the same month as the label, add 1 to the books quantity on that month
			if (isMonth) {
				monthsBooksQtd[label].quantity += 1;
			}
		});
	}

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

	// Chart data config
	const data = {
		labels: monthsLabels,
		datasets: [
			{
				data: monthsLabels.map(label => monthsBooksQtd[label].quantity),
				barPercentage: 0.9,
				barThickness: 20,
				maxBarThickness: 30,
				minBarLength: 3,
			},
		],
	};

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
					<Bar options={options} data={data} />
				</ChartComponent>
			</div>
		</YearlyChartWrapper>
	);
};
