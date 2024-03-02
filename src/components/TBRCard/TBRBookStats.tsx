import { DialogTrigger } from '../ui/dialog';

interface Book {
	title: string;
	author: string;
}

interface TBRBookStats {
	book: Book;
}

export const TBRBookStats = ({ book }: TBRBookStats) => {
	return (
		<>
			<DialogTrigger className='w-full text-left bg-transparent'>
				<div className='w-full flex justify-between'>
					<div>
						<p className='font-light text-span'>{book.title}</p>
						<span className='font-light text-placeholder text-sm'>
							{book.author}
						</span>
					</div>
				</div>
			</DialogTrigger>
		</>
	);
};
