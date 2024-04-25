'use client';

import {
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart,
	ResponsiveContainer,
} from 'recharts';

const data = [
	{
		subject: '<300',
		A: 120,
		B: 110,
		fullMark: 150,
	},
	{
		subject: '300-499',
		A: 98,
		B: 130,
		fullMark: 150,
	},
	{
		subject: '500-699',
		A: 86,
		B: 130,
		fullMark: 150,
	},
	{
		subject: '>1000',
		A: 99,
		B: 100,
		fullMark: 150,
	},
	{
		subject: '900-999',
		A: 85,
		B: 90,
		fullMark: 150,
	},
	{
		subject: '700-899',
		A: 65,
		B: 85,
		fullMark: 150,
	},
];

export const PageNumberChart = () => {
	return (
		<div className='w-full sm:max-w-80 min-h-64 xs:px-4 sm:px-7 pt-6 bg-secondary-background rounded-2xl'>
			<h2 className='font-bold text-xl'>Page Number</h2>

			{/* chart */}
			<div className='w-full h-64 flex mx-auto'>
				<ResponsiveContainer width='100%' height='100%'>
					<RadarChart cx='50%' cy='50%' outerRadius='50%' data={data}>
						<PolarGrid />
						<PolarAngleAxis dataKey='subject' />
						{/* <PolarRadiusAxis /> */}
						<Radar
							dataKey='A'
							stroke='#8884d8'
							fill='#8884d8'
							fillOpacity={0.6}
						/>
					</RadarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};
