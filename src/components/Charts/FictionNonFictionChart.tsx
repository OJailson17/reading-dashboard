'use client';

import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from 'recharts';

const data = [
	{ name: 'Fiction', value: 10 },
	{ name: 'Nonfiction', value: 15 },
];

const COLORS = ['#0088FE', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	index,
}: any) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill='white'
			textAnchor={x > cx ? 'start' : 'end'}
			dominantBaseline='central'
		>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

export const FictionNonFictionChart = () => {
	return (
		<div className='w-full sm:max-lg:hidden lg:max-w-80 min-h-64 xs:px-4 sm:px-7 pt-6 bg-secondary-background rounded-2xl'>
			<h2 className='font-bold text-xl'>Fiction/Nonfiction</h2>

			{/* chart */}
			<div className='w-full h-64 flex mx-auto'>
				<ResponsiveContainer width='100%' height='100%'>
					<PieChart width={400} height={400}>
						<Tooltip />
						<Legend />
						<Pie
							data={data}
							cx='50%'
							cy='50%'
							labelLine={false}
							label={renderCustomizedLabel}
							outerRadius={80}
							fill='#8884d8'
							dataKey='value'
						>
							{data.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};
