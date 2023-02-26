'use client';

import { Donut, DonutCase, DonutDefault, DonutLine, DonutText } from './styles';

export const DonutComponent = () => {
	return (
		<Donut>
			<DonutDefault />
			<DonutLine />
			<DonutText>
				<p>70%</p>
				<span>Lido</span>
			</DonutText>
			<DonutCase />
		</Donut>
	);
};
