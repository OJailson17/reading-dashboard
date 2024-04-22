type IsSameMonth = {
	monthDate: Date;
	bookDate: Date;
};

export function isSameMonth({ bookDate, monthDate }: IsSameMonth): boolean {
	return (
		monthDate.getFullYear() === bookDate.getFullYear() &&
		monthDate.getUTCMonth() === bookDate.getUTCMonth()
	);
}
