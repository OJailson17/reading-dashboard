import { MonthsLabelsObject } from '@/@types/chartTypes';

export const monthsBooksQtd: MonthsLabelsObject = {
	Jan: {
		quantity: 0,
		name: 'Jan',
		fullName: 'January',
	},
	Feb: {
		quantity: 0,
		name: 'Feb',
		fullName: 'February',
	},
	Mar: {
		quantity: 0,
		name: 'Mar',
		fullName: 'March',
	},
	Apr: {
		quantity: 0,
		name: 'Apr',
		fullName: 'April',
	},
	May: {
		quantity: 0,
		name: 'May',
		fullName: 'May',
	},
	Jun: {
		quantity: 0,
		name: 'Jun',
		fullName: 'June',
	},
	Jul: {
		quantity: 0,
		name: 'Jul',
		fullName: 'July',
	},
	Aug: {
		quantity: 0,
		name: 'Aug',
		fullName: 'August',
	},
	Sep: {
		quantity: 0,
		name: 'Sep',
		fullName: 'September',
	},
	Oct: {
		quantity: 0,
		name: 'Oct',
		fullName: 'October',
	},
	Nov: {
		quantity: 0,
		name: 'Nov',
		fullName: 'November',
	},
	Dec: {
		quantity: 0,
		name: 'Dec',
		fullName: 'December',
	},
};

export const resetMonthsQtd = () => {
	for (const [_, value] of Object.entries(monthsBooksQtd)) {
		value.quantity = 0;
	}
};
