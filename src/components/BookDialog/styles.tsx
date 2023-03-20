'use client';

import * as Dialog from '@radix-ui/react-dialog';

import styled from 'styled-components';

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
	font-weight: 500;
	color: #fff;
	font-size: 17px;
`;

export const DialogClose = styled(Dialog.Close)`
	width: 5rem;
	height: 30px;
	background-color: #292738;
	color: #fff;
	border: none;
	border-radius: 7px;
`;
