'use client';

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Book } from '@/@types/book';
import { MonthLabel } from '@/@types/chart';
import { monthsBooksQtd, resetYearlyChart } from '@/utils';
import { handleRemoveZeroDigit } from '@/utils/formatting/formatDate';
import { isSameMonth } from '@/utils/validations/validateIsSameMonth';

import { CustomTooltip } from './CustomTooltip';

interface YearlyChartProps {
  books: Book[];
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

const getBookMonths = ({ finishedBooks }: { finishedBooks: Book[] }) => {
  const currentYear = new Date().getUTCFullYear(); // 2024

  for (let i = 0; i < finishedBooks.length; i++) {
    monthsLabels.map((month) => {
      const isFromSameMonth = isSameMonth({
        monthDate: new Date(`${month}, 1, ${currentYear}`),
        bookDate: new Date(
          handleRemoveZeroDigit(finishedBooks[i].finished_date || ''),
        ),
      });

      if (isFromSameMonth) {
        monthsBooksQtd[month].amount += 1;
      }
    });
  }

  // console.log({ monthsBooksQtd });
};

export const YearlyChart = ({ books }: YearlyChartProps) => {
  const finishedBooks = books.filter((book) => book.status === 'Finished');

  // Reset the quantity of books on each month
  resetYearlyChart();

  // Got through the book list and check which month the book was finished
  getBookMonths({ finishedBooks });

  const chartData = monthsLabels.map((month) => ({
    month: monthsBooksQtd[month].month,
    amount: monthsBooksQtd[month].amount,
  }));

  // hide the default props warning
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  const itHasBooks = books.length > 0;
  const currentYear = new Date().getUTCFullYear();

  return (
    <div className="h-80 w-full rounded-2xl bg-secondary-background px-4 py-6 sm:col-span-2 xl:px-7">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Reading Activity</h2>
        {/* <Select defaultValue='2024'>
					<SelectTrigger className='w-60'>
						<SelectValue placeholder='2024' />
					</SelectTrigger>

					<SelectContent className='bg-background'>
						<SelectGroup className='bg-background text-span'>
							<SelectItem value='2024'>2024</SelectItem>
							<SelectItem value='2023'>2023</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select> */}
        <span className="text-sm text-span">{currentYear}</span>
      </header>

      <main className="relative mt-9 h-52 w-full">
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
            margin={{
              top: 5,
              right: 0,
              left: -30,
              bottom: 5,
            }}
          >
            <XAxis dataKey="month" axisLine={false} />
            <YAxis axisLine={false} />
            <Tooltip content={CustomTooltip} cursor={false} />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </main>
    </div>
  );
};
