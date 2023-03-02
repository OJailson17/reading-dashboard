'use client';

import { ChartDataWrapper, StatusComponent } from '@/styles/common';
import { DonutComponent } from '../Donut';

export const BookStatus = () => {
	return (
		<StatusComponent>
			<p className='status-component-title'>Books Read</p>

			<span className='status-component-description'>
				All books on the to read list
			</span>

			<DonutComponent read_percentage={20} />

			<ChartDataWrapper>
				<div className='chart-data'>
					<div className='circle-data'></div>
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
