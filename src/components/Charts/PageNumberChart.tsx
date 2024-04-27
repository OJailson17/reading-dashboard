'use client';

import {
	PolarAngleAxis,
	PolarGrid,
	Radar,
	RadarChart,
	ResponsiveContainer,
} from 'recharts';

import { Book } from '@/@types/book';

interface PageNumberChartProps {
	books: Book[];
}

const pageNumberChartData = [
	{
		subject: '<300',
		amount: 0,
	},
	{
		subject: '300-499',
		amount: 0,
	},
	{
		subject: '500-699',
		amount: 0,
	},
	{
		subject: '>1000',
		amount: 0,
	},
	{
		subject: '900-999',
		amount: 0,
	},
	{
		subject: '700-899',
		amount: 0,
	},
];

const booksSizes = {
	small: (pages: number) => pages < 300,
	medium: (pages: number) => pages >= 300 && pages < 500,
	big: (pages: number) => pages >= 500 && pages < 700,
	large: (pages: number) => pages >= 700 && pages < 900,
	extraLarge: (pages: number) => pages >= 900 && pages < 1000,
	gigantic: (pages: number) => pages > 1000,
};

const calculateBooksPages = (books: Book[]) => {
	books.map(book => {
		if (booksSizes.small(book.total_pages)) {
			pageNumberChartData[0].amount += 1;
		}

		if (booksSizes.medium(book.total_pages)) {
			pageNumberChartData[1].amount += 1;
		}

		if (booksSizes.big(book.total_pages)) {
			pageNumberChartData[2].amount += 1;
		}

		if (booksSizes.large(book.total_pages)) {
			pageNumberChartData[5].amount += 1;
		}
		if (booksSizes.extraLarge(book.total_pages)) {
			pageNumberChartData[4].amount += 1;
		}
		if (booksSizes.gigantic(book.total_pages)) {
			pageNumberChartData[3].amount += 1;
		}

		return;
	});
};

const resetPageNumberChart = () => {
	for (const [_, value] of Object.entries(pageNumberChartData)) {
		value.amount = 0;
	}
};

export const PageNumberChart = ({ books }: PageNumberChartProps) => {
	resetPageNumberChart();

	calculateBooksPages(books);

	return (
		<div className='w-full sm:max-w-80 min-h-64 xs:px-4 sm:px-7 pt-6 bg-secondary-background rounded-2xl'>
			<h2 className='font-bold text-xl'>Page Number</h2>

			{/* chart */}
			<div className='w-full h-64 flex mx-auto'>
				<ResponsiveContainer width='100%' height='100%'>
					<RadarChart
						cx='50%'
						cy='50%'
						outerRadius='50%'
						data={pageNumberChartData}
					>
						<PolarGrid />
						<PolarAngleAxis dataKey='subject' />
						{/* <PolarRadiusAxis /> */}
						<Radar
							dataKey='amount'
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
