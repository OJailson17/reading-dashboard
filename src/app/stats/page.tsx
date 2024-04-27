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

import { fetchBooks } from '../actions/fetchBooks';
import { getSession } from '../actions/getSession';
import LoadingScreen from '../loading';

export const metadata: Metadata = {
	title: 'Stats | Reading Dashboard',
};

export default async function Stats() {
	const session = await getSession();

	if (!session) {
		return redirect('/login');
	}

	// Get all books
	const books =
		(await fetchBooks({
			database_id: session.database_id,
		})) || [];

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

						<div className='w-full flex flex-col gap-1 mt-7'>
							<label htmlFor='stats-year' className='text-span'>
								year:
							</label>
							<select
								name='stats-year'
								id='stats-year'
								className='bg-transparent border border-span rounded-md w-full h-10 px-2'
							>
								<option value='2024' className='bg-background text-span'>
									2024
								</option>
								<option value='2023' className='bg-background text-span'>
									2023
								</option>
							</select>
						</div>
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

					<BooksPagesChart books={finishedBooks} />
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
