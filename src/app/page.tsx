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

export default function Home() {
	return (
		<>
			<Header />

			<section className='w-2/3 max-w-[853px] mt-14 flex items-end  justify-between'>
				<form className='w-96 h-10 bg-secondary-background flex items-center justify-center gap-3 pl-5 rounded-full'>
					<IoIosSearch size={25} />
					<input
						type='text'
						placeholder='Search books'
						className='flex-1 h-full bg-transparent rounded-tr-full rounded-br-full px-3 placeholder:text-placeholder placeholder:text-sm outline-none'
					/>
				</form>

				<Link href={'/'} className='flex gap-2 hover:underline'>
					<GiBookshelf size={20} />
					<span className='font-medium text-lg'>Bookshelf</span>
				</Link>
			</section>

			<main className='w-full max-w-7xl my-14 flex items-start gap-8'>
				<section className='w-2/3 grid grid-cols-2 gap-x-8 gap-y-6'>
					<FinishedStatisticCard books={{ current: 8, total: 10 }} />
					<FinishedStatisticCard
						card='year'
						books={{ current: 28, total: 50 }}
					/>
					<ReadingCard />
					<TBRCard />
					<YearlyChart />
				</section>
				<section className='flex-1 flex flex-col gap-6'>
					<FinishedCard />
					<GoalsCard />
					<GenreStatisticsChart />
				</section>
			</main>

			<Footer />
		</>
	);
}
