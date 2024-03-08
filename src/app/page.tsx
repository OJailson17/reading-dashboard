import { Header } from '@/components/Header';
import Link from 'next/link';
import { IoIosSearch } from 'react-icons/io';
import { GiBookshelf } from 'react-icons/gi';
import { FinishedStatisticCard } from '@/components/FinishedStatisticsCard';
import { ReadingCard } from '@/components/ReadingCard';
import { TBRCard } from '@/components/TBRCard';
import { FinishedCard } from '@/components/FinishedCard';
import { GoalsCard } from '@/components/GoalsCard';
import { GenreStatisticsChart } from '@/components/Charts/GenreStatisticChart';
import { YearlyChart } from '@/components/Charts/YearlyChart';
import { Footer } from '@/components/Footer';
import { fetchBooks } from './actions/fetchBooks';
import { getUser } from './actions/getUser';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import LoadingScreen from './loading';

export default async function Home() {
	const user = await getUser();

	if (!user.token || !user.user_database) {
		redirect('/login');
	}

	const books = (await fetchBooks({ database_id: user.user_database })) || [];

	const finishedBooks = books.filter(book => book.status === 'Finished');

	return (
		<Suspense fallback={<LoadingScreen />}>
			<Header />

			<section className='w-full lg:w-2/3 max-w-[853px] mt-14 flex flex-col sm:flex-row items-end sm:justify-between'>
				<form className='w-full xs:max-[500px]:h-12 sm:w-96 h-10 bg-secondary-background flex items-center justify-center gap-3 pl-5 rounded-full'>
					<IoIosSearch size={25} />
					<input
						type='text'
						placeholder='Search books'
						className='w-full h-full bg-transparent rounded-tr-full rounded-br-full px-3 placeholder:text-placeholder placeholder:text-sm outline-none'
					/>
				</form>

				<Link href={'/'} className='flex gap-2 mt-8 sm:mt-0 hover:underline'>
					<GiBookshelf size={20} />
					<span className='font-medium text-lg'>Bookshelf</span>
				</Link>
			</section>

			<main className='w-full max-w-7xl my-14 flex flex-col lg:flex-row items-start gap-8 lg:max-[1200px]:gap-4 xl:gap-8'>
				<section className='w-full grid grid-cols-1 lg:w-[70%] sm:grid-cols-2 lg:max-[1200px]:gap-x-4 gap-x-8 lg:max-[1200px]:gap-y-4 gap-y-6'>
					<FinishedStatisticCard books={{ current: finishedBooks.length }} />
					<FinishedStatisticCard
						card='year'
						books={{ current: finishedBooks.length }}
					/>
					<ReadingCard />
					<TBRCard />
					<YearlyChart books={books} />
				</section>
				<section className='w-full gap-6 lg:max-[1200px]:gap-4 xs:flex xs:flex-col sm:max-[1023px]:grid sm:max-[1023px]:grid-cols-2 xl:w-max-max flex-1'>
					<FinishedCard />
					<GoalsCard />
					<GenreStatisticsChart />
				</section>
			</main>

			<Footer />
		</Suspense>
	);
}
