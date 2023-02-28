'use client';

import styled from 'styled-components';

import { device, size } from 'src/styles/endpoints';

export const PageTitle = styled.h1`
	font-size: 1.875rem;

	text-align: center;
	margin-top: 2rem;
`;

export const StatusComponentWrapper = styled.div`
	width: 90%;
	margin: 0 auto;
	margin-top: 5rem;

	display: flex;
	flex-direction: column;
	/* align-items: center; */
	justify-content: center;
	gap: 2rem;

	@media ${device.tablet} and (max-width: 1023px) {
		flex-flow: row wrap;
	}

	@media ${device.laptop} {
		flex-direction: row;
	}

	/* .chart-status-container {
		width: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;

		@media ${device.tablet} {
			flex-flow: column wrap;
			gap: 1rem;
		}

		@media ${device.laptop} {
			justify-content: space-around;
			background-color: yellow;
			width: 50%;
		}

	} */
`;

export const StatusComponent = styled.div`
	width: 100%;
	/* min-width: 18.5rem; */
	max-width: 25rem;
	/* min-height: 422px; */
	/* height: 15rem; */
	padding: 2rem 1.875rem;

	background-color: #363447;
	border-radius: 16px;
	text-align: center;
	box-shadow: 0px 0px 20px 0px #1e1e1e;

	@media ${device.laptop} {
		/* width: 40%; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.status-component-title {
		font-size: 1.5rem;
		font-weight: 600;

		@media ${device.laptop} {
			position: absolute;
			top: 2rem;
		}
	}

	.status-component-info {
		width: 100%;

		margin-top: 1.5rem;

		.info-value {
			font-size: 2.5rem;
			font-weight: 700;

			@media ${device.laptop} {
				font-size: 5rem;
			}
		}

		& > p:nth-child(2) {
			margin-top: 1rem;
			font-size: 1.2rem;
			font-weight: 500;
		}
	}
`;
