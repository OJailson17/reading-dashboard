'use server';

import { revalidateTag } from 'next/cache';
import { Book, BookStatus } from '@/@types/book';

type FinishedStatusProps = {
	book_id: string;
	current_page: number;
};

type UpdateBookStatus = {
	status: BookStatus;
	book: Partial<Book>;
};

export const updateBookStatus = async ({ book, status }: UpdateBookStatus) => {
	if (status === 'Finished') {
		await setStatusToFinished({
			book_id: book.id || '',
			current_page: book.current_page || 0,
		});
	}
};

const setStatusToFinished = async ({
	book_id,
	current_page,
}: FinishedStatusProps) => {
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
