'use client';

import Link from 'next/link';
import styled from 'styled-components';

export const LibraryComponentWrapper = styled.div`
	width: 90%;
	margin: 0 auto;
	margin-top: 3.75rem;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 2rem;
`;

export const LibraryComponent = styled.div`
	width: 100%;
	padding: 2rem 1.5rem;
	margin: 0 auto;

	background-color: #363447;
	border-radius: 16px;
	text-align: center;
	box-shadow: 0px 0px 20px 0px #1e1e1e;

	header {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		.library-component-title {
			font-size: 1.5rem;
			font-weight: 600;
		}

		.library-actions {
			position: absolute;
			right: 0;

			&:hover {
				cursor: pointer;
			}
		}
	}

	.library-component-subtitle {
		font-size: 1rem;
		font-weight: 600;
		text-align: left;
		margin-top: 1.5rem;
	}
`;

export const PageLink = styled(Link)`
	color: inherit;
	text-decoration: underline;

	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 1rem;
`;

export const BookSlide = styled.div`
	width: auto;
	margin: 2rem 0;
	padding-bottom: 0.5rem;

	display: grid;
	grid-template-columns: repeat(20, 1fr);
	place-items: center;
	gap: 2rem;

	overflow-x: auto;
	overflow-y: hidden;
	white-space: nowrap;

	&::-webkit-scrollbar {
		height: 0.7rem;
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
	max-width: 9.375rem;
	height: 13.375rem;

	border-radius: 10px;
	cursor: pointer;

	background-color: #2d2a42;

	img {
		max-width: 150px;
		height: 100%;
		object-fit: cover;
		border-radius: 10px;
	}

	.placeholder-cover {
		width: 150px;
		height: 100%;
		padding: 0.3rem;

		display: flex;
		align-items: center;
		justify-content: center;
		word-wrap: break-word;
		white-space: normal;
		text-overflow: ellipsis;

		background-color: #2d2a42;
		border-radius: 10px;

		p {
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 6; /* start showing ellipsis when 6th line is reached */
			white-space: pre-wrap;

			font-size: 14px;
			color: #fff;
		}
	}
`;
