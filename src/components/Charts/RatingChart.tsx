'use client';

import {
  Bar,
  BarChart,
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
  books.map((book) => {
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

  const itHasBooks = books.length > 0;

  return (
    <div className="w-full flex-1 rounded-2xl bg-secondary-background pb-4 pt-6 xs:px-4 sm:px-7">
      <h2 className="text-xl font-bold">Rating Stars</h2>

      <div className="relative mt-9 h-52 w-full">
        {!itHasBooks && (
          <div className="absolute z-10 flex h-full w-full items-center justify-center">
            <p className="text-center text-lg font-medium text-white">
              Not enough data!
            </p>
          </div>
        )}

        <ResponsiveContainer
          width="100%"
          height="100%"
          style={{ opacity: !itHasBooks ? '20%' : '100%' }}
        >
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
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={CustomTooltip} />
            <Bar dataKey="amount" fill="#8884d8" activeBar={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
