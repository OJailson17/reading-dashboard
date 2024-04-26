'use client';

import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from 'recharts';

import { Book } from '@/@types/book';

import { RenderCustomizedLabel } from './PieChartCustomLabel';

interface FictionNonFictionChartProps {
	books: Book[];
}

const COLORS = ['#FF8042', '#0088FE'];

const calculateAmountOfBooksByGenre = (
	books: Book[],
	genreQuery: 'Fiction' | 'Non-fiction',
) => {
	return books.filter(book =>
		book.genres.some(genre => genre.name === genreQuery),
	).length;
};

export const FictionNonFictionChart = ({
	books,
}: FictionNonFictionChartProps) => {
	const data = [
		{ name: 'Fiction', value: calculateAmountOfBooksByGenre(books, 'Fiction') },
		{
			name: 'Nonfiction',
			value: calculateAmountOfBooksByGenre(books, 'Non-fiction'),
		},
	];

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
							label={RenderCustomizedLabel}
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
