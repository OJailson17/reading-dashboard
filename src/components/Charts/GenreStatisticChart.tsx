'use client';

import {
	Legend,
	RadialBar,
	RadialBarChart,
	ResponsiveContainer,
} from 'recharts';

const data = [
	{
		name: 'Fantasy',
		uv: 31.47,
		pv: 2400,
		fill: '#5E3A91',
	},
	{
		name: 'Non Fiction',
		uv: 26.69,
		pv: 4567,
		fill: '#739DDC',
	},
	{
		name: 'Adventure',
		uv: 15.69,
		pv: 1398,
		fill: '#739DDC',
	},
	{
		name: 'History',
		uv: 15,
		pv: 1398,
		fill: 'orange',
	},
];

const style = {
	top: '50%',
	right: 0,
	transform: 'translate(0, -50%)',
	lineHeight: '1.5',
};

export const GenreStatisticsChart = () => {
	return (
		<div className='w-full min-h-[314px] px-7 py-6 bg-secondary-background rounded-2xl'>
			<h2 className='font-bold text-xl'>Most Reading Genres</h2>

			{/* chart */}
			<div className='w-11/12 h-64 flex mx-auto'>
				<ResponsiveContainer width='100%' height='100%'>
					<RadialBarChart
						cx='30%'
						cy='50%'
						innerRadius='10%'
						outerRadius='50%'
						barSize={5}
						data={data}
					>
						<RadialBar background={{ fill: '#0E102E' }} dataKey='uv' />
						<Legend
							iconSize={10}
							layout='vertical'
							verticalAlign='middle'
							wrapperStyle={style}
							iconType='circle'
						/>
					</RadialBarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};
