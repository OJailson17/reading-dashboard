'use client';

import { DonutComponent } from '../Donut';
import { ChartDataWrapper, StatusComponent } from './styles';

export const Status = () => {
	return (
		<StatusComponent>
			<p className='status-component-title'>Reading</p>

			<span className='status-component-book-name'>Book Name</span>

			<DonutComponent />

			<ChartDataWrapper>
				<div className='chart-data'>
					<div className='circle'></div>
					<p className='chart-label'>Total Pages</p>
					<span className='chart-data-value'>300</span>
				</div>
				<div className='chart-data'>
					<div className='circle'></div>
					<p className='chart-label'>Current Page</p>
					<span className='chart-data-value'>210</span>
				</div>
			</ChartDataWrapper>
		</StatusComponent>
	);
};
