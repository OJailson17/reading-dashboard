type ValidateISBNProps = {
	isbn: number;
	startsWithZero: boolean;
};

export const validateISBN = ({ isbn, startsWithZero }: ValidateISBNProps) => {
	const isValidNumber = !isNaN(Number(isbn));

	let lengthLimit = 10;

	if (startsWithZero) {
		lengthLimit = 9;
	}

	if (!isValidNumber || String(isbn).length !== lengthLimit) return false;

	return true;
};
