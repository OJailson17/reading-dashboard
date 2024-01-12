export const formatPrice = (inputValue: string) => {
	const numericValue = inputValue.replace(/[^0-9]/g, '');
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
	}).format(Number(numericValue) / 100);
};

export const removePriceFormat = (formattedValue: string) => {
	return formattedValue.replace(/[^0-9,]/g, '').replace(',', '.');
};
