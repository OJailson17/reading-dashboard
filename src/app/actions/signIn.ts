'use server';

import { cookies } from 'next/headers';

export const onSignIn = async (username: string) => {
	const response = await fetch(
		`${process.env.API_BASE_URL}/auth/?username=${username}`,
		{
			next: {
				revalidate: false,
				tags: ['sign-in'],
			},
		},
	);

	const data = await response.json();

	if (data.error) {
		return { data };
	}

	const today = Date.now();
	const oneDay = 60 * 60 * 24 * 1000;

	cookies().set({
		name: 'token',
		value: data.token,
		httpOnly: true,
		path: '/',
		expires: today + oneDay,
	});

	cookies().set({
		name: 'user_database_id',
		value: data.token,
		httpOnly: true,
		path: '/',
		expires: today + oneDay,
	});

	return { data };
};
