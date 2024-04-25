'use client';

import {
	Bar,
	ComposedChart,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

const data = [
	{
		name: 'Portuguese',
		pv: 12,
	},
	{
		name: 'English',
		pv: 8,
	},
	{
		name: 'Spanish',
		pv: 2,
	},
];

export const LanguageChart = () => {
	return (
		<div className='w-full flex-1 px-9 pt-6 pb-4 rounded-2xl bg-secondary-background'>
			<h2 className='font-bold text-xl'>Languages</h2>

			<div className='w-full h-52 mt-9'>
				<ResponsiveContainer width='100%' height='100%'>
					<ComposedChart
						layout='vertical'
						width={500}
						height={400}
						data={data}
						margin={{
							top: 20,
							right: 0,
							bottom: 20,
							left: 40,
						}}
					>
						<XAxis type='number' />
						<YAxis dataKey='name' type='category' scale='band' />
						<Tooltip />
						<Bar dataKey='pv' barSize={20} fill='#8884d8' />
					</ComposedChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};
