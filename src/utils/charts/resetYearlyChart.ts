import { monthsBooksPagesQtd } from './yearlyBooksPagesChartData';
import { monthsBooksQtd } from './yearlyChartData';

export const resetYearlyChart = () => {
	for (const [_, value] of Object.entries(monthsBooksQtd)) {
		value.amount = 0;
	}
};

export const resetBooksPagesChart = () => {
	for (const [_, value] of Object.entries(monthsBooksPagesQtd)) {
		value.books = 0;
		value.pages = 0;
	}
};
