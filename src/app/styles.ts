'use client';

import styled from 'styled-components';

import { device } from '@/styles/endpoints';

export const StatusComponentWrapper = styled.div`
	width: 90%;
	margin: 0 auto;
	margin-top: 5rem;

	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 2rem;

	@media ${device.mobileL} and (max-width: 1023px) {
		flex-flow: row wrap;
	}

	@media ${device.laptop} {
		flex-direction: row;
	}
`;

export const StatusComponent = styled.div`
	width: 100%;
	max-width: 25rem;
	padding: 2rem 1.875rem;

	background-color: #363447;
	border-radius: 16px;
	text-align: center;
	box-shadow: 0px 0px 20px 0px #1e1e1e;

	@media ${device.tablet} {
		width: 100%;
	}

	@media ${device.laptop} {
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
