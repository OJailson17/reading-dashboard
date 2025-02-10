import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { GiBookshelf } from 'react-icons/gi';

import { Book } from '@/@types/book';
import { GenreStatisticsChart } from '@/components/Charts/GenreStatisticChart';
import { YearlyChart } from '@/components/Charts/YearlyChart';
import { FinishedCard } from '@/components/FinishedCard';
import { FinishedStatisticCard } from '@/components/FinishedStatisticsCard';
import { Footer } from '@/components/Footer';
import { SearchBar } from '@/components/Forms/SearchBarForm';
import { GoalsCard } from '@/components/GoalsCard';
import { Header } from '@/components/Header';
import { ReadingCard } from '@/components/ReadingCard';
import { TBRCard } from '@/components/TBRCard';
import { finishedBooksFromThisMonth } from '@/utils';
import { applicationLinks } from '@/utils/constants/links';
import { formatBooks } from '@/utils/formatting/formatBook';

import { getSession } from './actions/getSession';
import LoadingScreen from './loading';

export default async function Home() {
  const session = await getSession();

  if (!session) {
    return;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/book?db=${session.database_id}&period=this_year`,
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

  const books = formatBooks(bookResponse);

  const finishedBooks = books.filter((book) => book.status === 'Finished');

  const booksFinishedThisMonth =
    finishedBooksFromThisMonth(finishedBooks).length;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Header />

      <section className="mt-14 flex w-full max-w-[853px] flex-col items-end sm:flex-row sm:justify-between lg:w-2/3">
        <SearchBar books={books} />

        <Link
          href={`${applicationLinks.bookshelf}/?tab=all`}
          className="mt-8 flex gap-2 hover:underline sm:mt-0"
        >
          <GiBookshelf size={20} />
          <span className="text-lg font-medium">Bookshelf</span>
        </Link>
      </section>

      <main className="my-14 flex w-full max-w-7xl flex-col items-start gap-8 lg:flex-row lg:max-[1200px]:gap-4 xl:gap-8">
        <section className="grid w-full grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:w-[70%] lg:max-[1200px]:gap-x-4 lg:max-[1200px]:gap-y-4">
          <FinishedStatisticCard books={{ current: booksFinishedThisMonth }} />
          <FinishedStatisticCard
            card="year"
            books={{ current: finishedBooks.length }}
          />
          <ReadingCard books={books} />
          <TBRCard books={books} />
          <YearlyChart books={books} />
        </section>
        <section className="xl:w-max-max w-full flex-1 gap-6 xs:flex xs:flex-col sm:max-[1023px]:grid sm:max-[1023px]:grid-cols-2 lg:max-[1200px]:gap-4">
          <FinishedCard books={books} />
          <GoalsCard />
          <GenreStatisticsChart books={finishedBooks} />
        </section>
      </main>

      <Footer />
    </Suspense>
  );
}
