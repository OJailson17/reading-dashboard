import { device } from '@/styles/endpoints';
import styled from 'styled-components';

export const CreateBookForm = styled.form`
	width: 90%;
	max-width: 90rem;
	margin: 3.75rem auto;
	padding: 1.875rem 1.5rem;

	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;

	background-color: #363447;
	box-shadow: 0px 0px 20px 0px #1e1e1e;
	border-radius: 16px;

	@media ${device.laptopL} {
		gap: 3rem;
	}

	.inputs-group {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;

		@media ${device.tablet} {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}

		@media ${device.laptopL} {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.form-actions {
		width: 100%;
		max-width: 700px;
		margin-top: 1.5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		@media ${device.tablet} {
			flex-direction: row;
			width: 60%;
			margin: 1.5rem auto;
			gap: 2rem;
		}

		.form-btn {
			max-width: 300px;
			width: 70%;
			height: 2.5rem;
			border: none;
			border-radius: 8px;
			color: white;
			font-weight: bold;

			&:hover {
				filter: brightness(0.8);
			}
		}

		.submit-btn {
			background: #1677ff;
		}

		.cancel-btn {
			background-color: #9e9e9e;
		}
	}
`;

export const CreateBookInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 350px;

	label {
		margin-bottom: 0.3rem;
		font-size: 0.875rem;
		width: max-content;
	}

	input {
		height: 2.5rem;
		border-radius: 8px;
		padding: 0 1rem;
		outline: none;
		border: none;
	}

	.error-message {
		font-size: 14px;
		color: #ea5455;
	}

	.ant-select {
		max-width: 350px;
	}

	.ant-radio-button-wrapper {
		border: none;

		&::before {
			content: '';
			display: none;
		}
	}

	span[role='img'] {
		color: #494949;
	}

	.ant-picker-input input::placeholder {
		color: #494949;
	}
`;
