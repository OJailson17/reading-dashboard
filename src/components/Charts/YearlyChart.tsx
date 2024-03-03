'use client';

import {
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { CustomTooltip } from './CustomTooltip';
import { MonthLabel } from '@/@types/chart';
import { fetchBooks } from '@/app/actions/fetchBooks';
import isSameMonth from '@/utils/isSameMonth';
import { Book } from '@/@types/book';

interface YearlyChartProps {
	books: Book[];
}

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

const data = [
	{
		month: 'Jan',
		amount: 3,
	},
	{
		month: 'Feb',
		amount: 0,
	},
	{
		month: 'Mar',
		amount: 2,
	},
	{
		month: 'Apr',
		amount: 4,
	},
	{
		month: 'May',
		amount: 2,
	},
	{
		month: 'Jun',
		amount: 3,
	},
	{
		month: 'Jul',
		amount: 4,
	},
	{
		month: 'Aug',
		amount: 1,
	},
	{
		month: 'Sep',
		amount: 5,
	},
	{
		month: 'Oct',
		amount: 3,
	},
	{
		month: 'Nov',
		amount: 4,
	},
	{
		month: 'Dec',
		amount: 3,
	},
];

export const YearlyChart = ({ books }: YearlyChartProps) => {
	const finishedBooks = books.filter(book => book.status === 'Finished');

	const currentYear = new Date().getUTCFullYear(); // 2024

	// Got through the book list and check which month the book was finished
	// for (let i = 0; i < finishedBooks.length; i++) {
	// 	monthsLabels.map(label => {
	// 		// Check if the books is from the same month as the current label
	// 		const isMonth = isSameMonth({
	// 			monthDate: new Date(`${label}, 1, ${currentYear}`),
	// 			bookDate: new Date(
	// 				finishedBooks[i]?.properties['Finished Date']?.date?.start,
	// 			),
	// 		});

	// 		// If the finished date is the same month as the label, add 1 to the books quantity on that month
	// 		if (isMonth) {
	// 			monthsBooksQtd[label].quantity += 1;
	// 		}
	// 	});
	// }

	// const chartData = monthsLabels.map(label => ({
	// 	month: monthsBooksQtd[label].name,
	// 	amount: monthsBooksQtd[label].quantity,
	// }));

	return (
		<div className='w-full sm:col-span-2 h-80 px-4 xl:px-7 py-6 bg-secondary-background rounded-2xl'>
			<header className='flex items-center justify-between'>
				<h2 className='font-bold text-xl'>Reading Activity</h2>
				{/* <Select defaultValue='2024'>
					<SelectTrigger className='w-60'>
						<SelectValue placeholder='2024' />
					</SelectTrigger>

					<SelectContent className='bg-background'>
						<SelectGroup className='bg-background text-span'>
							<SelectItem value='2024'>2024</SelectItem>
							<SelectItem value='2023'>2023</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select> */}
				<span className='text-span text-sm'>2024</span>
			</header>

			<main className='w-full h-52 mt-9'>
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 5,
							right: 0,
							left: -30,
							bottom: 5,
						}}
					>
						<XAxis dataKey='month' axisLine={false} />
						<YAxis axisLine={false} />
						<Tooltip content={CustomTooltip} cursor={false} />
						<Line
							type='monotone'
							dataKey='amount'
							stroke='#8884d8'
							strokeWidth={3}
							dot={false}
						/>
					</LineChart>
				</ResponsiveContainer>
			</main>
		</div>
	);
};
