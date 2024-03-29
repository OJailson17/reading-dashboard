'use client';

import { useState } from 'react';
import { BookDialog } from '../BookDialog';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { BookTableRow } from './BookTableRow';
import { Book } from '@/@types/book';

interface BookShelfTableProps {
	books: Book[];
}

export const BookShelfTable = ({ books }: BookShelfTableProps) => {
	if (books.length <= 0) {
		return (
			<p className='text-span font-bold text-center text-lg'>
				There is nothing here
			</p>
		);
	}

	return (
		<table className='w-full table-auto border-separate border-spacing-y-3 px-1 bookshelf-table'>
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
				{books.map(book => (
					<Dialog key={book.id}>
						<BookTableRow book={book} />
						<BookDialog type={book.status} book={book} />
					</Dialog>
				))}
			</tbody>
		</table>
	);
};
