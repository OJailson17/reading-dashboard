'use server';

import { revalidateTag } from 'next/cache';
import { Book } from '@/@types/book';

export const updateBook = async (book: Book) => {
	await fetch(`${process.env.API_BASE_URL}/books/${book.id}`, {
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
					date: book.finished_date
						? {
								start: book.finished_date,
						  }
						: null,
				},
				'Started Date': {
					date: book.started_date
						? {
								start: book.started_date,
						  }
						: null,
				},
			},
		}),
	})
		.then(res => res.json())
		.catch(err => console.log(err));

	revalidateTag('fetch-books');
};
