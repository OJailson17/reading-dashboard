type CalculateAverageDaysToFinishProps = {
	amountOfDays: number;
	amountOfBooks: number;
};

export const calculateAverageDaysToFinish = ({
	amountOfBooks,
	amountOfDays,
}: CalculateAverageDaysToFinishProps) => {
	const averageDays = Math.round(amountOfDays / amountOfBooks);
	return isNaN(averageDays) ? 0 : averageDays;
};
