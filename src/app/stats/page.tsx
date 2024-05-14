import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { AuthorsChart } from '@/components/Charts/AuthorsChart';
import { BooksPagesChart } from '@/components/Charts/BooksPagesChart';
import { FictionNonFictionChart } from '@/components/Charts/FictionNonFictionChart';
import { GenreStatisticsChart } from '@/components/Charts/GenreStatisticChart';
import { LanguageChart } from '@/components/Charts/LanguageChart';
import { PageNumberChart } from '@/components/Charts/PageNumberChart';
import { RatingChart } from '@/components/Charts/RatingChart';
import { YearlyChart } from '@/components/Charts/YearlyChart';
import { FinishedStatisticCard } from '@/components/FinishedStatisticsCard';
import { Footer } from '@/components/Footer';
import { GeneralStats } from '@/components/GeneralStats';
import { Header } from '@/components/Header';
import { SelectStatsYear } from '@/components/SelectStatsYear';
import { applicationLinks } from '@/utils/constants/links';
import { formatBooks } from '@/utils/formatting/formatBook';

import { getSession } from '../actions/getSession';
import LoadingScreen from '../loading';

export const metadata: Metadata = {
  title: 'Stats | Reading Dashboard',
};

interface StatsRequestProps {
  searchParams: {
    year: string;
  };
}

const getSelectYearsOptions = () => {
  const currentYear = new Date().getUTCFullYear();
  const startYear = 2022;
  const years: number[] = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  return years;
};

export default async function Stats({ searchParams }: StatsRequestProps) {
  const session = await getSession();

  if (!session) {
    return redirect(applicationLinks.login);
  }

  // If the tab param doesn't match with one of the options, select all as default
  const currentYear = new Date().getUTCFullYear();

  const yearsOptions = getSelectYearsOptions();

  if (!searchParams.year || !yearsOptions.includes(Number(searchParams.year))) {
    redirect(`${applicationLinks.stats}/?year=${currentYear}`);
  }

  const fetchBooksByYear = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/book/stats?db=${session.database_id}&year=${searchParams.year}`,
        {
          next: {
            revalidate: false,
            tags: ['fetch-book-stats'],
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const books = await response.json();

      const formattedBooks = formatBooks(books);

      return formattedBooks;
    } catch (err) {
      console.log(err);
    }
  };

  // Get all books
  const books = (await fetchBooksByYear()) || [];

  // Filter books for each status
  const readingBooks = books.filter((book) => book.status === 'Reading');
  const finishedBooks = books.filter((book) => book.status === 'Finished');

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Header />

      <main className="mt-20 flex w-full max-w-7xl flex-col gap-9 max-sm:mx-auto max-sm:max-w-md">
        <section className="flex w-full flex-col items-center justify-center gap-6 sm:h-48 sm:flex-row">
          {/* Stats Link Card */}

          <div className="relative h-full w-full rounded-2xl bg-secondary-background p-6 opacity-90 sm:max-w-80">
            <p className="font-medium text-span">Reading Stats</p>

            <SelectStatsYear currentTabYear={searchParams.year} />
          </div>

          {/* General Stats Card */}
          <div className="h-full w-full max-w-[490px] rounded-2xl bg-secondary-background p-4 sm:p-6">
            <p className="text-lg font-medium text-span">Year in Books</p>
            <GeneralStats
              finishedBooks={finishedBooks}
              readingBooks={readingBooks}
            />
          </div>

          {/* Yearly Stats Card */}
          <div className="sm:max-lg:hidden lg:block lg:w-full xl:w-auto">
            <FinishedStatisticCard
              card="year"
              books={{ current: finishedBooks.length }}
            />
          </div>
        </section>

        <section className="flex h-full w-full flex-col items-start justify-center gap-6 sm:flex-row">
          <div className="h-full w-full sm:max-w-80">
            <GenreStatisticsChart books={finishedBooks} />
          </div>

          <BooksPagesChart books={finishedBooks} tabYear={searchParams.year} />
        </section>

        <section className="flex h-full w-full flex-col flex-wrap items-start gap-6 sm:flex-row sm:max-lg:flex-row-reverse">
          <FictionNonFictionChart books={finishedBooks} />
          <LanguageChart books={finishedBooks} />
          <PageNumberChart books={finishedBooks} />
        </section>

        <section className="flex h-full w-full flex-col items-start justify-center gap-6 sm:flex-row">
          <AuthorsChart books={finishedBooks} />
          <RatingChart books={finishedBooks} />
        </section>
      </main>

      <Footer />
    </Suspense>
  );
}
