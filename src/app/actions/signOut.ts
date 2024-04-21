'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const onSignOut = async () => {
	cookies().delete('session');

	redirect('/login');
};
