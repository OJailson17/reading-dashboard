export const validateISBN = (isbn: number) => {
	const isValidNumber = !isNaN(Number(isbn));

	if (!isValidNumber || String(isbn).length !== 10) return false;

	return true;
};
