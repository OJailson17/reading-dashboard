'use server';

import { NextRequest, NextResponse } from 'next/server';

import { decrypt } from '@/utils/auth/decrypt';
import { encrypt } from '@/utils/auth/encrypt';

export async function updateSession(request: NextRequest) {
	const session = request.cookies.get('session')?.value;
	if (!session) return;

	// Refresh the session so it doesn't expire
	let parsed: any;
	try {
		parsed = await decrypt(session);
	} catch (error) {
		console.log(error);
		return;
	}

	const today = Date.now();
	const oneDay = 60 * 60 * 24 * 1000;

	parsed.expires = new Date(today + oneDay);

	const res = NextResponse.next();

	res.cookies.set({
		name: 'session',
		value: await encrypt(parsed),
		httpOnly: true,
		path: '/',
		expires: parsed.expires,
	});

	return res;
}
