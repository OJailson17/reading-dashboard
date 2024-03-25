type CalculateAverageDaysToFinishProps = {
	amountOfDays: number;
	amountOfBooks: number;
};

export const calculateAverageDaysToFinish = ({
	amountOfBooks,
	amountOfDays,
}: CalculateAverageDaysToFinishProps) => {
	return Math.round(amountOfDays / amountOfBooks);
};
