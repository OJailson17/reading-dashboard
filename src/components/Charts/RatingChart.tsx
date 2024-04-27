'use client';

import {
	Bar,
	BarChart,
	Rectangle,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

import { Book } from '@/@types/book';
import { calculateAmountOfRatingStars } from '@/utils';

import { CustomTooltip } from './CustomTooltip';

const chartDataStructure = [
	{
		name: '1 star',
		amount: 0,
	},
	{
		name: '2 stars',
		amount: 0,
	},
	{
		name: '3 stars',
		amount: 0,
	},
	{
		name: '4 stars',
		amount: 0,
	},
	{
		name: '5 stars',
		amount: 0,
	},
];

interface RatingChartProps {
	books: Book[];
}

let rating: any = {
	1: 0,
	2: 0,
	3: 0,
	4: 0,
	5: 0,
};

const generateChartData = (books: Book[]) => {
	books.map(book => {
		const { amountOfYellowStars } = calculateAmountOfRatingStars(
			book.review && book.review !== 'none' ? book.review.length : 0,
		);

		if (amountOfYellowStars === 0) return;

		rating[amountOfYellowStars] += 1;
	});
};

const resetRatingData = () => {
	return {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
	};
};

export const RatingChart = ({ books }: RatingChartProps) => {
	rating = resetRatingData();

	generateChartData(books);

	const ratingChartData = chartDataStructure.map((data, index) => ({
		name: data.name,
		amount: rating[index + 1],
	}));

	return (
		<div className='w-full flex-1 xs:px-4 sm:px-7 pt-6 pb-4 rounded-2xl bg-secondary-background'>
			<h2 className='font-bold text-xl'>Rating Stars</h2>

			<div className='w-full h-52 mt-9'>
				<ResponsiveContainer width='100%' height='100%'>
					<BarChart
						width={500}
						height={300}
						data={ratingChartData}
						margin={{
							top: 5,
							right: 0,
							left: -30,
							bottom: 5,
						}}
					>
						<XAxis dataKey='name' />
						<YAxis />
						<Tooltip content={CustomTooltip} />
						<Bar dataKey='amount' fill='#8884d8' activeBar={false} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};
