import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { PageTitle } from '@/styles/common';
import { cookiesStrings } from '@/utils/constants/storageStrings';

import { FormComponent } from '../../components/Form/LoginForm';

export const metadata = {
	title: 'Login | Reading Dashboard',
};

export default function Login() {
	// Get token from cookies
	const token = cookies().has(cookiesStrings.TOKEN);
	// Get database id from cookies
	const databaseIdCookie = cookies().has(cookiesStrings.DATABASE_ID);

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
