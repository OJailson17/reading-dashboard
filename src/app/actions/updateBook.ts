'use server';

import { revalidateTag } from 'next/cache';
import { format } from 'date-fns';
import { Book } from '@/@types/book';

export const updateBook = async (book: Book) => {
	const today = format(new Date(), 'yyyy-MM-dd');

	if (book.status === 'Finished' && !book.finished_date) {
		book.finished_date = today;
	}

	if (book.status === 'Reading') {
		book.started_date = today;
	}

	console.log(book);

	fetch(`http://localhost:8082/books/${book.id}`, {
		method: 'PATCH',
		body: JSON.stringify({
			icon: {
				external: {
					url: book.cover_url,
				},
			},
			properties: {
				Author: {
					rich_text: [
						{
							plain_text: book.author,
						},
					],
				},
				Name: {
					title: [
						{
							plain_text: book.title,
						},
					],
				},
				'Qtd. Pages': {
					number: book.total_pages,
				},
				'Current Page': {
					number: book.current_page,
				},
				Status: {
					select: {
						name: book.status,
					},
				},
				'Finished Date': {
					date: {
						start: book.finished_date,
					},
				},
				'Started Date': {
					date: {
						start: book.started_date,
					},
				},
			},
		}),
	})
		.then(res => res.json())
		.catch(err => console.log(err));

	revalidateTag('fetch-books');
};
