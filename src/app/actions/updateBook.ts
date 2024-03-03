'use server';

import { revalidateTag } from 'next/cache';

type Book = {
	id: string;
	title: string;
	author: string;
	total_pages: number;
	current_page: number;
	cover_url: string;
	status: string;
};

export const updateBook = async (book: Book) => {
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
			},
		}),
	})
		.then(res => res.json())
		.catch(err => console.log(err));

	revalidateTag('fetch-books');
};
