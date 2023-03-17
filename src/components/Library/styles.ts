'use client';

import { device } from '@/styles/endpoints';
import styled from 'styled-components';

export const LibraryComponentWrapper = styled.div`
	width: 90%;
	margin: 0 auto;
	margin-top: 3.75rem;

	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 2rem;

	/* @media ${device.tablet} and (max-width: 1023px) {
		flex-flow: row wrap;
	}

	@media ${device.laptop} {
		flex-direction: row;
	} */
`;

export const LibraryComponent = styled.div`
	width: 100%;
	padding: 2rem 1.5rem;
	margin: 0 auto;

	background-color: #363447;
	border-radius: 16px;
	text-align: center;
	box-shadow: 0px 0px 20px 0px #1e1e1e;

	/* display: flex;
	align-items: center;
	justify-content: space-between; */
	/* flex-direction: column; */

	.library-component-title {
		font-size: 1.5rem;
		font-weight: 600;
	}

	@media ${device.tablet} {
		width: 45%;
	}

	@media ${device.laptop} {
		width: 100%;
	}

	/* .status-component-description {
		display: block;
		color: #c4c4c4;
		margin-bottom: 2rem;
		margin-top: 1rem;
	} */
`;

export const BookSlide = styled.div`
	width: auto;
	margin: 2rem 0;
	padding-bottom: 0.5rem;

	display: flex;
	align-items: center;
	gap: 2rem;

	/* background-color: red; */

	overflow-x: auto;
	overflow-y: hidden;
	white-space: nowrap;

	&::-webkit-scrollbar {
		height: 0.7rem;
		/* margin: 3rem; */
		/* top: 1rem; */
		/* display: none; */
	}
	&::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	}
	&::-webkit-scrollbar-thumb {
		background-color: #292738;
		outline: 1px solid transparent;
	}
`;

export const BookComponent = styled.div`
	/* width: 100%; */
	max-width: 9.375rem;
	height: 13.375rem;

	border-radius: 10px;
	cursor: pointer;

	img {
		max-width: 150px;
		height: 100%;
		object-fit: cover;
	}
`;
