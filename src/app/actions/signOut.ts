'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { applicationLinks } from '@/utils/constants/links';

export const onSignOut = async () => {
	cookies().delete('session');

	redirect(applicationLinks.login);
};
