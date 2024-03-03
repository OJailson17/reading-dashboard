import { ReadingBookStats } from './ReadingBookStats';
import { Drawer } from '../ui/drawer';
import { UpdateReadingDialog } from './UpdateReadingDialog';
import { fetchBooks } from '@/app/books/fetchBooks';

interface Book {
	id: string;
	title: string;
	author: string;
	total_pages: number;
	current_page: number;
	status: string;
	cover_url: string;
}

interface ReadingCardProps {
	books: Book[];
}

export const ReadingCard = async () => {
	const books = (await fetchBooks()) || [];

	const readingBooks = books.filter(book => book.status === 'Reading');

	return (
		<div className='w-full max-w-[403px] h-96 xs:px-4 sm:px-7 py-6 bg-secondary-background rounded-2xl'>
			<header className='flex items-end justify-between'>
				<h2 className='font-bold text-xl'>Currently Reading</h2>
				{/* <Link href={'/'} className='text-span text-sm hover:underline'>
					see all
				</Link> */}
			</header>

			<div className='h-60 mt-9 py-1 pl-1 pr-3 space-y-6 overflow-y-auto books-container'>
				{readingBooks.map((book, i) => (
					<Drawer key={book.id}>
						<ReadingBookStats book={book} />
						<UpdateReadingDialog book={book} />
					</Drawer>
				))}
			</div>
		</div>
	);
};
