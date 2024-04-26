'use client';

import {
	Bar,
	BarChart,
	Rectangle,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

const data = [
	{
		name: '1 star',
		uv: 4000,
		pv: 1,
		amt: 2400,
	},
	{
		name: '2 stars',
		uv: 3000,
		pv: 2,
		amt: 2210,
	},
	{
		name: '3 stars',
		uv: 2000,
		pv: 2,
		amt: 2290,
	},
	{
		name: '4 stars',
		uv: 2780,
		pv: 12,
		amt: 2000,
	},
	{
		name: '5 stars',
		uv: 1890,
		pv: 5,
		amt: 2181,
	},
];

const CustomizedBar = () => {
	return <div className='bg-red-500 w-2 h-2' />;
};

export const RatingChart = () => {
	return (
		<div className='w-full flex-1 xs:px-4 sm:px-7 pt-6 pb-4 rounded-2xl bg-secondary-background'>
			<h2 className='font-bold text-xl'>Rating Stars</h2>

			<div className='w-full h-52 mt-9'>
				<ResponsiveContainer width='100%' height='100%'>
					<BarChart
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
						<XAxis dataKey='name' />
						<YAxis />
						<Tooltip />
						<Bar dataKey='pv' fill='#8884d8' activeBar={false} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};
