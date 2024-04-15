'use client';

import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

import { Tab } from '@/app/bookshelf/page';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

interface Amounts {
	amountOfAllBooks: number;
	amountOfToReadBooks: number;
	amountOfReadingBooks: number;
	amountOfFinishedBooks: number;
	amountOfToReviewBooks: number;
}

interface SelectTabFilterProps {
	currentTab: Tab;
	tabName: string;
	booksAmount: Amounts;
	query: string;
}

export const SelectTabFilter = ({
	currentTab,
	tabName,
	booksAmount,
	query,
}: SelectTabFilterProps) => {
	const router = useRouter();

	const handleChangeTab = (selectedTab: string) => {
		if (selectedTab !== currentTab) {
			if (query) {
				return router.push(`/bookshelf/?tab=${selectedTab}&q=${query}`, {
					scroll: false,
				});
			}
			router.push(`/bookshelf/?tab=${selectedTab}`, {
				scroll: false,
			});
		}
	};

	return (
		<div className='w-full flex flex-col gap-1 justify-center sm:hidden'>
			<Select onValueChange={handleChangeTab}>
				<SelectTrigger className='w-full max-sm:h-11'>
					<SelectValue placeholder={tabName} />
				</SelectTrigger>

				<SelectContent className='bg-background'>
					<SelectGroup className='bg-background text-span'>
						<SelectItem value='all' className='max-sm:h-11'>
							All Books ({booksAmount.amountOfAllBooks})
						</SelectItem>
						<SelectItem value='tbr' className='max-sm:h-11'>
							To Read ({booksAmount.amountOfToReadBooks})
						</SelectItem>
						<SelectItem value='reading' className='max-sm:h-11'>
							Reading ({booksAmount.amountOfReadingBooks})
						</SelectItem>
						<SelectItem value='finished' className='max-sm:h-11'>
							Finished ({booksAmount.amountOfFinishedBooks})
						</SelectItem>
						<SelectItem value='review' className='max-sm:h-11'>
							To Review ({booksAmount.amountOfToReviewBooks})
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};
