import { Book } from '@/@types/book';

export const calculateAmountOfDaysToFinish = (books: Book[]) => {
	const amountOfDays = books.reduce(
		(amountOfDays, book) => amountOfDays + book.qtd_days,
		0,
	);

	return amountOfDays;
};
