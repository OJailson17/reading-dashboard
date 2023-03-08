import { cookies } from 'next/headers';
import { PageTitle } from '@/styles/common';
import { FormComponent } from './components/Form';
import { redirect } from 'next/navigation';

export default function Login() {
	// Get token from cookies
	const token = cookies().has('@reading_dashboard:token');

	// Redirect to login page if token already exists
	if (token) {
		redirect('/');
	}

	return (
		<div>
			<PageTitle>Login</PageTitle>
			<FormComponent />
		</div>
	);
}
