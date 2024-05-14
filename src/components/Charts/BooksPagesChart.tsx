'use client';

import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Book } from '@/@types/book';
import { MonthLabel } from '@/@types/chart';
import {
  handleRemoveZeroDigit,
  isSameMonth,
  resetBooksPagesChart,
} from '@/utils';
import { monthsBooksPagesQtd } from '@/utils/charts/yearlyBooksPagesChartData';

import { CustomTooltip } from './CustomTooltip';

interface BooksPagesChartsProps {
  books: Book[];
  tabYear: string;
}

const monthsLabels: MonthLabel[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const getMonthsData = ({
  finishedBooks,
  currentYear,
}: {
  finishedBooks: Book[];
  currentYear: string;
}) => {
  for (let i = 0; i < finishedBooks.length; i++) {
    monthsLabels.map((month) => {
      const isFromSameMonth = isSameMonth({
        monthDate: new Date(`${month}, 1, ${currentYear}`),
        bookDate: new Date(
          handleRemoveZeroDigit(finishedBooks[i].finished_date || ''),
        ),
      });

      if (isFromSameMonth) {
        monthsBooksPagesQtd[month].books += 1;
        monthsBooksPagesQtd[month].pages += finishedBooks[i].total_pages;
      }
    });
  }
};

export const BooksPagesChart = ({ books, tabYear }: BooksPagesChartsProps) => {
  resetBooksPagesChart();

  getMonthsData({ finishedBooks: books, currentYear: tabYear });

  const chartData = monthsLabels.map((month) => ({
    month: monthsBooksPagesQtd[month].month,
    books: monthsBooksPagesQtd[month].books,
    pages: monthsBooksPagesQtd[month].pages,
  }));

  // hide the default props warning
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  const itHasBooks = books.length > 0;

  return (
    <div className="w-full flex-1 rounded-2xl bg-secondary-background pb-4 pt-6 xs:px-4 sm:px-7">
      <h2 className="text-xl font-bold">Amount of Books and Page</h2>

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
          <LineChart
            width={500}
            height={300}
            data={chartData}
            margin={{ top: 5, right: 0, left: -10, bottom: 5 }}
          >
            <XAxis dataKey="month" axisLine={false} />
            <YAxis axisLine={false} />
            <Tooltip content={CustomTooltip} />
            <Legend />
            <Line
              type="monotone"
              dataKey="books"
              dot={false}
              stroke="#8884d8"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="pages"
              dot={false}
              stroke="#5CDAC3"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
