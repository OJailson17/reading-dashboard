import Image from 'next/image';
import Link from 'next/link';

import { fetchBooks } from '@/app/actions/fetchBooks';
import { getSession } from '@/app/actions/getSession';

import { BookDialog } from '../BookDialog';
import { Dialog, DialogTrigger } from '../ui/dialog';

export const FinishedCard = async () => {
	const session = await getSession();

	const books =
		(await fetchBooks({ database_id: session?.database_id || '' })) || [];

	const finishedBooks = books
		.filter(book => book.status === 'Finished')
		.slice(0, 5);

	return (
		<div className='w-full min-h-[314px] xs:px-4 sm:px-7 py-6 bg-secondary-background rounded-2xl sm:col-span-2'>
			<header className='flex items-center justify-between'>
				<h2 className='font-bold text-xl'>Just Finished</h2>
				<Link
					href={'/bookshelf/?tab=finished'}
					className='text-span text-sm hover:underline'
				>
					see all
				</Link>
			</header>

			<div className='sm:w-full lg:max-w-[320px] mt-10 px-1 pb-6 pt-1 flex gap-6 overflow-x-auto overflow-y-hidden books-container'>
				{finishedBooks.map(book => (
					<Dialog key={book.id}>
						<DialogTrigger className='min-w-28 h-40 rounded-md'>
							{book.cover_url !== '' && (
								<div className='w-full h-full relative'>
									<Image
										src={book.cover_url}
										alt={`${book.title} cover`}
										fill
										priority
										className='object-cover rounded-md'
									/>
								</div>
							)}
							{book.cover_url === '' && (
								<div className='w-28 h-full bg-background rounded-md flex items-center justify-center break-words text-center text-xs overflow-y-hidden p-px'>
									{book.title}
								</div>
							)}
						</DialogTrigger>
						<BookDialog type='Finished' book={book} />
					</Dialog>
				))}
			</div>
		</div>
	);
};
