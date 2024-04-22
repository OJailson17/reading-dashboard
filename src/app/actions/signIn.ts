'use server';

import { cookies } from 'next/headers';

import { encrypt } from '@/utils/auth/encrypt';

type Response = {
	user: {
		username: string;
		database_id: string;
		monthly_goal: number | null;
		yearly_goal: number | null;
		user_id: string;
	};
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

	const auth = (await response.json()) as Response | ResponseError;

	if ('error' in auth) {
		return {
			error: auth.error,
		};
	}

	const today = Date.now();
	const oneDay = 60 * 60 * 24 * 1000;

	const encryptedSession = await encrypt({
		database_id: auth.user.database_id,
	});

	cookies().set({
		name: 'session',
		value: encryptedSession,
		httpOnly: true,
		path: '/',
		expires: today + oneDay,
	});

	return auth.user;
};
