'use client';

import { Tab } from '@/app/bookshelf/page';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

interface Amounts {
	amountOfAllBooks: number;
	amountOfToReadBooks: number;
	amountOfReadingBooks: number;
	amountOfFinishedBooks: number;
	amountOfToReviewBooks: number;
}

interface BookshelfNavProps {
	booksAmount: Amounts;
	currentTab: Tab;
}

const textStateStyle = {
	active: 'bg-gradient-primary text-transparent bg-clip-text',
	inactive: 'text-white',
};

export const BookshelfNav = ({
	booksAmount,
	currentTab,
}: BookshelfNavProps) => {
	const router = useRouter();

	const handleChangeTab = (e: MouseEvent<HTMLButtonElement>) => {
		const clickedTab = e.currentTarget.getAttribute('data-tab');

		if (clickedTab && clickedTab !== currentTab) {
			router.push(`/bookshelf/?tab=${clickedTab}`, {
				scroll: false,
			});
		}
	};

	return (
		<div className='w-full h-full flex flex-col sm:max-lg:flex-row items-center justify-between	 text-sm lg:text-lg font-bold text-white max-sm:hidden'>
			<button
				className='max-sm:w-40 rounded-lg'
				data-tab='all'
				onClick={handleChangeTab}
			>
				<p
					className={
						currentTab === 'all'
							? textStateStyle.active
							: textStateStyle.inactive
					}
				>
					All Books ({booksAmount.amountOfAllBooks})
				</p>
			</button>
			<button
				data-tab='tbr'
				onClick={handleChangeTab}
				className=' max-sm:w-40 rounded-lg'
			>
				<p
					className={
						currentTab === 'tbr'
							? textStateStyle.active
							: textStateStyle.inactive
					}
				>
					To Read ({booksAmount.amountOfToReadBooks})
				</p>
			</button>
			<button
				data-tab='reading'
				onClick={handleChangeTab}
				className=' max-sm:w-40 rounded-lg'
			>
				<p
					className={
						currentTab === 'reading'
							? textStateStyle.active
							: textStateStyle.inactive
					}
				>
					Reading ({booksAmount.amountOfReadingBooks})
				</p>
			</button>
			<button
				data-tab='finished'
				onClick={handleChangeTab}
				className=' max-sm:w-40 rounded-lg'
			>
				<p
					className={
						currentTab === 'finished'
							? textStateStyle.active
							: textStateStyle.inactive
					}
				>
					Finished ({booksAmount.amountOfFinishedBooks})
				</p>
			</button>
			<button
				data-tab='review'
				onClick={handleChangeTab}
				className=' max-sm:w-40 rounded-lg'
			>
				<p
					className={
						currentTab === 'review'
							? textStateStyle.active
							: textStateStyle.inactive
					}
				>
					To Review ({booksAmount.amountOfToReviewBooks})
				</p>
			</button>
		</div>
	);
};
