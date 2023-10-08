import styled from 'styled-components';

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
