'use client';

import { useAuthentication } from '@/context/auth';
import { FormEvent, useState } from 'react';
import { Puff } from 'react-loading-icons';
import { LoginForm } from './styles';

export const FormComponent = () => {
	const [username, setUsername] = useState('');
	const [isSubmitButtonDisable, setIsSubmitButtonDisable] = useState(false);

	const { onSignIn } = useAuthentication();

	const handleSignIn = (e: FormEvent) => {
		e.preventDefault();

		// If username input is filled, make sign in request
		if (username.trim() !== '') {
			console.log(username);
			setIsSubmitButtonDisable(true);
			onSignIn(username.toLowerCase());
		}
	};

	return (
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
	);
};
