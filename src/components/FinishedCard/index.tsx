import Image from 'next/image';
import Link from 'next/link';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { BookDialog } from '../BookDialog';

export const FinishedCard = () => {
	return (
		<div className='w-full min-h-[314px] xs:px-4 sm:px-7 py-6 bg-secondary-background rounded-2xl sm:col-span-2'>
			<header className='flex items-center justify-between'>
				<h2 className='font-bold text-xl'>Just Finished</h2>
				<Link href={'/'} className='text-span text-sm hover:underline'>
					see all
				</Link>
			</header>

			<div className='sm:w-full lg:max-w-[320px] mt-10 px-1 pb-6 pt-1 flex gap-6 white overflow-x-auto overflow-y-hidden books-container'>
				{[...new Array(4)].map((el, i) => (
					<Dialog key={`${el}-${i}`}>
						<DialogTrigger className='min-w-28 h-40 rounded-md p-1.5 bg-purple'>
							<div className='w-full h-full relative'>
								<Image
									src={
										'https://m.media-amazon.com/images/I/51M9IbBqxCL._AC_UF1000,1000_QL80_.jpg'
									}
									alt='book cover'
									fill
									className='object-contain'
								/>
							</div>
						</DialogTrigger>
						<BookDialog type='finished' />
					</Dialog>
				))}
			</div>
		</div>
	);
};
