'use client';

import { useState } from 'react';
import { BookDialog } from '../BookDialog';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { BookTableRow } from './BookTableRow';

export const BookShelfTable = () => {
	// const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);

	// const handleOpenBookDialog = () => {
	// 	setIsBookDialogOpen(true);
	// };
	// const handleCloseBookDialog = () => {
	// 	setIsBookDialogOpen(false);
	// };

	return (
		<table className='w-full table-auto border-separate border-spacing-y-3 px-1'>
			<thead>
				<tr className='text-center text-span'>
					<th className='text-left'>Book Details</th>
					<th className='max-sm:hidden'>Status</th>
					<th className='max-sm:hidden'>Genres</th>
					<th className='max-sm:hidden'>Started</th>
					<th className='max-sm:hidden'>Finished</th>
				</tr>
			</thead>
			<tbody>
				<Dialog>
					<BookTableRow />
					<BookTableRow />
					<BookTableRow />
					<BookTableRow />
					<BookTableRow />
					<BookTableRow />
					<BookTableRow />
					<BookTableRow />
					<BookTableRow />
					<BookDialog
						type='Finished'
						book={{
							id: '',
							author: '',
							cover_url: 'https://github.com/ojailson17.png',
							current_page: 0,
							finished_date: '',
							genres: [],
							title: '',
							started_date: '',
							status: 'Finished',
							total_pages: 0,
						}}
					/>
				</Dialog>
			</tbody>
		</table>
	);
};
