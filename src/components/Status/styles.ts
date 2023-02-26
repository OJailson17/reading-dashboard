'use client';

import styled from 'styled-components';

export const StatusComponent = styled.div`
	width: 100%;
	/* height: 15rem; */
	padding: 2rem 1.5rem;

	background-color: #363447;
	border-radius: 16px;
	text-align: center;
	box-shadow: 0px 0px 20px 0px #1e1e1e;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	.status-component-title {
		font-size: 1.5rem;
		font-weight: 600;
	}

	.status-component-book-name {
		display: block;
		margin-top: 1rem;
		margin-bottom: 2rem;
		color: #c4c4c4;
	}
`;

export const ChartDataWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 2rem;

	.chart-data {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;

		font-size: 0.75rem;
		font-weight: 500;

		.circle {
			width: 15px;
			height: 15px;

			border-radius: 50%;
			background-color: #4a4556;
		}
	}
`;
