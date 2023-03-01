'use client';

import * as Select from '@radix-ui/react-select';
import styled from 'styled-components';
import { device } from 'src/styles/endpoints';

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
	justify-content: center;
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

	.status-component-book-name {
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

export const SelectTriggerButton = styled(Select.Trigger)`
	width: 100%;
	margin: 2rem 0;
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 4px;
	padding: 0 15px;
	font-size: 1rem;
	line-height: 1;
	height: 35px;
	gap: 10px;
	background-color: transparent;
	border: none;
	color: #c4c4c4;

	&:hover {
		background-color: aqua;
	}
`;

export const SelectContent = styled(Select.Content)`
	/* width: 100%; */
	overflow: hidden;
	background-color: white;
	border-radius: 6px;
	border: 1px solid blue;
	z-index: 3;
`;

export const SelectViewport = styled(Select.Viewport)`
	width: 100%;
	position: absolute;
`;

export const SelectItem = styled(Select.Item)`
	width: 100%;
	height: 40px;
	font-size: 13px;
	line-height: 1;
	color: red;
	border-radius: 3px;
	display: flex;
	align-items: center;
	padding: 0 35px 0 25px;
	position: relative;
	user-select: none;

	&[data-highlighted] {
		outline: none;
		background-color: gray;
		color: black;
	}

	&[data-disabled] {
		pointer-events: none;
		color: gray;
	}
`;
