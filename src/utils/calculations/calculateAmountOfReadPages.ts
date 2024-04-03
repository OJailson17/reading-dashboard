import { Book } from '@/@types/book';

export const calculateAmountOfReadPages = (books: Book[]) => {
	const amountOfPages = books.reduce(
		(amountOfPages, book) => amountOfPages + book.current_page,
		0,
	);

	return amountOfPages;
};
