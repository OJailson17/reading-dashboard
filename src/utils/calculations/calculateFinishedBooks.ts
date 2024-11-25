import { Book } from '@/@types/book';
import { handleRemoveZeroDigit } from '@/utils';
import { isSameMonth } from '@/utils/validations/validateIsSameMonth';

export const finishedBooksFromThisMonth = (books: Book[]) => {
	const currentYear = new Date().getUTCFullYear(); // 2024
	const currentMonth = new Date().getUTCMonth() + 1;

	return books.filter(book => {
		const isFromThisMonth = isSameMonth({
			monthDate: new Date(`${currentYear}-${currentMonth}-1`),
			bookDate: new Date(handleRemoveZeroDigit(book.finished_date || '')),
		});

		if (isFromThisMonth) {
			return book;
		}
	});
};
