'use client';

import styled from 'styled-components';

export const DonutContainer = styled.div`
	display: grid;
	place-content: center;
	position: relative;
`;

// Calculate the stroke dashoffset
const calcStrokeDash = (percentage: number) => {
	const circumference = Math.round(2 * 3.14 * 98.5);
	const fillLength = circumference - (circumference * percentage) / 100;
	return fillLength;
};

type DonutSvgProps = {
	read_percentage: number;
};

export const DonutSvg = styled.svg<DonutSvgProps>`
	width: 197px;
	height: 197px;
	transform: rotate(-90deg);

	circle {
		stroke-dasharray: 618;
		stroke-dashoffset: 618;
		stroke-width: 35;
		fill: none;

		&:nth-child(1) {
			stroke-dashoffset: 0;
		}

		&:nth-child(2) {
			stroke-dashoffset: ${props => `${calcStrokeDash(props.read_percentage)}`};
			stroke-linecap: round;
			animation: progress 1s;

			@keyframes progress {
				0% {
					stroke-dasharray: 618;
					stroke-dashoffset: 618;
				}
			}
		}
	}
`;

export const DonutMiddleContent = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
