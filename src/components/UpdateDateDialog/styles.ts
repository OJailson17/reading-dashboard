import * as Dialog from '@radix-ui/react-dialog';
import { Button, Modal } from 'antd';

import styled from 'styled-components';

import { device } from '@/styles/endpoints';

export const DateDialogOverlay = styled(Dialog.Overlay)`
	background-color: #000000d5;
	position: fixed;
	inset: 0;
	animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

export const DateDialogTitle = styled(Dialog.Title)`
	margin: 0;
	font-weight: 700;
	color: #fff;
	font-size: 1.2rem;
	text-align: center;
`;

export const DateDialogContent = styled(Dialog.Content)`
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

export const DateDialogClose = styled(Dialog.Close)`
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

export const DateModal = styled(Modal)`
	max-width: 450px;
`;

export const ModalContent = styled.div`
	margin-top: 1rem;

	display: flex;
	flex-direction: column;
	gap: 1rem;

	span[role='img'] {
		color: #494949;
	}

	.ant-picker-input input::placeholder {
		color: #494949;
	}
`;
