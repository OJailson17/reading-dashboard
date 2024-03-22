import { Suspense } from 'react';
import LoadingScreen from '../loading';
import { Header } from '@/components/Header';
import { FinishedStatisticCard } from '@/components/FinishedStatisticsCard';
import { FaPlus } from 'react-icons/fa6';
import { StatisticSvg } from '@/components/StatsIcon';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { IoStar } from 'react-icons/io5';
import { BookShelfTable } from '@/components/BookShelfTable';

export default function Bookshelf() {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<Header />

			<main className='mt-20 max-w-7xl'>
				<section className='w-full h-48 flex items-center justify-center gap-6'>
					{/* Stats Link Card */}
					<div className='w-full max-w-80 h-full p-6 bg-secondary-background rounded-2xl relative opacity-90'>
						<div className='w-full h-full bg-purple/90 absolute left-0 top-0 rounded-2xl flex items-center justify-center  '>
							<p className='text-white font-bold text-lg'>Coming soon</p>
						</div>
						<p className='font-medium text-span'>Reading Stats</p>

						<div className='w-full flex justify-between mt-8'>
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
					<div className='w-full max-w-[490px] h-full p-6 bg-secondary-background rounded-2xl'>
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
							<div className='text-center'>
								<p className='text-2xl font-bold'>30</p>
								<span className='text-sm text-span'>Average Days</span>
							</div>
						</div>
					</div>

					{/* Yearly Stats Card */}
					<FinishedStatisticCard card='year' books={{ current: 10 }} />
				</section>

				<section className='mt-9 flex justify-center gap-6'>
					{/* Navbar */}
					<div className='flex flex-col items-center justify-center gap-9'>
						<div className='w-80 bg-secondary-background p-6 rounded-2xl'>
							<h3 className='font-bold text-xl'>Bookshelf</h3>
							<button className='w-full py-3 px-3 bg-purple mt-9 flex items-center justify-center gap-3 font-medium text-lg rounded-lg'>
								<FaPlus />
								Add Book
							</button>
						</div>

						<div className='w-80 flex flex-col items-center justify-center bg-secondary-background rounded-2xl py-8 gap-8 text-lg font-bold text-white'>
							<button className='rounded-lg p-2 bg-transparent'>
								<p className='bg-gradient-primary text-transparent bg-clip-text'>
									All Books (54)
								</p>
							</button>
							<button className='rounded-lg p-2 bg-transparent'>
								<p>To Read (30)</p>
							</button>
							<button className='rounded-lg p-2 bg-transparent'>
								<p>Reading (3)</p>
							</button>
							<button className='rounded-lg p-2 bg-transparent'>
								<p>Finished (18)</p>
							</button>
							<button className='rounded-lg p-2 bg-transparent'>
								<p>To Review (3)</p>
							</button>
						</div>
					</div>

					{/* Books Result */}
					<div className='flex-1 h-full max-h-[622px] bg-secondary-background rounded-2xl py-8 px-6 '>
						<div className='w-full flex items-center justify-between'>
							<h3 className='font-bold text-xl'>All Books</h3>
						</div>

						<div className='w-full  h-[500px] mt-4 overflow-y-auto overflow-x-hidden books-container'>
							<BookShelfTable />
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
