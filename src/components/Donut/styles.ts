'use client';

import styled from 'styled-components';

export const Donut = styled.div`
	position: relative;
	width: 12.5rem;
	height: 12.5rem;
	border-radius: 50%;
	background: #4a4556;
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
	top: 1.5rem;
	left: 1.5rem;
	width: 9.375rem;
	height: 9.375rem;
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
	background: #4a4556;
	position: absolute;
	top: 0;
	left: 0;
	background-clip: border-box;
	overflow: hidden;

	&::before {
		content: '';
		clip-path: circle(100%);
		-webkit-transform: rotate(360deg);
		transform: rotate(-360deg);
		background: linear-gradient(
			90deg,
			rgba(115, 103, 240, 1) 10%,
			rgba(206, 159, 252, 1) 100%
		);
		position: absolute;
		top: 0;
		left: 0;
		width: 70%;
		height: 100%;
	}
`;

// background: linear-gradient(90deg, rgba(223,151,128,1) 10%, rgba(166,109,233,1) 100%);
