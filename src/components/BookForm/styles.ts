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

	.submit-btn {
		max-width: 300px;
		width: 70%;
		height: 2.5rem;
		border: none;
		border-radius: 8px;
		margin: 0 auto;
		margin-top: 1.5rem;
		background: #32ccbc;
		color: white;
		font-weight: bold;

		&:hover {
			filter: brightness(0.8);
		}
	}
`;

export const CreateBookInputContainer = styled.div`
	display: flex;
	flex-direction: column;

	label {
		margin-bottom: 0.3rem;
		font-size: 0.875rem;
		width: max-content;
	}

	input {
		max-width: 350px;
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

	.ant-radio-group-solid
		:where(
			.css-dev-only-do-not-override-12jzuas
		).ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
		background: #32ccbc;
		border-color: #32ccbc;
	}
`;
