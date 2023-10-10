import { Book } from '@/@types/bookTypes';

import { calculateBookPercentage } from './calculateBookPercentage';

export const getBookWithGraterProgress = (books: Book[]) => {
	const sortBooks = books
		.map(book => {
			return {
				name: book.properties.Name.title[0].plain_text,
				progress: calculateBookPercentage({
					currentPage: book.properties['Current Page'].number,
					totalPages: book.properties['Qtd. Pages'].number,
				}),
			};
		})
		.sort((a, b) => b.progress - a.progress);

	const booksNames = sortBooks.map(book => book.name);

	return booksNames;
};
