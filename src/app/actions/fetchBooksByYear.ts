'use server';

import { cache } from 'react';

import { formatBooks } from './fetchBooks';

type UpdateFetchBooksProps = {
	database_id: string;
	year: string;
};

export const fetchBooksByYear = cache(
	async ({ database_id, year }: UpdateFetchBooksProps) => {
		try {
			const response = await fetch(
				`${process.env.API_BASE_URL}/book/stats?db=${database_id}&year=${year}`,
				{
					next: {
						revalidate: false,
						tags: ['fetch-book-stats'],
					},
				},
			);

			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}

			const books = await response.json();

			const formattedBooks = formatBooks(books);

			return formattedBooks;
		} catch (err) {
			console.log(err);
		}
	},
);
