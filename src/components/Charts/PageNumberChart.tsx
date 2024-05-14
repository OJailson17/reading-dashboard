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

const booksSizes = {
  small: (pages: number) => pages < 300,
  medium: (pages: number) => pages >= 300 && pages < 500,
  big: (pages: number) => pages >= 500 && pages < 700,
  large: (pages: number) => pages >= 700 && pages < 900,
  extraLarge: (pages: number) => pages >= 900 && pages < 1000,
  gigantic: (pages: number) => pages > 1000,
};

interface BooksPagesDataStructure {
  pages: string;
  amount: number;
}

const calculateBooksPages = (books: Book[]) => {
  const data = [
    {
      pages: '<300',
      amount: 0,
    },
    {
      pages: '300-499',
      amount: 0,
    },
    {
      pages: '500-699',
      amount: 0,
    },
    {
      pages: '>1000',
      amount: 0,
    },
    {
      pages: '900-999',
      amount: 0,
    },
    {
      pages: '700-899',
      amount: 0,
    },
  ];

  resetPageNumberChart(data);

  books.map((book) => {
    if (booksSizes.small(book.total_pages)) {
      data[0].amount += 1;
    }

    if (booksSizes.medium(book.total_pages)) {
      data[1].amount += 1;
    }

    if (booksSizes.big(book.total_pages)) {
      data[2].amount += 1;
    }

    if (booksSizes.large(book.total_pages)) {
      data[5].amount += 1;
    }
    if (booksSizes.extraLarge(book.total_pages)) {
      data[4].amount += 1;
    }
    if (booksSizes.gigantic(book.total_pages)) {
      data[3].amount += 1;
    }
  });

  return data;
};

const resetPageNumberChart = (data: BooksPagesDataStructure[]) => {
  for (const [_, value] of Object.entries(data)) {
    value.amount = 0;
  }
};

export const PageNumberChart = ({ books }: PageNumberChartProps) => {
  const pageNumberChartData = calculateBooksPages(books);

  const itHasBooks = books.length > 0;

  return (
    <div className="min-h-64 w-full rounded-2xl bg-secondary-background pt-6 xs:px-4 sm:max-w-80 sm:px-7">
      <h2 className="text-xl font-bold">Page Number</h2>

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
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="50%"
            data={pageNumberChartData}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="pages" />
            {/* <PolarRadiusAxis /> */}
            <Radar
              dataKey="amount"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
