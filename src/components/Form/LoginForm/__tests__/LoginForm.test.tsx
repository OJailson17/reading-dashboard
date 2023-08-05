import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormComponent } from '..';

const onSignInMock = jest.fn();

jest.mock('../../../../context/AuthContext.tsx', () => ({
	useAuthentication() {
		return {
			onSignIn: onSignInMock
				.mockReturnValue(true)
				.mockReturnValueOnce(true)
				.mockReturnValueOnce(false),
		};
	},
}));

describe('Login Form Component', () => {
	beforeEach(() => {
		onSignInMock.mockClear();
	});

	it('should be able to render component', () => {
		render(<FormComponent />);

		const inputComponent = screen.getByPlaceholderText('username');

		expect(inputComponent).toBeInTheDocument();
	});

	it('should be able to call sign in function', async () => {
		render(<FormComponent />);

		const inputComponent: HTMLInputElement =
			screen.getByPlaceholderText('username');

		fireEvent.change(inputComponent, {
			target: {
				value: 'demo_user',
			},
		});

		expect(inputComponent.value).toBe('demo_user');

		waitFor(() => {
			const submitBtn = screen.getByRole('button');
			fireEvent.click(submitBtn);

			expect(onSignInMock).toHaveBeenCalled();
		});
	});

	it('should not be able to call sign in function with empty input', () => {
		render(<FormComponent />);

		const submitBtn = screen.getByRole('button');
		fireEvent.click(submitBtn);

		expect(onSignInMock).not.toHaveBeenCalled();
	});

	it('should not be able sign in with wrong username', async () => {
		render(<FormComponent />);

		const inputComponent: HTMLInputElement =
			screen.getByPlaceholderText('username');

		fireEvent.change(inputComponent, {
			target: {
				value: 'demo',
			},
		});

		expect(inputComponent.value).toBe('demo');

		const submitBtn = await screen.findByRole('button');
		fireEvent.click(submitBtn);

		expect(onSignInMock).toHaveBeenCalledTimes(1);
	});
});
