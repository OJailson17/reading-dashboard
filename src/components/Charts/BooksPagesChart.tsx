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
		name: 'Jan',
		pages: 800,
		books: 389,
		amt: 2400,
	},
	{
		name: 'Feb',
		pages: 300,
		books: 139,
		amt: 2210,
	},
	{
		name: 'Mar',
		pages: 200,
		books: 980,
		amt: 2290,
	},
	{
		name: 'Apr',
		pages: 278,
		books: 398,
		amt: 2000,
	},
	{
		name: 'Jun',
		pages: 189,
		books: 480,
		amt: 2181,
	},
	{
		name: 'Jul',
		pages: 239,
		books: 380,
		amt: 2500,
	},
	{
		name: 'Aug',
		pages: 349,
		books: 430,
		amt: 2100,
	},
	{
		name: 'Sep',
		pages: 200,
		books: 980,
		amt: 2100,
	},
	{
		name: 'Oct',
		pages: 349,
		books: 430,
		amt: 2100,
	},
	{
		name: 'Nov',
		pages: 349,
		books: 40,
		amt: 2100,
	},
	{
		name: 'Dec',
		pages: 800,
		books: 389,
		amt: 2100,
	},
];

export const BooksPagesChart = () => {
	return (
		<div className='w-full flex-1 xs:px-4 sm:px-7 pt-6 pb-4 rounded-2xl bg-secondary-background'>
			<h2 className='font-bold text-xl'>Amount of Books and Page</h2>

			<div className='w-full h-52 mt-9'>
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart
						width={500}
						height={300}
						data={data}
						margin={{ top: 5, right: 0, left: -10, bottom: 5 }}
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
