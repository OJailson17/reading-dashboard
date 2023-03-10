'use client';

import { device } from '@/styles/endpoints';
import styled from 'styled-components';

export const YearlyChartWrapper = styled.div`
	width: 90%;
	max-width: 90rem;
	margin: 3.75rem auto;
	padding: 1.875rem 1.5rem;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	background-color: #363447;
	box-shadow: 0px 0px 20px 0px #1e1e1e;
	border-radius: 16px;

	.chart-container {
		width: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		@media ${device.tablet} {
			flex-direction: row;
			padding: 0 1rem;
		}

		@media ${device.laptop} {
			padding: 0 3rem;
		}
	}
`;

export const ChartTitle = styled.p`
	font-size: 1.25rem;
	font-weight: 600;

	@media ${device.laptop} {
		align-self: flex-start;
		padding-left: 3rem;
	}
`;

export const ChartDataWrapper = styled.div`
	width: 100%;
	margin-top: 2rem;

	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
`;

export const CharData = styled.div`
	& > div {
		display: flex;
		align-items: center;
		gap: 4px;

		span {
			font-size: 0.875rem;
		}
	}

	p {
		font-size: 1.2rem;
		margin-top: 0.5rem;
	}
`;

export const ChartComponent = styled.div`
	width: 100%;
	max-width: 600px;
	margin-top: 2rem;
`;
