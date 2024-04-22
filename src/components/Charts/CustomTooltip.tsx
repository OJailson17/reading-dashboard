export const CustomTooltip = ({
	active,
	payload,
	label,
}: {
	active?: boolean;
	payload?: any;
	label?: any;
}) => {
	if (active && payload && payload.length) {
		return (
			<div className='bg-background p-2 text-center text-sm rounded-lg'>
				<p>{label}</p>
				<p>
					{payload[0].value <= 1
						? `${payload[0].value} book`
						: `${payload[0].value} books`}
				</p>
			</div>
		);
	}

	return null;
};
