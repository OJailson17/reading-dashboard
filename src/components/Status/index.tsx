'use client';

import { DonutComponent } from '../Donut';
import { ChartDataWrapper, StatusComponent } from './styles';

export const Status = () => {
	return (
		<StatusComponent>
			<p className='status-component-title'>Lendo</p>

			<span className='status-component-book-name'>
				Nome do livro que talvez seja muito grande para caber na linha completa
				dessa div
			</span>

			<DonutComponent />

			<ChartDataWrapper>
				<div className='chart-data'>
					<div className='circle'></div>
					<p className='chart-label'>Qtd. de Páginas</p>
					<span className='chart-data-value'>300</span>
				</div>
				<div className='chart-data'>
					<div className='circle'></div>
					<p className='chart-label'>Página atual</p>
					<span className='chart-data-value'>100</span>
				</div>
			</ChartDataWrapper>
		</StatusComponent>
	);
};
