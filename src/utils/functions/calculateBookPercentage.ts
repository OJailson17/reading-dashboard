type BookPercentageProps = {
	totalPages: number;
	currentPage: number;
};

export const calculateBookPercentage = ({
	totalPages,
	currentPage,
}: BookPercentageProps) => {
	return Math.floor((currentPage / totalPages) * 100);
};
