import { Suspense } from 'react';
import LoadingScreen from '../loading';
import { Header } from '@/components/Header';
import { FinishedStatisticCard } from '@/components/FinishedStatisticsCard';
import { FaPlus } from 'react-icons/fa6';
import { StatisticSvg } from '@/components/StatsIcon';
import { Footer } from '@/components/Footer';
import { BookShelfTable } from '@/components/BookShelfTable';
import { SelectFilter } from '@/components/SelectFilter';
import { getUser } from '../actions/getUser';
import { redirect } from 'next/navigation';
import { fetchBooks } from '../actions/fetchBooks';
import { finishedBooksFromThisMonth } from '@/utils/calculateFinishedBooks';

export default async function Bookshelf() {
	const user = await getUser();

	if (!user.token || !user.user_database) {
		redirect('/login');
	}

	const books = (await fetchBooks({ database_id: user.user_database })) || [];

	const toReadBooks = books.filter(book => book.status === 'To read');
	const readingBooks = books.filter(book => book.status === 'Reading');
	const finishedBooks = books.filter(book => book.status === 'Finished');
	const toReviewBooks = books.filter(book => book.review === 'none');

	const booksFinishedThisMonth =
		finishedBooksFromThisMonth(finishedBooks).length;

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
						<div className='w-full flex items-center justify-between mt-8'>
							<div className='text-center'>
								<p className='text-2xl font-bold'>22</p>
								<span className='text-sm text-span'>Books Read</span>
							</div>
							<div className='text-center'>
								<p className='text-2xl font-bold'>7,562</p>
								<span className='text-sm text-span'>Pages Read</span>
							</div>
							<div className='text-center'>
								<p className='text-2xl font-bold'>342</p>
								<span className='text-sm text-span'>Average Pages</span>
							</div>
							<div className='text-center max-xs:hidden'>
								<p className='text-2xl font-bold'>30</p>
								<span className='text-sm text-span'>Average Days</span>
							</div>
						</div>
					</div>

					{/* Yearly Stats Card */}
					<div className='hidden lg:block lg:w-full xl:w-auto'>
						<FinishedStatisticCard
							card='year'
							books={{ current: booksFinishedThisMonth }}
						/>
					</div>
				</section>

				<section className='w-full mt-9 flex justify-center gap-6 flex-col lg:flex-row'>
					{/* Navbar */}
					<div className='flex flex-col items-center justify-center gap-9 sm:max-lg:gap-3 sm:max-lg:flex-row'>
						<div className='w-full lg:w-80 sm:max-lg:w-48 bg-secondary-background p-6 rounded-2xl'>
							<h3 className='font-bold text-xl sm:max-lg:hidden'>Bookshelf</h3>
							<button className='w-full py-3 px-3 bg-purple mt-9 sm:max-lg:mt-0 flex items-center justify-center gap-3 font-medium text-lg rounded-lg'>
								<FaPlus />
								Add Book
							</button>
						</div>

						<div className='sm:w-80 flex-1 w-full h-full bg-secondary-background rounded-2xl py-8 px-4 gap-9 flex items-center justify-center flex-col'>
							<div className='w-full h-full flex flex-col sm:max-lg:flex-row items-center justify-between	 text-sm lg:text-lg font-bold text-white max-sm:hidden'>
								<button className='max-sm:w-40 rounded-lg'>
									<p className='bg-gradient-primary text-transparent bg-clip-text'>
										All Books ({books.length})
									</p>
								</button>
								<button className=' max-sm:w-40 rounded-lg'>
									<p>To Read ({toReadBooks.length})</p>
								</button>
								<button className=' max-sm:w-40 rounded-lg'>
									<p>Reading ({readingBooks.length})</p>
								</button>
								<button className=' max-sm:w-40 rounded-lg'>
									<p>Finished ({finishedBooks.length})</p>
								</button>
								<button className=' max-sm:w-40 rounded-lg'>
									<p>To Review ({toReviewBooks.length})</p>
								</button>
							</div>

							<h3 className='font-bold text-xl sm:hidden self-start'>Filter</h3>

							<SelectFilter />
						</div>
					</div>

					{/* Books Result */}
					<div className='flex-1 h-full max-h-[622px] bg-secondary-background rounded-2xl py-8 px-4 sm:px-6 '>
						<div className='w-full flex items-center justify-between'>
							<h3 className='font-bold text-xl'>All Books</h3>
						</div>

						<div className='w-full  h-[500px] mt-4 overflow-y-auto overflow-x-hidden books-container'>
							<BookShelfTable books={books} />
							{/* <p className='text-span font-bold text-center text-lg'>
								There is nothing here :(
							</p> */}
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</Suspense>
	);
}
