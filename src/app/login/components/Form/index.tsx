'use client';

import { FormEvent, useState } from 'react';

export const FormComponent = () => {
	const [username, setUsername] = useState('');

	const handleSignIn = (e: FormEvent) => {
		e.preventDefault();

		console.log(username);
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
