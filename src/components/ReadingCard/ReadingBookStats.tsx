import { DrawerTrigger } from '../ui/drawer';

interface Book {
	title: string;
	author: string;
	total_pages: number;
	current_page: number;
}

interface ReadingBooksStatsProps {
	book: Book;
}

export const ReadingBookStats = ({ book }: ReadingBooksStatsProps) => {
	const bookProgress = Math.round((book.current_page / book.total_pages) * 100);

	return (
		<>
			<DrawerTrigger className='w-full text-left bg-transparent max-sm:outline-none'>
				<div className='w-full flex justify-between'>
					<div className='max-w-[85%]'>
						<p className='font-light text-span'>{book.title}</p>
						<span className='font-light text-placeholder text-sm'>
							{book.author}
						</span>
					</div>

					<span className='font-light text-span'>{bookProgress}%</span>
				</div>

				<div className='mt-2 relative bg-background w-full h-2 rounded-full'>
					<div className={`w-1/2 h-2 bg-gradient-primary rounded-full`} />
				</div>
			</DrawerTrigger>
		</>
	);
};
