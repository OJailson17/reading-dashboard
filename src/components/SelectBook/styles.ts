'use client';

import * as Select from '@radix-ui/react-select';
import styled from 'styled-components';

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
