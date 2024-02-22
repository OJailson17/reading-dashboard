import { calculatePercentage } from '@/utils/calculatePercentage';
import { CircularProgressBar } from '../CircularProgressBar';

interface Book {
	total: number;
	current: number;
}

interface FinishedStatisticCardProps {
	card?: 'month' | 'year';
	books: Book;
}

export const FinishedStatisticCard = ({
	card = 'month',
	books,
}: FinishedStatisticCardProps) => {
	const booksPercentage = calculatePercentage({
		value: books.current,
		total: books.total,
	});

	return (
		<div className='max-w-[403px] min-h-48 px-8 bg-secondary-background flex items-center justify-center gap-6 rounded-2xl'>
			<CircularProgressBar bar_percentage={booksPercentage} />

			<div className='text-span flex-1'>
				<p>
					<span className='font-bold'>{books.current}</span>/{books.total}
				</p>

				{card === 'month' && <p>books read this month</p>}
				{card === 'year' && (
					<p>
						books completed to <span className='font-bold'>year</span> challenge
					</p>
				)}
			</div>
		</div>
	);
};
