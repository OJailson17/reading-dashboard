// Get the amount of yellow and gray stars that need to be shown
export const calculateAmountOfRatingStars = (amountOfStarts: number) => {
	const TOTAL_STARS_LIMIT = 5;

	if (amountOfStarts === 0) {
		return {
			amountOfYellowStars: amountOfStarts,
			amountOfGrayStars: TOTAL_STARS_LIMIT,
		};
	}

	amountOfStarts = Math.ceil(amountOfStarts / 2);

	const amountOfGrayStars = TOTAL_STARS_LIMIT - amountOfStarts;
	const amountOfYellowStars = amountOfStarts;

	return {
		amountOfYellowStars,
		amountOfGrayStars,
	};
};
