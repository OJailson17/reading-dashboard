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

import { CustomTooltip } from './CustomTooltip';

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

	const itHasBooks = books.length > 0;

	return (
		<div className='w-full flex-1 xs:px-4 sm:px-7 pt-6 pb-4 rounded-2xl bg-secondary-background'>
			<h2 className='font-bold text-xl'>Languages</h2>

			<div className='w-full h-52 mt-9 relative'>
				{!itHasBooks && (
					<div className='w-full h-full flex items-center justify-center absolute z-10'>
						<p className='text-center font-medium text-lg text-white'>
							Not enough data!
						</p>
					</div>
				)}

				<ResponsiveContainer
					width='100%'
					height='100%'
					style={{ opacity: !itHasBooks ? '20%' : '100%' }}
				>
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
						<Tooltip content={CustomTooltip} />
						<Bar dataKey='amount' barSize={25} fill='#8884d8' />
					</ComposedChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};
