import { Suspense } from 'react';
import LoadingScreen from '../loading';
import { Header } from '@/components/Header';
import { FinishedStatisticCard } from '@/components/FinishedStatisticsCard';
import { FaPlus } from 'react-icons/fa6';
import { StatisticSvg } from '@/components/StatsIcon';
import { Footer } from '@/components/Footer';
import { BookShelfTable } from '@/components/BookShelfTable';
import { SelectTabFilter } from '@/components/SelectFilter';
import { getUser } from '../actions/getUser';
import { redirect } from 'next/navigation';
import { fetchBooks } from '../actions/fetchBooks';
import { finishedBooksFromThisMonth } from '@/utils/calculateFinishedBooks';
import { GeneralStats } from '@/components/GeneralStats';
import { BookshelfNav } from '@/components/BookshelfNav';
import Link from 'next/link';

export type Tab = 'all' | 'tbr' | 'reading' | 'finished' | 'review';

interface BookshelfRequestProps {
	searchParams: {
		tab: Tab;
	};
}

export default async function Bookshelf({
	searchParams,
}: BookshelfRequestProps) {
	const user = await getUser();

	if (!user.token || !user.user_database) {
		redirect('/login');
	}

	// If the tab param doesn't match with one of the options, select all as default
	const tabValues: Tab[] = ['all', 'tbr', 'reading', 'finished', 'review'];

	if (!searchParams.tab || !tabValues.includes(searchParams.tab)) {
		redirect('/bookshelf/?tab=all');
	}

	// Get all books
	const books = (await fetchBooks({ database_id: user.user_database })) || [];

	// Filter books for each status
	const toReadBooks = books.filter(book => book.status === 'To read');
	const readingBooks = books.filter(book => book.status === 'Reading');
	const finishedBooks = books.filter(book => book.status === 'Finished');
	const toReviewBooks = books.filter(
		book => book.status === 'Finished' && book.review === 'none',
	);

	const booksFinishedThisMonth =
		finishedBooksFromThisMonth(finishedBooks).length;

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

	return (
		<Suspense fallback={<LoadingScreen />}>
			<Header />

			<main className='w-full max-sm:max-w-md max-sm:mx-auto mt-20 max-w-7xl'>
				<section className='w-full sm:h-48 flex items-center justify-center gap-6 flex-col sm:flex-row'>
					{/* Stats Link Card */}
					<div className='w-full sm:max-w-80 h-full p-6 bg-secondary-background rounded-2xl relative opacity-90'>
						<div className='w-full h-full bg-purple/90 absolute left-0 top-0 rounded-2xl flex items-center justify-center  '>
							<p className='text-white font-bold text-lg'>Coming soon</p>
						</div>
						<p className='font-medium text-span'>Reading Stats</p>

						<div className='w-full flex items-center justify-start max-sm:gap-16 sm:justify-between mt-8'>
							<StatisticSvg />

							<div className='flex flex-col items-center justify-center gap-4'>
								<p className='text-sm font-medium'>Reading over the year</p>
								<button className='py-2 px-4 rounded-md border border-purple flex items-center justify-center'>
									View Stats
								</button>
							</div>
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
					<div className='hidden lg:block lg:w-full xl:w-auto'>
						<FinishedStatisticCard
							card='year'
							books={{ current: finishedBooks.length }}
						/>
					</div>
				</section>

				<section className='w-full mt-9 flex justify-center gap-6 flex-col lg:flex-row'>
					{/* Navbar */}
					<div className='flex flex-col items-center justify-center gap-9 sm:max-lg:gap-3 sm:max-lg:flex-row'>
						<div className='w-full lg:w-80 sm:max-lg:w-48 bg-secondary-background p-6 rounded-2xl'>
							<h3 className='font-bold text-xl sm:max-lg:hidden'>Bookshelf</h3>
							<Link
								href={'/book/create'}
								className='w-full py-3 px-3 bg-purple mt-9 sm:max-lg:mt-0 flex items-center justify-center gap-3 font-medium text-lg rounded-lg'
							>
								<FaPlus />
								Add Book
							</Link>
						</div>

						<div className='sm:w-80 flex-1 w-full h-full bg-secondary-background rounded-2xl py-8 px-4 gap-9 flex items-center justify-center flex-col'>
							<BookshelfNav
								booksAmount={booksAmount}
								currentTab={searchParams.tab}
							/>

							<h3 className='font-bold text-xl sm:hidden self-start'>Filter</h3>

							<SelectTabFilter
								currentTab={searchParams.tab}
								tabName={tabsOptions[searchParams.tab].name}
								booksAmount={booksAmount}
							/>
						</div>
					</div>

					{/* Books Result */}
					<div className='flex-1 h-full max-h-[622px] bg-secondary-background rounded-2xl py-8 px-4 sm:px-6 '>
						<div className='w-full flex items-center justify-between'>
							<h3 className='font-bold text-xl'>
								{tabsOptions[searchParams.tab].name}
							</h3>
						</div>

						<div className='w-full  h-[500px] mt-4 overflow-y-auto overflow-x-hidden books-container'>
							<BookShelfTable books={tabsOptions[searchParams.tab].list} />
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</Suspense>
	);
}
