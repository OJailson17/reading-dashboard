'use client';

import styled from 'styled-components';

import { device } from '@/styles/endpoints';

export const LoginForm = styled.form`
	width: 90%;
	max-width: 25rem;
	margin: 2rem auto;
	padding: 1rem 0.5rem;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	label {
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		align-self: flex-start;

		@media ${device.tablet} {
			font-size: 1rem;
		}

		strong {
			color: #32ccbc;
		}
	}

	input {
		width: 100%;
		height: 50px;
		padding: 0.5rem;
		border-radius: 6px;
		border: none;
		font-size: 1.1rem;
		outline: none;
		background-color: #363447;
		color: #fff;

		&::placeholder {
			color: #c4c4c4;
		}
	}

	button {
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
	}
`;
