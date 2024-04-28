'use server';

import { cache } from 'react';

import { Book, BookLanguages, BookStatus } from '@/@types/book';

export type BookProperties = {
	Author: {
		rich_text: [
			{
				plain_text: string;
			},
		];
	};
	Name: {
		title: [
			{
				plain_text: string;
			},
		];
	};
	'Qtd. Pages': {
		number: number;
	};
	'Current Page': {
		number: number;
	};
	Status: {
		select: {
			name: BookStatus;
		};
	};
	'Finished Date': {
		date: {
			start: string;
		} | null;
	};
	'Started Date': {
		date: {
			start: string;
		} | null;
	};
	Rating: {
		select: {
			name: string;
		} | null;
	};
	Goodreads: {
		select: {
			name: string;
		} | null;
	};
	Genre: {
		multi_select: {
			name: string;
			color: string;
		}[];
	};
	'Qtd. Days': {
		formula: {
			number: number;
		};
	};
	Language: {
		select: {
			name: BookLanguages;
		};
	};
	'Book Price': {
		number: number | null;
	};
};

type NotionBookProps = {
	id: string;
	icon: {
		external: {
			url: string;
		};
	};
	properties: BookProperties;
};

type UpdateFetchBooksProps = {
	database_id: string;
	query?: string;
};

export const formatBooks = (books: NotionBookProps[]): Book[] => {
	const formattedBooks = books.map(book => {
		const properties = book.properties;

		return {
			id: book.id,
			author: properties.Author.rich_text[0].plain_text,
			title: properties.Name.title[0].plain_text,
			current_page: properties['Current Page'].number,
			total_pages: properties['Qtd. Pages'].number,
			status: properties.Status.select.name,
			cover_url: book.icon?.external?.url || '',
			started_date: properties['Started Date'].date?.start || null,
			finished_date: properties['Finished Date'].date?.start || null,
			review: properties.Rating.select?.name || 'none',
			goodreads: properties.Goodreads.select?.name || 'none',
			genres: properties.Genre.multi_select.map(genre => ({
				name: genre.name,
				color: genre.color,
			})),
			qtd_days: properties['Qtd. Days'].formula.number,
			book_price: String(properties['Book Price'].number),
			language: properties.Language.select.name,
		};
	});

	return formattedBooks;
};

export const fetchBooks = cache(
	async ({ database_id, query }: UpdateFetchBooksProps) => {
		try {
			const response = await fetch(
				`${process.env.API_BASE_URL}/book?db=${database_id}&period=${
					query ? 'any_time' : 'this_year'
				}`,
				{
					next: {
						revalidate: false,
						tags: ['fetch-books'],
					},
				},
			);

			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}

			const books = await response.json();

			const formattedBooks = formatBooks(books);

			if (query) {
				const findBooks = formattedBooks.filter(book =>
					book.title.toLowerCase().includes(query.toLowerCase()),
				);

				if (findBooks.length <= 0) {
					return [];
				}

				return findBooks;
			}

			return formattedBooks;
		} catch (err) {
			console.log(err);
		}
	},
);
