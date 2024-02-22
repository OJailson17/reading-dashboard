import Link from 'next/link';
import { TBRBookStats } from './TBRBookStats';

export const TBRCard = () => {
	return (
		<div className='w-full max-w-[403px] min-h-[384px] px-8 py-6 bg-secondary-background rounded-2xl'>
			<header className='flex items-end justify-between'>
				<h2 className='font-bold text-2xl'>want to read</h2>
				<Link href={'/'} className='text-span text-sm hover:underline'>
					see all
				</Link>
			</header>

			<div className='h-60 mt-10 pr-3 space-y-6 overflow-y-auto books-container'>
				{[...new Array(6)].map((el, i) => (
					<TBRBookStats key={`${el}-${i}`} />
				))}
			</div>
		</div>
	);
};
