'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const onSignOut = async () => {
	cookies().delete('token');
	cookies().delete('user_database_id');

	redirect('/login');
};
