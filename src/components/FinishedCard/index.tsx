import Image from 'next/image';
import Link from 'next/link';

export const FinishedCard = () => {
	return (
		<div className='w-full min-h-[314px] px-7 py-6 bg-secondary-background rounded-2xl'>
			<header className='flex items-center justify-between'>
				<h2 className='font-bold text-xl'>Just Finished</h2>
				<Link href={'/'} className='text-span text-sm hover:underline'>
					see all
				</Link>
			</header>

			<div className='w-[320px] h-full mt-10 px-1 pb-6 pt-1 flex gap-6 white overflow-x-scroll overflow-y-hidden books-container'>
				{[...new Array(4)].map((el, i) => (
					<button
						key={`${el}-${i}`}
						className='min-w-28 h-40 rounded-md p-1.5 bg-purple'
					>
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
					</button>
				))}
			</div>
		</div>
	);
};
