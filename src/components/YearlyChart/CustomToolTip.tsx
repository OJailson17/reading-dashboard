import { ChartToolTip } from './styles';

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
			<ChartToolTip>
				<p>{label}</p>
				<p>
					{payload[0].value <= 1
						? `${payload[0].value} book`
						: `${payload[0].value} books`}
				</p>
			</ChartToolTip>
		);
	}

	return null;
};
