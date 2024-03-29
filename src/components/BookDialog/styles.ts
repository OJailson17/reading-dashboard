'use client';

import styled from 'styled-components';

import { device } from '@/styles/endpoints';
import * as Dialog from '@radix-ui/react-dialog';

export const DialogOverlay = styled(Dialog.Overlay)`
	background-color: #000000d5;
	position: fixed;
	inset: 0;
	animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

export const DialogContent = styled(Dialog.Content)`
	background-color: #363447;
	border-radius: 6px;
	box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
		hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 90vw;
	max-width: 450px;
	max-height: 85vh;
	padding: 25px;
	animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

	&:focus {
		outline: none;
	}
`;

export const DialogTitle = styled(Dialog.Title)`
	margin: 0;
	font-weight: 700;
	color: #fff;
	font-size: 1.2rem;
	text-align: center;

	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2; /* start showing ellipsis when 3rd line is reached */
	white-space: pre-wrap;
`;

export const DialogClose = styled(Dialog.Close)`
	width: 7rem;
	height: 2rem;
	margin-top: 1rem;

	position: relative;
	right: -60%;

	background-color: #292738;
	color: #fff;
	border: none;
	border-radius: 7px;

	@media ${device.tablet} {
		right: -70%;
	}
`;

export const DialogContentContainer = styled.div`
	width: 100%;
	margin-top: 1rem;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	& > img {
		max-width: 150px;
		height: 100%;
		border-radius: 7px;
	}

	.placeholder-cover-dialog {
		width: 150px;
		height: 13.375rem;
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
			-webkit-line-clamp: 6;
			white-space: pre-wrap;
			text-align: center;
			font-size: 14px;
		}
	}
`;

export const DialogContentBookInfo = styled.div`
	width: 100%;
	margin-top: 1rem;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 0.8rem;

	div,
	form {
		width: 100%;
		display: flex;
		gap: 0.5rem;

		.status {
			padding: 0.2rem;
			border: none;
			border-radius: 4px;
			color: white;
		}

		.Finished {
			background-color: #2b593f;
		}

		.Reading {
			background-color: #89632a;
		}

		.tbr {
			background-color: #28456c;
		}
	}

	input {
		background-color: #292738;
		width: 50px;
		height: 25px;
		border: none;
		border-radius: 5px;
		text-align: center;
		font-weight: semibold;
		color: #fff;

		&:focus {
			outline: none;
		}

		/* Chrome, Safari, Edge, Opera */
		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}

		/* Firefox */
		&[type='number'] {
			-moz-appearance: textfield;
		}
	}

	input.error {
		border: 1px solid red;
	}

	.book-btn {
		border: none;
		border-radius: 5px;
		background-color: #292738;
		color: #fff;
		padding: 0 1rem;

		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			background-color: white;
			color: #292738;
			transition: all 0.2s ease;

			svg {
				& > g {
					stroke: #292738;
				}
			}
		}
	}
`;

export const ReadingDialogOverlay = styled(Dialog.Overlay)`
	background-color: #000000d5;
	position: fixed;
	inset: 0;
	animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

export const ReadingDialogContent = styled(Dialog.Content)`
	background-color: #363447;
	border-radius: 6px;
	box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
		hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 90vw;
	max-width: 450px;
	max-height: 85vh;
	padding: 25px;
	animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

	&:focus {
		outline: none;
	}
`;

export const ReadingDialogTitle = styled(Dialog.Title)`
	margin: 0;
	font-weight: 700;
	color: #fff;
	font-size: 1.2rem;
	text-align: center;
`;

export const ReadingDialogClose = styled(Dialog.Close)`
	width: 7rem;
	height: 2rem;
	margin-top: 1rem;

	position: relative;
	right: -60%;

	background-color: #292738;
	color: #fff;
	border: none;
	border-radius: 7px;

	@media ${device.tablet} {
		right: -70%;
	}
`;

export const ReadingDialogContentContainer = styled.div`
	margin-top: 1rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	gap: 1rem;

	div {
		label {
			margin-left: 0.5rem;
			cursor: pointer;
		}

		input {
			cursor: pointer;
		}
	}

	@media ${device.tablet} {
		flex-direction: row;
	}
`;
