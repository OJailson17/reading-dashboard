type CalculatePercentageProps = {
	total: number;
	value: number;
};

export const calculatePercentage = ({
	value,
	total,
}: CalculatePercentageProps) => {
	return Math.round((value / total) * 100);
};
