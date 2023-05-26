import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { FormComponent } from './components/Form';

import { PageTitle } from '@/styles/common';

export const metadata = {
	title: 'Login | Reading Dashboard',
};

export default function Login() {
	// Get token from cookies
	const token = cookies().has('@reading_dashboard:token');
	// Get database id from cookies
	const databaseIdCookie = cookies().has('@reading_dashboard:database_id');

	// Redirect to login page if token already exists
	if (token && databaseIdCookie) {
		// redirect('/');
		console.log({ token, databaseIdCookie });
	}

	const handleSignIn = () => {};

	return (
		<div>
			<PageTitle>Login</PageTitle>
			<FormComponent />
		</div>
	);
}
