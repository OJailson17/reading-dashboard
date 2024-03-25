type CalculateAveragePagesProps = {
	amountOfPages: number;
	amountOfBooks: number;
};

export const calculateAveragePages = ({
	amountOfBooks,
	amountOfPages,
}: CalculateAveragePagesProps) => {
	return Math.round(amountOfPages / amountOfBooks);
};
