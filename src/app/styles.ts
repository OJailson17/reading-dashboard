'use client';

import styled from 'styled-components';

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
	align-items: center;
	justify-content: center;
	gap: 2rem;
`;

export const StatusComponent = styled.div`
	width: 100%;
	/* height: 15rem; */
	padding: 2rem 1.875rem;

	background-color: #363447;
	border-radius: 16px;
	text-align: center;
	box-shadow: 0px 0px 20px 0px #1e1e1e;

	.status-component-title {
		font-size: 1.5rem;
		font-weight: 600;
	}

	.status-component-info {
		width: 100%;

		margin-top: 1.5rem;

		.info-value {
			font-size: 2.5rem;
			font-weight: 700;
		}

		& > p:nth-child(2) {
			margin-top: 1rem;
			font-size: 1.2rem;
			font-weight: 500;
		}
	}
`;
