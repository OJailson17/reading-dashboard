import { format, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const handleFormatDate = (date: Date, locale: 'br' | 'utc' = 'br') => {
	if (locale === 'utc') {
		return format(date, 'yyyy-MM-dd');
	}

	return format(date, 'dd/MM/yyy', {
		locale: ptBR,
	});
};

export const handleRemoveZeroDigit = (date: string) => {
	let [year, month, day] = date.split('-');

	if (Number(day) < 10) {
		day = day[1];
	}

	if (Number(month) < 10) {
		month = month[1];
	}

	return `${year}-${month}-${day}`;
};
