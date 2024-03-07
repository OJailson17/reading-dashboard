'use server';

import { cookies } from 'next/headers';

export const getUser = async () => {
	const token = cookies().get('token')?.value;
	const user_database = cookies().get('user_database_id')?.value;

	return { token, user_database };
};
