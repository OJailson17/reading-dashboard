import Image from 'next/image';
import Link from 'next/link';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { BookDialog } from '../BookDialog';
import { fetchBooks } from '@/app/actions/fetchBooks';
import { getUser } from '@/app/actions/getUser';

export const FinishedCard = async () => {
	const user = await getUser();

	const books =
		(await fetchBooks({ database_id: user.user_database || '' })) || [];

	const finishedBooks = books
		.filter(book => book.status === 'Finished')
		.slice(0, 100);

	return (
		<div className='w-full min-h-[314px] xs:px-4 sm:px-7 py-6 bg-secondary-background rounded-2xl sm:col-span-2'>
			<header className='flex items-center justify-between'>
				<h2 className='font-bold text-xl'>Just Finished</h2>
				<Link href={'/'} className='text-span text-sm hover:underline'>
					see all
				</Link>
			</header>

			<div className='sm:w-full lg:max-w-[320px] mt-10 px-1 pb-6 pt-1 flex gap-6 white overflow-x-auto overflow-y-hidden books-container'>
				{finishedBooks.map(book => (
					<Dialog key={book.id}>
						<DialogTrigger className='min-w-28 h-40 rounded-md p-1.5 bg-purple'>
							<div className='w-full h-full relative'>
								<Image
									src={book.cover_url}
									alt='book cover'
									fill
									className='object-contain'
								/>
							</div>
						</DialogTrigger>
						<BookDialog type='finished' book={book} />
					</Dialog>
				))}
			</div>
		</div>
	);
};
