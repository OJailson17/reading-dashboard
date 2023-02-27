'use client';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';
import {
	CharData,
	ChartComponent,
	ChartDataWrapper,
	ChartTitle,
	YearlyChartWrapper,
} from './styles';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

const options = {
	responsive: true,
	plugins: {
		title: {
			display: false,
		},
		legend: {
			display: false,
		},
	},
	scales: {
		y: {
			display: false,
		},
		x: {
			grid: {
				drawOnChartArea: false,
			},
		},
	},
	elements: {
		bar: {
			borderRadius: 999,
			backgroundColor: '#32CCBC',
		},
	},
};

const labels = [
	'Jan',
	'Fev',
	'Mar',
	'Abr',
	'Mai',
	'Jun',
	'Jul',
	'Ago',
	'Set',
	'Out',
	'Nov',
	'Dez',
];

export const data = {
	labels,
	datasets: [
		{
			data: labels.map(() => Math.floor(Math.random() * 100)),
			barPercentage: 0.9,
			barThickness: 20,
			maxBarThickness: 30,
			minBarLength: 10,
		},
	],
};

export const YearlyChart = () => {
	return (
		<YearlyChartWrapper>
			<ChartTitle>Livros lidos em cada mês</ChartTitle>

			<ChartDataWrapper>
				<CharData>
					<div>
						<GoTriangleUp size={15} color='#28C76F' />
						<span>Mês com mais livros lidos</span>
					</div>
					<p className='month'>Fevereiro</p>
				</CharData>
				<CharData>
					<div>
						<GoTriangleDown size={15} color='#EA5455' />
						<span>Mês com menos livros lidos</span>
					</div>
					<p className='month'>Abril</p>
				</CharData>
			</ChartDataWrapper>

			<ChartComponent>
				<Bar options={options} data={data} />
			</ChartComponent>
		</YearlyChartWrapper>
	);
};
