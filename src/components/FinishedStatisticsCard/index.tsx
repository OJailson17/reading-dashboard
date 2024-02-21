import { CircularProgressBar } from '../CircularProgressBar';

interface FinishedStatisticCardProps {
	card?: 'month' | 'year';
	books: {
		total: number;
		current: number;
	};
}

export const FinishedStatisticCard = ({
	card = 'month',
	books,
}: FinishedStatisticCardProps) => {
	const booksPercentage = Math.round((books.current / books.total) * 100);

	console.log();

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
