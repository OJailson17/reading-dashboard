import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense, cache } from 'react';
import { FaPlus } from 'react-icons/fa6';

import { BookShelfTable } from '@/components/BookShelfTable';
import { BookshelfNav } from '@/components/BookshelfNav';
import { BookshelfSearch } from '@/components/BookshelfSearch';
import { FinishedStatisticCard } from '@/components/FinishedStatisticsCard';
import { Footer } from '@/components/Footer';
import { GeneralStats } from '@/components/GeneralStats';
import { Header } from '@/components/Header';
import { SelectTabFilter } from '@/components/SelectFilter';
import { StatisticSvg } from '@/components/StatsIcon';
import { applicationLinks } from '@/utils/constants/links';
import { formatBooks } from '@/utils/formatting/formatBook';

import { getSession } from '../actions/getSession';
import LoadingScreen from '../loading';

export type Tab = 'all' | 'tbr' | 'reading' | 'finished' | 'review';

interface BookshelfRequestProps {
  searchParams: {
    tab: Tab;
    q?: string;
  };
}

export const metadata: Metadata = {
  title: 'Bookshelf | Reading Dashboard',
};

export default async function Bookshelf({
  searchParams,
}: BookshelfRequestProps) {
  const session = await getSession();

  if (!session) {
    return redirect(applicationLinks.login);
  }

  // If the tab param doesn't match with one of the options, select all as default
  const tabValues: Tab[] = ['all', 'tbr', 'reading', 'finished', 'review'];

  if (!searchParams.tab || !tabValues.includes(searchParams.tab)) {
    redirect(`${applicationLinks.bookshelf}/?tab=all`);
  }

  const fetchBooks = cache(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/book?db=${
          session.database_id
        }&period=${searchParams.q ? 'any_time' : 'this_year'}`,
        {
          next: {
            revalidate: false,
            tags: ['fetch-books'],
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const bookResponse = await response.json();

      const formattedBooks = formatBooks(bookResponse);

      if (searchParams.q) {
        const findBooks = formattedBooks.filter((book) =>
          book.title
            .toLowerCase()
            .includes(String(searchParams.q).toLowerCase()),
        );

        if (findBooks.length <= 0) {
          return [];
        }

        return findBooks;
      }

      return formattedBooks;
    } catch (err) {
      console.log(err);
    }
  });

  const books = (await fetchBooks()) || [];

  // Filter books for each status
  const toReadBooks = books.filter((book) => book.status === 'To read');
  const readingBooks = books.filter((book) => book.status === 'Reading');
  const finishedBooks = books.filter((book) => book.status === 'Finished');
  const toReviewBooks = books.filter(
    (book) => book.status === 'Finished' && book.review === 'none',
  );

  // const booksFinishedThisMonth =
  // 	finishedBooksFromThisMonth(finishedBooks).length;

  // Get the amount of books from each status
  const booksAmount = {
    amountOfAllBooks: books.length,
    amountOfToReadBooks: toReadBooks.length,
    amountOfReadingBooks: readingBooks.length,
    amountOfFinishedBooks: finishedBooks.length,
    amountOfToReviewBooks: toReviewBooks.length,
  };

  const tabsOptions = {
    all: {
      list: books,
      name: 'All Books',
    },
    tbr: {
      list: toReadBooks,
      name: 'To Read',
    },
    reading: {
      list: readingBooks,
      name: 'Reading',
    },
    finished: {
      list: finishedBooks,
      name: 'Finished',
    },
    review: {
      list: toReviewBooks,
      name: 'To Review',
    },
  };

  // used for show the year on stas card
  const currentYear = new Date().getFullYear();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Header />

      <main className="mt-20 w-full max-w-7xl max-sm:mx-auto max-sm:max-w-md">
        <section className="flex w-full flex-col items-center justify-center gap-6 sm:h-48 sm:flex-row">
          {/* Stats Link Card */}
          <div className="relative h-full w-full rounded-2xl bg-secondary-background p-6 opacity-90 sm:max-w-80">
            <p className="font-medium text-span">Reading Stats</p>

            <div className="mt-8 flex w-full items-center justify-start max-sm:gap-16 sm:justify-between">
              <div className="flex h-[71px] w-full max-w-[75px] flex-col items-center justify-center gap-2 rounded-md bg-gradient-secondary">
                <span className="font-medium text-background">
                  {currentYear}
                </span>

                <StatisticSvg />
              </div>

              <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-sm font-medium">Reading over the year</p>
                <Link
                  href={`${applicationLinks.stats}/?year=${currentYear}`}
                  className="flex items-center justify-center rounded-md border border-purple px-4 py-2"
                >
                  View Stats
                </Link>
              </div>
            </div>
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
          <div className="hidden lg:block lg:w-full xl:w-auto">
            <FinishedStatisticCard
              card="year"
              books={{ current: finishedBooks.length }}
            />
          </div>
        </section>

        <section className="mt-9 flex w-full flex-col justify-center gap-6 lg:flex-row">
          {/* Navbar */}
          <div className="flex flex-col items-center justify-center gap-9 sm:max-lg:flex-row sm:max-lg:gap-3">
            <div className="w-full rounded-2xl bg-secondary-background p-6 sm:max-lg:w-48 lg:w-80">
              <h3 className="text-xl font-bold sm:max-lg:hidden">Bookshelf</h3>
              <Link
                href={applicationLinks.createBook}
                className="mt-9 flex w-full items-center justify-center gap-3 rounded-lg bg-purple px-3 py-3 text-lg font-medium sm:max-lg:mt-0"
              >
                <FaPlus />
                Add Book
              </Link>
            </div>

            <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-9 rounded-2xl bg-secondary-background px-4 py-8 sm:w-80">
              <BookshelfNav
                booksAmount={booksAmount}
                currentTab={searchParams.tab}
                query={searchParams.q || ''}
              />

              <h3 className="self-start text-xl font-bold sm:hidden">Filter</h3>

              <SelectTabFilter
                currentTab={searchParams.tab}
                tabName={tabsOptions[searchParams.tab].name}
                booksAmount={booksAmount}
                query={searchParams.q || ''}
              />
            </div>
          </div>

          {/* Books Result */}
          <div className="h-full max-h-[622px] flex-1 rounded-2xl bg-secondary-background px-4 py-8 sm:px-6 ">
            <div className="flex w-full flex-col items-start justify-between max-sm:gap-4 sm:flex-row">
              <h3 className="text-xl font-bold">
                {tabsOptions[searchParams.tab].name}
              </h3>

              <BookshelfSearch />
            </div>

            <div className="books-container mt-4 h-[500px] w-full overflow-y-auto overflow-x-hidden max-sm:mt-2 max-sm:h-[470px]">
              <BookShelfTable books={tabsOptions[searchParams.tab].list} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </Suspense>
  );
}
