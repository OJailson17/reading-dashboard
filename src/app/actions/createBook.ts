'use server';

import { revalidateTag } from 'next/cache';

import { Book } from '@/@types/book';
import { notion } from '@/lib/notion';
import { handleFormatCoverURL } from '@/utils/';
import {
	APIErrorCode,
	ClientErrorCode,
	isNotionClientError,
} from '@notionhq/client';

type CreateBookProps = {
	book: Partial<Book>;
	database_id: string;
};

type FormatBookProps = Omit<CreateBookProps, 'database_id'>;

export const createBook = async ({ book, database_id }: CreateBookProps) => {
	const formattedBook = handleFormatBook({ book });

	try {
		await notion.pages.create({
			parent: {
				database_id,
			},
			icon: formattedBook.cover_url
				? {
						external: {
							url: formattedBook.cover_url,
						},
				  }
				: null,
			properties: {
				Name: {
					type: 'title',
					title: [
						{
							type: 'text',
							text: {
								content: formattedBook.title,
							},
						},
					],
				},
				Genre: {
					type: 'multi_select',
					multi_select: formattedBook.genres.map(genre => ({
						name: genre.name,
					})),
				},
				Author: {
					rich_text: [
						{
							type: 'text',
							text: {
								content: formattedBook.author,
							},
						},
					],
				},
				Status: {
					select: {
						name: formattedBook.status,
					},
				},
				Language: {
					select: {
						name: formattedBook.language,
					},
				},
				'Qtd. Pages': {
					number: formattedBook.total_pages || 0,
				},
				'Current Page': {
					number: formattedBook.current_page || 0,
				},
				Goodreads: {
					type: 'select',
					select: {
						id: formattedBook.goodreads || '',
					},
				},
				'Started Date': {
					type: 'date',
					date: formattedBook.started_date
						? {
								start: formattedBook.started_date,
						  }
						: null,
				},
				'Finished Date': {
					type: 'date',
					date: formattedBook.finished_date
						? {
								start: formattedBook.finished_date,
						  }
						: null,
				},
				Rating: {
					type: 'select',
					select: {
						id: formattedBook.review || '',
					},
				},
				'Reading Summary': {
					type: 'relation',
					relation: [
						{
							id: `${process.env.NOTION_READING_SUMMARY_ID}`,
						},
					],
				},
				'Book Price': {
					type: 'number',
					number: Number(formattedBook.book_price) || null,
				},
			},
		});

		revalidateTag('fetch-books');
		revalidateTag('fetch-book-stats');

		return {};
	} catch (error) {
		if (isNotionClientError(error)) {
			switch (error.code) {
				case ClientErrorCode.RequestTimeout:
					return {
						error: 'Request Timeout',
					};

				case APIErrorCode.ObjectNotFound:
					return {
						error: 'Object not found',
					};

				case APIErrorCode.Unauthorized:
					return {
						error: 'Unauthorized',
					};

				default:
					console.log(error);
					return {
						error: error.message,
						status: 400,
					};
			}
		}
	}
};

const handleFormatBook = ({ book }: FormatBookProps) => {
	if (book.genres && book.genres.length > 0) {
		book.genres = book.genres.map((genre: any) => ({
			name: genre,
		}));
	}

	book.cover_url = handleFormatCoverURL(book.cover_url || '');

	return {
		author: book.author || '',
		cover_url: book.cover_url,
		current_page: book.current_page || 0,
		finished_date: book.finished_date || null,
		genres: book.genres || [],
		language: book.language || 'Portuguese',
		started_date: book.started_date || null,
		status: book.status || 'To read',
		title: book.title || '',
		total_pages: book.total_pages || 0,
		book_price: book.book_price,
		goodreads: book.goodreads,
		review: book.review,
	};
};
