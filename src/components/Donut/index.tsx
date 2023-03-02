'use client';

import { Donut, DonutCase, DonutDefault, DonutLine, DonutText } from './styles';

interface DonutComponentProps {
	read_percentage: number;
}

export const DonutComponent = ({ read_percentage }: DonutComponentProps) => {
	return (
		<Donut>
			<DonutDefault />
			<DonutLine />
			<DonutText>
				<p>{read_percentage}%</p>
				<span>Read</span>
			</DonutText>
			<DonutCase read_percentage={read_percentage} />
		</Donut>
	);
};
