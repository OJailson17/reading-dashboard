type MonthsLabels = {
	Jan: {
		quantity: number;
		name: string;
		fullName: string;
	};
	Feb: {
		quantity: number;
		name: string;
		fullName: string;
	};
	Mar: {
		quantity: number;
		name: string;
		fullName: string;
	};
	Apr: {
		quantity: number;
		name: string;
		fullName: string;
	};
	May: {
		quantity: number;
		name: string;
		fullName: string;
	};
	Jun: {
		quantity: number;
		name: string;
		fullName: string;
	};
	Jul: {
		quantity: number;
		name: string;
		fullName: string;
	};
	Aug: {
		quantity: number;
		name: string;
		fullName: string;
	};
	Sep: {
		quantity: number;
		name: string;
		fullName: string;
	};
	Oct: {
		quantity: number;
		name: string;
		fullName: string;
	};
	Nov: {
		quantity: number;
		name: string;
		fullName: string;
	};
	Dec: {
		quantity: number;
		name: string;
		fullName: string;
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
