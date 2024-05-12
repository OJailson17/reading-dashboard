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
		return redirect(applicationLinks.login);
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

	const finishedBooks = books.filter(book => book.status === 'Finished');

	const booksFinishedThisMonth =
		finishedBooksFromThisMonth(finishedBooks).length;

	return (
		<Suspense fallback={<LoadingScreen />}>
			<Header />

			<section className='w-full lg:w-2/3 max-w-[853px] mt-14 flex flex-col sm:flex-row items-end sm:justify-between'>
				<SearchBar books={books} />

				<Link
					href={`${applicationLinks.bookshelf}/?tab=all`}
					className='flex gap-2 mt-8 sm:mt-0 hover:underline'
				>
					<GiBookshelf size={20} />
					<span className='font-medium text-lg'>Bookshelf</span>
				</Link>
			</section>

			<main className='w-full max-w-7xl my-14 flex flex-col lg:flex-row items-start gap-8 lg:max-[1200px]:gap-4 xl:gap-8'>
				<section className='w-full grid grid-cols-1 lg:w-[70%] sm:grid-cols-2 lg:max-[1200px]:gap-x-4 gap-x-8 lg:max-[1200px]:gap-y-4 gap-y-6'>
					<FinishedStatisticCard books={{ current: booksFinishedThisMonth }} />
					<FinishedStatisticCard
						card='year'
						books={{ current: finishedBooks.length }}
					/>
					<ReadingCard books={books} />
					<TBRCard books={books} />
					<YearlyChart books={books} />
				</section>
				<section className='w-full gap-6 lg:max-[1200px]:gap-4 xs:flex xs:flex-col sm:max-[1023px]:grid sm:max-[1023px]:grid-cols-2 xl:w-max-max flex-1'>
					<FinishedCard books={books} />
					<GoalsCard />
					<GenreStatisticsChart books={finishedBooks} />
				</section>
			</main>

			<Footer />
		</Suspense>
	);
}
