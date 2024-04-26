'use client';

import {
	Bar,
	ComposedChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

const data = [
	{
		name: 'J. K. Rowling',
		pv: 4,
	},
	{
		name: 'John Green',
		pv: 2,
	},
	{
		name: 'Gabriel Wyner',
		pv: 1,
	},
	{
		name: 'Jessica Pan',
		pv: 1,
	},
];

export const AuthorsChart = () => {
	return (
		<div className='w-full flex-1 xs:px-4 sm:px-7 pt-6 pb-4 rounded-2xl bg-secondary-background'>
			<h2 className='font-bold text-xl'>Most Read Authors</h2>

			<div className='w-full h-52 mt-9'>
				<ResponsiveContainer width='100%' height='100%'>
					<ComposedChart
						layout='vertical'
						width={550}
						height={450}
						data={data}
						margin={{
							top: 20,
							right: 0,
							bottom: 20,
							left: 0,
						}}
					>
						<XAxis type='number' />
						<YAxis
							dataKey='name'
							type='category'
							scale='auto'
							fontSize={14}
							width={100}
						/>
						<Tooltip />
						<Bar dataKey='pv' barSize={25} fill='#8884d8' />
					</ComposedChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};
