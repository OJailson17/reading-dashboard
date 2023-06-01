type IsSameMonth = {
	monthDate: Date;
	bookDate: Date;
};

export default function isSameMonth({
	bookDate,
	monthDate,
}: IsSameMonth): boolean {
	return (
		monthDate.getFullYear() === bookDate.getFullYear() &&
		monthDate.getUTCMonth() === bookDate.getUTCMonth()
	);
}
