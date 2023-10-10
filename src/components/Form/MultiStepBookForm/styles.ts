import styled from 'styled-components';

import { device } from '@/styles/endpoints';

export const MultiStepFormContainer = styled.main`
	width: 90%;
	max-width: 50rem;
	margin: 3.75rem auto;
	padding: 1.875rem 1.5rem;

	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;

	background-color: #363447;
	box-shadow: 0px 0px 20px 0px #1e1e1e;
	border-radius: 16px;

	.steps-info {
		text-align: right;
	}

	@media ${device.laptopL} {
		gap: 3rem;
	}
`;

export const MultiStepFormWrapper = styled.div`
	h2 {
		margin: 1rem 0;
	}
`;

export const MultiStepActionContainer = styled.div`
	width: 100%;
	margin-top: 1rem;

	display: flex;
	align-items: center;
	/* justify-content: center; */
	gap: 1rem;

	@media ${device.mobileL} {
		width: 55%;
	}

	@media ${device.laptop} {
		width: 40%;
	}
`;

export const MultiStepActionButton = styled.button`
	width: 50%;
	height: 40px;
	border: none;
	border-radius: 6px;
	font-weight: bold;
	margin-top: 1.5rem;

	display: flex;
	align-items: center;
	justify-content: center;

	background-color: #4a4556;
	color: #fff;

	&:disabled {
		filter: brightness(80%);
	}
`;
