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

import { CustomTooltip } from './CustomTooltip';
import { RenderCustomizedLabel } from './PieChartCustomLabel';

interface FictionNonFictionChartProps {
  books: Book[];
}

const COLORS = ['#FF8042', '#0088FE'];

const calculateAmountOfBooksByGenre = (
  books: Book[],
  genreQuery: 'Fiction' | 'Non-fiction',
) => {
  return books.filter((book) =>
    book.genres.some((genre) => genre.name === genreQuery),
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

  const itHasBooks = books.length > 0;

  return (
    <div className="min-h-64 w-full rounded-2xl bg-secondary-background pt-6 xs:px-4 sm:px-7 sm:max-lg:hidden lg:max-w-80">
      <h2 className="text-xl font-bold">Fiction/Nonfiction</h2>

      {/* chart */}
      <div className="relative mx-auto flex h-64 w-full">
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
          <PieChart width={400} height={400}>
            <Tooltip content={CustomTooltip} />
            <Legend />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={RenderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
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
