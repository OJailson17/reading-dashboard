import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormComponent } from '..';

jest.mock('next/navigation', () => ({
	useRouter() {
		return {
			route: '/',
			pathname: '',
			query: '',
			asPath: '',
		};
	},
}));

const onSignInMock = jest.fn();

jest.mock('../../../../context/AuthContext.tsx', () => ({
	useAuthentication() {
		return {
			onSignIn: onSignInMock.mockResolvedValue(true),
		};
	},
}));

describe('Login Form Component', () => {
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
});
