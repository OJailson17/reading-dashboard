'use client';

import styled from 'styled-components';

export const Donut = styled.div`
	position: relative;
	width: 200px;
	height: 200px;
	border-radius: 50%;
	background: #363447;
	top: 0;
	left: 0;
	background-clip: border-box;
	overflow: hidden;
`;

export const DonutDefault = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 50%;
`;

export const DonutLine = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;

	&::before {
		content: '';
		width: 1px;
		height: 100%;
		position: absolute;
		top: -25px;
		left: 50%;
		background: transparent;
		z-index: 2;
	}

	&::after {
		content: '';
		width: 100%;
		height: 1px;
		position: absolute;
		top: 50%;
		left: 25px;
		background: transparent;
		border-bottom: 1px solid transparent;
		z-index: 2;
	}
`;

export const DonutText = styled.div`
	top: 25px;
	left: 25px;
	width: 150px;
	height: 150px;
	background: #292738;
	position: absolute;
	border-radius: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index: 3;
`;

export const DonutCase = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background: #363447;
	position: absolute;
	top: 0;
	left: 0;
	background-clip: border-box;
	overflow: hidden;

	&::before {
		content: '';
		clip-path: circle(100%);
		-webkit-transform: rotate(90deg);
		transform: rotate(360deg);
		background: green;
		position: absolute;
		top: 0;
		left: 0;
		width: 50%;
		height: 100%;
	}
`;
