// import { useRouter } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { it, describe, expect, vi, afterEach } from 'vitest';

import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginForm } from './LoginForm';

// vi.mock('next/navigation', () => ({
// 	useRouter() {
// 		return {
// 			route: '/',
// 			pathname: '',
// 			query: '',
// 			asPath: '',
// 		};
// 	},
// }));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Login Form Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should be able to render the component', async () => {
    const { getByText } = render(<LoginForm />);

    expect(getByText('enter')).toBeInTheDocument();
    expect(getByText('demo_user')).toBeInTheDocument();
  });

  it('should not be able to submit with an empty input', async () => {
    const { getByRole, findByText } = render(<LoginForm />);

    const button = getByRole('button');

    await userEvent.click(button);

    expect(await findByText('field required!')).toBeInTheDocument();
  });

  // !FIX not passing
  // it('should be able to redirect the user after the submit', async () => {
  //   const { getByRole } = render(<LoginForm />);
  //   const router = useRouter();

  //   const input = getByRole('textbox');
  //   const button = getByRole('button');

  //   await userEvent.type(input, 'demo_user');
  //   await userEvent.click(button);

  //   expect(router.push).toHaveBeenCalledWith('/');
  // });
});
