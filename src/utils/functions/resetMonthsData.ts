import { monthsBooksQtd } from '../helper/monthsBooksQtd';

export const resetMonthsQtd = () => {
	for (const [_, value] of Object.entries(monthsBooksQtd)) {
		value.quantity = 0;
	}
};
