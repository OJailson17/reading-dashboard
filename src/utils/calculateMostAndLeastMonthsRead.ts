type MonthsLabels = {
	Jan: {
		quantity: number;
		name: string;
	};
	Feb: {
		quantity: number;
		name: string;
	};
	Mar: {
		quantity: number;
		name: string;
	};
	Apr: {
		quantity: number;
		name: string;
	};
	May: {
		quantity: number;
		name: string;
	};
	Jun: {
		quantity: number;
		name: string;
	};
	Jul: {
		quantity: number;
		name: string;
	};
	Aug: {
		quantity: number;
		name: string;
	};
	Sep: {
		quantity: number;
		name: string;
	};
	Oct: {
		quantity: number;
		name: string;
	};
	Nov: {
		quantity: number;
		name: string;
	};
	Dec: {
		quantity: number;
		name: string;
	};
};

type MonthRead = {
	monthsBooksQuantity: MonthsLabels;
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
			leastBooksReadMonth = value?.name;
		}

		if (!mostBooksReadMonth && value?.quantity === maxQtdMonthValue) {
			mostBooksReadMonth = value?.name;
		}
	}

	return {
		leastBooksReadMonth,
		mostBooksReadMonth,
	};
};
