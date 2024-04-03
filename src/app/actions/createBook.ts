'use server';

import { revalidateTag } from 'next/cache';

import { Book } from '@/@types/book';
import { handleFormatCoverURL } from '@/utils/';

type CreateBookProps = {
	book: Partial<Book>;
	database_id: string;
};

type FormatBookProps = Omit<CreateBookProps, 'database_id'>;

export const createBook = async ({ book, database_id }: CreateBookProps) => {
	const formattedBook = handleFormatBook({ book });

	await fetch(`${process.env.API_BASE_URL}/book/create/?db=${database_id}`, {
		method: 'POST',
		body: JSON.stringify(formattedBook),
	})
		.then(res => res.json())
		.catch(error => {
			console.log(error);
			return { error };
		});

	revalidateTag('fetch-books');

	return {
		success: true,
	};
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
