'use client';

import { useAuthentication } from '@/context/auth';
import { FormEvent, useState } from 'react';
import { Puff } from 'react-loading-icons';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { LoginForm } from './styles';

export const FormComponent = () => {
	const [username, setUsername] = useState('');
	const [isSubmitButtonDisable, setIsSubmitButtonDisable] = useState(false);

	const { onSignIn } = useAuthentication();

	const handleSignIn = async (e: FormEvent) => {
		e.preventDefault();

		// If username input is filled, make sign in request
		if (username.trim() !== '') {
			// Disable button
			setIsSubmitButtonDisable(true);

			// Call the function to make login passing the username
			const isUserLogged = await onSignIn(username.toLowerCase());
			console.log({ isUserLogged });

			// If onSignIn return false, enable submit button again
			if (!isUserLogged) {
				setIsSubmitButtonDisable(false);
			}
		}
	};

	return (
		<>
			<ToastContainer />
			<LoginForm onSubmit={handleSignIn} autoComplete='off'>
				<label htmlFor='username'>
					to enter, use the demo username: <strong> demo_user</strong>
				</label>
				<input
					type='text'
					id='username'
					name='username'
					placeholder='username'
					onChange={e => setUsername(e.target.value)}
					required
				/>
				<button type='submit' disabled={isSubmitButtonDisable}>
					{isSubmitButtonDisable ? (
						<Puff width={20} height={20} stroke='#32ccbc' />
					) : (
						'Login'
					)}
				</button>
			</LoginForm>
		</>
	);
};
