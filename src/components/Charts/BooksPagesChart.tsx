'use client';

import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

import { CustomTooltip } from './CustomTooltip';

const data = [
	{
		name: 'Page A',
		pages: 4000,
		books: 2400,
		amt: 2400,
	},
	{
		name: 'Page B',
		pages: 3000,
		books: 1398,
		amt: 2210,
	},
	{
		name: 'Page C',
		pages: 2000,
		books: 9800,
		amt: 2290,
	},
	{
		name: 'Page D',
		pages: 2780,
		books: 3908,
		amt: 2000,
	},
	{
		name: 'Page E',
		pages: 1890,
		books: 4800,
		amt: 2181,
	},
	{
		name: 'Page F',
		pages: 2390,
		books: 3800,
		amt: 2500,
	},
	{
		name: 'Page G',
		pages: 3490,
		books: 4300,
		amt: 2100,
	},
];

export const BooksPagesChart = () => {
	return (
		<div className='w-full flex-1 px-9 pt-6 pb-4 rounded-2xl bg-secondary-background'>
			<h2 className='font-bold text-xl'>Amount of Books and Page</h2>

			<div className='w-full h-52 mt-9'>
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart
						width={500}
						height={300}
						data={data}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
					>
						<XAxis dataKey='name' />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line
							type='monotone'
							dataKey='books'
							dot={false}
							stroke='#8884d8'
						/>
						<Line
							type='monotone'
							dataKey='pages'
							dot={false}
							stroke='#5CDAC3'
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};
