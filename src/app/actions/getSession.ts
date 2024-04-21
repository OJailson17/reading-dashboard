'use server';

import { cookies } from 'next/headers';

import { decrypt } from '@/utils/auth/decrypt';

type Payload = {
	token: string;
	database_id: string;
};

export const getSession = async () => {
	const session = cookies().get('session')?.value;

	if (!session) return null;

	try {
		const decryptedSession = (await decrypt(session)) as Payload;

		return decryptedSession;
	} catch (error) {
		console.log(error);
		return null;
	}
};
