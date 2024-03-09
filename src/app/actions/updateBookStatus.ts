'use server';

import { revalidateTag } from 'next/cache';
import { Book, BookStatus } from '@/@types/book';

type UpdateStatusProps = {
	book_id: string;
	current_page: number;
};

type UpdateBookStatus = {
	status: BookStatus;
	book: Partial<Book>;
};

export const updateBookStatus = async ({ book, status }: UpdateBookStatus) => {
	if (status === 'Finished') {
		return await setStatusToFinished({
			book_id: book.id || '',
			current_page: book.current_page || 0,
		});
	}

	if (status === 'Reading') {
		return await setStatusToReading({
			book_id: book.id || '',
			current_page: book.current_page || 0,
		});
	}

	return await setStatusToTBR({
		book_id: book.id || '',
	});
};

const setStatusToFinished = async ({
	book_id,
	current_page,
}: UpdateStatusProps) => {
	await fetch(`${process.env.API_BASE_URL}/book/update/status/finished`, {
		method: 'PATCH',
		body: JSON.stringify({
			page_id: book_id,
			current_page,
		}),
	})
		.then(res => res.json())
		.catch(err => console.log(err));

	revalidateTag('fetch-books');
};

const setStatusToReading = async ({
	book_id,
	current_page,
}: UpdateStatusProps) => {
	await fetch(`${process.env.API_BASE_URL}/book/update/status/reading`, {
		method: 'PATCH',
		body: JSON.stringify({
			page_id: book_id,
			current_page,
		}),
	})
		.then(res => res.json())
		.catch(err => console.log(err));

	revalidateTag('fetch-books');
};

const setStatusToTBR = async ({
	book_id,
}: Omit<UpdateStatusProps, 'current_page'>) => {
	await fetch(`${process.env.API_BASE_URL}/book/update/status/tbr`, {
		method: 'PATCH',
		body: JSON.stringify({
			page_id: book_id,
		}),
	})
		.then(res => res.json())
		.catch(err => console.log(err));

	revalidateTag('fetch-books');
};
