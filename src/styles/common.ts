'use client';

import styled from 'styled-components';
import { device } from 'src/styles/endpoints';

export const PageTitle = styled.h1`
	font-size: 1.875rem;

	text-align: center;
	margin-top: 2rem;
`;

export const StatusComponent = styled.div`
	max-width: 25rem;
	/* height: 15rem; */
	padding: 2rem 1.5rem;

	background-color: #363447;
	border-radius: 16px;
	text-align: center;
	box-shadow: 0px 0px 20px 0px #1e1e1e;

	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;

	@media ${device.tablet} {
		width: 45%;
	}

	@media ${device.laptop} {
		width: 100%;
	}

	.status-component-title {
		font-size: 1.5rem;
		font-weight: 600;
	}

	.status-component-description {
		display: block;
		color: #c4c4c4;
		margin-bottom: 2rem;
		margin-top: 1rem;
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

		.circle-data {
			width: 15px;
			height: 15px;

			border-radius: 50%;
			background-color: #4a4556;
		}

		.circle {
			width: 15px;
			height: 15px;

			border-radius: 50%;
			background: linear-gradient(
				90deg,
				rgba(115, 103, 240, 1) 10%,
				rgba(206, 159, 252, 1) 100%
			);
		}
	}
`;
