type CalculateAveragePagesProps = {
	amountOfPages: number;
	amountOfBooks: number;
};

export const calculateAveragePages = ({
	amountOfBooks,
	amountOfPages,
}: CalculateAveragePagesProps) => {
	const averagePages = Math.round(amountOfPages / amountOfBooks);

	return isNaN(averagePages) ? 0 : averagePages;
};
