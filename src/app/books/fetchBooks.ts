import { cache } from 'react';

type BookProperties = {
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
			name: string;
		};
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

const formatBooks = (books: NotionBookProps[]) => {
	const formattedBooks = books.map(book => {
		const properties = book.properties;

		return {
			id: book.id,
			author: properties.Author.rich_text[0].plain_text,
			title: properties.Name.title[0].plain_text,
			current_page: properties['Current Page'].number,
			total_pages: properties['Qtd. Pages'].number,
			status: properties.Status.select.name,
			cover_url: book.icon.external.url,
		};
	});

	return formattedBooks;
};

export const fetchBooks = cache(async () => {
	try {
		const response = await fetch('http://localhost:8082/books', {
			next: {
				revalidate: false,
				tags: ['fetch-books'],
			},
		});

		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}

		const books = await response.json();

		return formatBooks(books);
	} catch (err) {
		console.log(err);
	}
});
