import Link from 'next/link';
import { TBRBookStats } from './TBRBookStats';
import { Dialog } from '../ui/dialog';
import { BookDialog } from '../BookDialog';
import { fetchBooks } from '@/app/books/fetchBooks';

interface Book {
	id: string;
	title: string;
	author: string;
	total_pages: number;
	status: string;
	cover_url: string;
}

interface TBRCardProps {
	books: Book[];
}

export const TBRCard = async () => {
	const books = (await fetchBooks()) || [];

	const TBRBooks = books.filter(book => book.status === 'To read');

	return (
		<div className='w-full max-w-[403px] h-96 xs:px-4 sm:px-7 py-6 bg-secondary-background rounded-2xl'>
			<header className='flex items-center justify-between'>
				<h2 className='font-bold text-xl'>Want to Read</h2>
				<Link href={'/'} className='text-span text-sm hover:underline'>
					see all
				</Link>
			</header>

			<div className='h-60 mt-9 py-1 pl-1 pr-3 space-y-6 overflow-y-auto books-container'>
				{TBRBooks.map(book => (
					<Dialog key={book.id}>
						<TBRBookStats book={book} />
						<BookDialog book={book} />
					</Dialog>
				))}
			</div>
		</div>
	);
};
