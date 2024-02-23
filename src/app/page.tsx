import { Header } from '@/components/Header';
import Link from 'next/link';
import { IoIosSearch } from 'react-icons/io';
import { GiBookshelf } from 'react-icons/gi';
import { FinishedStatisticCard } from '@/components/FinishedStatisticsCard';
import { ReadingCard } from '@/components/ReadingCard';
import { TBRCard } from '@/components/TBRCard';
import { FinishedCard } from '@/components/FinishedCard';

export default function Home() {
	return (
		<>
			<Header />

			<div className='w-2/3 max-w-[864px] mt-14 flex items-end justify-between'>
				<div className='w-96 h-10 bg-secondary-background flex items-center justify-center gap-3 pl-5 rounded-full'>
					<IoIosSearch size={25} />
					<input
						type='text'
						placeholder='Search books'
						className='flex-1 h-full bg-transparent rounded-tr-full rounded-br-full px-3 placeholder:text-placeholder placeholder:text-sm outline-none'
					/>
				</div>

				<Link href={'/'} className='flex gap-2 hover:underline'>
					<GiBookshelf size={20} />
					<span className='font-medium text-lg'>Bookshelf</span>
				</Link>
			</div>

			<main className='w-full my-14 flex gap-8'>
				<section className='w-2/3 grid grid-cols-2 gap-x-8 gap-y-6'>
					<FinishedStatisticCard books={{ current: 8, total: 10 }} />
					<FinishedStatisticCard
						card='year'
						books={{ current: 28, total: 50 }}
					/>
					<ReadingCard />
					<TBRCard />
				</section>
				<section className='flex-1'>
					<FinishedCard />
				</section>
			</main>
		</>
	);
}
