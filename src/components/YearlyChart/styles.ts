'use client';

import styled from 'styled-components';

export const YearlyChartWrapper = styled.div`
	width: 90%;
	margin: 0 auto;
	margin-top: 3.75rem;
	padding: 1.875rem 1.5rem;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	background-color: #363447;
	box-shadow: 0px 0px 20px 0px #1e1e1e;
	border-radius: 16px;
`;

export const ChartTitle = styled.p`
	font-size: 1.25rem;
	font-weight: 600;
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
	margin-top: 2rem;
`;
