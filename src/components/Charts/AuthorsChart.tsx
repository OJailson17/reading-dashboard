'use client';

import {
	Bar,
	ComposedChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

import { Book } from '@/@types/book';

interface AuthorsChartProps {
	books: Book[];
}

function authorsFrequencyList(authors: string[]) {
	let frequency: Record<string, number> = {};

	// Count genre frequencies
	for (let i = 0; i < authors.length; i++) {
		let currentName = authors[i];
		frequency[currentName] = (frequency[currentName] || 0) + 1;
	}

	// Convert to an array of objects with name, color, and frequency
	const genreFrequencyList = Object.keys(frequency).map(name => ({
		author: name,
		books: frequency[name],
	}));

	// Sort by genre frequency
	genreFrequencyList.sort((a, b) => b.books - a.books);

	return genreFrequencyList;
}

export const AuthorsChart = ({ books }: AuthorsChartProps) => {
	const authorsList = books.map(book => book.author);

	const authorsData = authorsFrequencyList(authorsList).slice(0, 4);

	return (
		<div className='w-full flex-1 xs:px-4 sm:px-7 pt-6 pb-4 rounded-2xl bg-secondary-background'>
			<h2 className='font-bold text-xl'>Most Read Authors</h2>

			<div className='w-full h-52 mt-9'>
				<ResponsiveContainer width='100%' height='100%'>
					<ComposedChart
						layout='vertical'
						width={550}
						height={450}
						data={authorsData}
						margin={{
							top: 20,
							right: 0,
							bottom: 20,
							left: 0,
						}}
					>
						<XAxis type='number' />
						<YAxis
							dataKey='author'
							type='category'
							scale='auto'
							fontSize={14}
							width={100}
						/>
						<Tooltip />
						<Bar dataKey='books' barSize={25} fill='#8884d8' />
					</ComposedChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};
