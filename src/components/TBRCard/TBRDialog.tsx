import Image from 'next/image';
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
} from '../ui/dialog';

export const TBRDialog = () => {
	return (
		<DialogContent className='bg-background max-w-[450px] rounded-3xl border-none px-9 py-6 flex items-center justify-center flex-col'>
			<DialogTitle className='text-center font-semibold text-lg mt-5'>
				Fluent Forever
			</DialogTitle>

			<div className='w-full max-w-28 h-40 rounded-md p-1.5 mt-4 bg-purple'>
				<div className='h-full relative'>
					<Image
						src={
							'https://m.media-amazon.com/images/I/51M9IbBqxCL._AC_UF1000,1000_QL80_.jpg'
						}
						alt='book cover'
						fill
						className='object-contain'
					/>
				</div>
			</div>

			<div className='w-full flex flex-col mt-7 space-y-3'>
				<div className='space-x-3'>
					<p className='inline-block'>Author:</p>
					<span className='font-light text-span'>Gabriel Wyner</span>
				</div>
				<div className='space-x-3'>
					<p className='inline-block'>Pages:</p>
					<span className='font-light text-span'>300</span>
				</div>
				<div className='space-x-3'>
					<p className='inline-block'>Span:</p>
					<button className='font-light text-span border-green-500 border-[1px] px-2 rounded-md'>
						to read
					</button>
				</div>
				<div className='space-x-3'>
					<p className='inline-block'>Goodreads:</p>
					<span className='font-light text-span'>⭐⭐⭐⭐</span>
				</div>
			</div>
		</DialogContent>
	);
};
