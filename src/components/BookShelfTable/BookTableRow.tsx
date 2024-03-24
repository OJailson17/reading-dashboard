import Image from 'next/image';
import { IoStar } from 'react-icons/io5';
import { DialogTrigger } from '../ui/dialog';
import { Book } from '@/@types/book';
import { format } from 'date-fns';
import { calculateAmountOfRatingStars } from '@/utils/calculateAmountOfStars';

interface BookTableRowProps {
	book: Book;
}

const bookStatusColor = {
	'To read': 'border-placeholder',
	Reading: 'border-yellow-500',
	Finished: 'border-light-green',
};

export const BookTableRow = ({ book }: BookTableRowProps) => {
	const getFirstTwoGenres = book.genres.filter((_, i) => i <= 1);

	let startedYear: string | null = null;
	let finishedYear: string | null = null;

	if (book.started_date) {
		startedYear = book.started_date.split('-')[0];
	}

	if (book.finished_date) {
		finishedYear = book.finished_date.split('-')[0];
	}

	const { amountOfGrayStars, amountOfYellowStars } =
		calculateAmountOfRatingStars(
			book.review && book.review !== 'none' ? book.review.length : 0,
		);

	return (
		<tr>
			{/* Details */}
			<td>
				<DialogTrigger className='flex items-center gap-4'>
					<div className='min-w-16 h-24 rounded-md relative'>
						<Image
							src={book.cover_url}
							alt={`cover`}
							fill
							priority
							className='object-cover rounded-md'
						/>
					</div>

					<div className='flex flex-col gap-3'>
						<div className='max-w-60 text-left'>
							<p className='font-bold break-words ellipsis-title'>
								{book.title}
							</p>
							<span className='font-bold text-span text-xs'>{book.author}</span>
						</div>

						<div className='flex items-center gap-1'>
							{[...new Array(amountOfYellowStars)].map((_, i) => (
								<IoStar key={i} fill='yellow' />
							))}
							{[...new Array(amountOfGrayStars)].map((_, i) => (
								<IoStar key={i} fill='gray' />
							))}
						</div>
					</div>
				</DialogTrigger>
			</td>

			{/* Status */}
			<td className='max-sm:hidden'>
				<div
					className={`font-light max-h-6 text-white border-[1.5px] ${
						bookStatusColor[book.status]
					} w-[90%] mx-auto max-w-40 px-2 rounded-md text-center text-sm py-3 flex items-center justify-center`}
				>
					{book.status}
				</div>
			</td>

			{/* Genres */}
			<td className='space-y-2 max-sm:hidden'>
				{getFirstTwoGenres.map(genre => (
					<div
						key={genre.name}
						className='font-light max-h-6 text-white border-[1.5px] border-purple w-[90%] mx-auto max-w-40 px-2 rounded-md text-center text-sm py-3 flex items-center justify-center'
					>
						{genre.name}
					</div>
				))}
			</td>

			{/* Started */}
			<td className='max-sm:hidden'>
				<div className='text-center'>
					<p className='font-bold text-xs'>
						{book.started_date
							? format(book.started_date, 'MMM dd')
							: 'Not Set'}
					</p>
					<span className='font-bold text-span text-xs'>{startedYear}</span>
				</div>
			</td>

			{/* Finished */}
			<td className='max-sm:hidden'>
				<div className='text-center'>
					<p className='font-bold text-xs'>
						{book.finished_date
							? format(book.finished_date, 'MMM dd')
							: 'Not Set'}
					</p>
					<span className='font-bold text-span text-xs'>{finishedYear}</span>
				</div>
			</td>
		</tr>
	);
};
