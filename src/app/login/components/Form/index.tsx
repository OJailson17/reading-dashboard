'use client';

import { useAuthentication } from '@/context/auth';
import { FormEvent, useState } from 'react';

export const FormComponent = () => {
	const [username, setUsername] = useState('');

	const { onSignIn } = useAuthentication();

	const handleSignIn = (e: FormEvent) => {
		e.preventDefault();

		console.log(username);
		if (username !== '') {
			onSignIn(username);
		}
	};

	return (
		<form onSubmit={handleSignIn} autoComplete='off'>
			<label htmlFor='username'>
				to enter, use the demo username: demo_user
			</label>
			<br />
			<input
				type='text'
				id='username'
				name='username'
				placeholder='username'
				onChange={e => setUsername(e.target.value)}
			/>
			<br />
			<button type='submit'>Login</button>
		</form>
	);
};
