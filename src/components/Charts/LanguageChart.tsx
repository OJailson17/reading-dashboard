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

import { Book, BookLanguages } from '@/@types/book';

interface LanguageChartProps {
	books: Book[];
}

const calculateBooksPerLanguage = (books: Book[], language: BookLanguages) => {
	return books.filter(book => book.language === language).length;
};

export const LanguageChart = ({ books }: LanguageChartProps) => {
	const languageData = [
		{
			language: 'Portuguese',
			amount: calculateBooksPerLanguage(books, 'Portuguese'),
		},
		{
			language: 'English',
			amount: calculateBooksPerLanguage(books, 'English'),
		},
		{
			language: 'Spanish',
			amount: calculateBooksPerLanguage(books, 'Spanish'),
		},
	];
	return (
		<div className='w-full flex-1 xs:px-4 sm:px-7 pt-6 pb-4 rounded-2xl bg-secondary-background'>
			<h2 className='font-bold text-xl'>Languages</h2>

			<div className='w-full h-52 mt-9'>
				<ResponsiveContainer width='100%' height='100%'>
					<ComposedChart
						layout='vertical'
						width={500}
						height={400}
						data={languageData}
						margin={{
							top: 20,
							right: 0,
							bottom: 20,
							left: 40,
						}}
					>
						<XAxis type='number' />
						<YAxis dataKey='language' type='category' scale='auto' />
						<Tooltip />
						<Bar dataKey='amount' barSize={25} fill='#8884d8' />
					</ComposedChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};
