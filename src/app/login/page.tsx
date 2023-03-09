import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { PageTitle } from '@/styles/common';
import { FormComponent } from './components/Form';

export default function Login() {
	// Get token from cookies
	const token = cookies().has('@reading_dashboard:token');
	// Get database id from cookies
	const databaseIdCookie = cookies().has('@reading_dashboard:database_id');

	// Redirect to login page if token already exists
	if (token && databaseIdCookie) {
		redirect('/');
	}

	return (
		<div>
			<PageTitle>Login</PageTitle>
			<FormComponent />
		</div>
	);
}
