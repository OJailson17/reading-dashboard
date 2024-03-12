import { monthsBooksQtd } from './yearlyChartData';

export const resetYearlyChart = () => {
	for (const [_, value] of Object.entries(monthsBooksQtd)) {
		value.amount = 0;
	}
};
