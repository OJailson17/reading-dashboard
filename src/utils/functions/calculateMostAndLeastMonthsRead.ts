import { MonthsLabelsObject } from '@/@types/chartTypes';

type MonthRead = {
	monthsBooksQuantity: MonthsLabelsObject;
	amountOfBooks: number[];
};

export const getLeastAndMostMonthRead = ({
	amountOfBooks,
	monthsBooksQuantity,
}: MonthRead) => {
	// get the min value in the amount of books array
	const leastQtdMonthValue = Math.min(...amountOfBooks);
	// get the max value in the amount of books array
	const maxQtdMonthValue = Math.max(...amountOfBooks);

	let leastBooksReadMonth;
	let mostBooksReadMonth;

	// Go through the monthsBooksQuantity and get the names of the books with the min and the max value
	for (const [_, value] of Object.entries(monthsBooksQuantity)) {
		if (!leastBooksReadMonth && value.quantity === leastQtdMonthValue) {
			leastBooksReadMonth = value?.fullName;
		}

		if (!mostBooksReadMonth && value?.quantity === maxQtdMonthValue) {
			mostBooksReadMonth = value?.fullName;
		}
	}

	return {
		leastBooksReadMonth,
		mostBooksReadMonth,
	};
};
