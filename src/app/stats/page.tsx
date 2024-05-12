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
	const readingBooks = books.filter(book => book.status === 'Reading');
	const finishedBooks = books.filter(book => book.status === 'Finished');

	return (
		<Suspense fallback={<LoadingScreen />}>
			<Header />

			<main className='w-full flex flex-col gap-9 max-sm:max-w-md max-sm:mx-auto mt-20 max-w-7xl'>
				<section className='w-full sm:h-48 flex items-center justify-center gap-6 flex-col sm:flex-row'>
					{/* Stats Link Card */}

					<div className='w-full sm:max-w-80 h-full p-6 bg-secondary-background rounded-2xl relative opacity-90'>
						<p className='font-medium text-span'>Reading Stats</p>

						<SelectStatsYear currentTabYear={searchParams.year} />
					</div>

					{/* General Stats Card */}
					<div className='w-full max-w-[490px] h-full p-4 sm:p-6 bg-secondary-background rounded-2xl'>
						<p className='text-span font-medium text-lg'>Year in Books</p>
						<GeneralStats
							finishedBooks={finishedBooks}
							readingBooks={readingBooks}
						/>
					</div>

					{/* Yearly Stats Card */}
					<div className='sm:max-lg:hidden lg:block lg:w-full xl:w-auto'>
						<FinishedStatisticCard
							card='year'
							books={{ current: finishedBooks.length }}
						/>
					</div>
				</section>

				<section className='w-full h-full flex items-start justify-center gap-6 flex-col sm:flex-row'>
					<div className='w-full h-full sm:max-w-80'>
						<GenreStatisticsChart books={finishedBooks} />
					</div>

					<BooksPagesChart books={finishedBooks} tabYear={searchParams.year} />
				</section>

				<section className='w-full h-full flex items-start gap-6 flex-col sm:flex-row flex-wrap sm:max-lg:flex-row-reverse'>
					<FictionNonFictionChart books={finishedBooks} />
					<LanguageChart books={finishedBooks} />
					<PageNumberChart books={finishedBooks} />
				</section>

				<section className='w-full h-full flex items-start justify-center gap-6 flex-col sm:flex-row'>
					<AuthorsChart books={finishedBooks} />
					<RatingChart books={finishedBooks} />
				</section>
			</main>

			<Footer />
		</Suspense>
	);
}
