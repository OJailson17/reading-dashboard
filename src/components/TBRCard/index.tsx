import Link from 'next/link';

import { Book } from '@/@types/book';
import { applicationLinks } from '@/utils/constants/links';

import { BookDialog } from '../BookDialog';
import { Dialog } from '../ui/dialog';
import { TBRBookStats } from './TBRBookStats';

interface TBRCardProps {
	books: Book[];
}

export const TBRCard = async ({ books }: TBRCardProps) => {
	const TBRBooks = books.filter(book => book.status === 'To read').slice(0, 5);

	return (
		<div className='w-full max-w-[403px] h-96 xs:px-4 sm:px-7 py-6 bg-secondary-background rounded-2xl'>
			<header className='flex items-center justify-between'>
				<h2 className='font-bold text-xl'>Want to Read</h2>
				<Link
					href={`${applicationLinks.bookshelf}/?tab=tbr`}
					className='text-span text-sm hover:underline'
				>
					see all
				</Link>
			</header>

			<div className='h-60 mt-9 py-1 pl-1 pr-3 space-y-6 overflow-y-auto books-container'>
				{TBRBooks.map(book => (
					<Dialog key={book.id}>
						<TBRBookStats book={book} />
						<BookDialog type='To read' book={book} />
					</Dialog>
				))}
			</div>
		</div>
	);
};
