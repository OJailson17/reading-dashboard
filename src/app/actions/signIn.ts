'use server';

import { cookies } from 'next/headers';

type Response = {
	token: string;
	username: string;
	database_id: string;
	monthly_goal: number | null;
	yearly_goal: number | null;
	user_id: string;
};

type ResponseError = {
	error: string;
};

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

	const user = (await response.json()) as Response | ResponseError;

	if ('error' in user) {
		return {
			error: user.error,
		};
	}

	const today = Date.now();
	const oneDay = 60 * 60 * 24 * 1000;

	cookies().set({
		name: 'token',
		value: user.token,
		httpOnly: true,
		path: '/',
		expires: today + oneDay,
	});

	cookies().set({
		name: 'user_database_id',
		value: user.database_id,
		httpOnly: true,
		path: '/',
		expires: today + oneDay,
	});

	return user;
};
