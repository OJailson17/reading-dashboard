import { sign } from 'jsonwebtoken';
import { notion } from '@/lib/notion';
import { NextRequest, NextResponse } from 'next/server';

import nookies from 'nookies';
import { cookies } from 'next/headers';

type TitleProperty = {
	plain_text: string;
};

type DatabaseIdProperty = {
	plain_text: string;
};

type ResultResponse = {
	object: string;
	id: string;
	properties: {
		username: {
			id: string;
			type: string;
			title: TitleProperty[];
		};
		database_id: {
			id: string;
			object: string;
			rich_text: DatabaseIdProperty[];
		};
	};
};

export async function GET(req: NextRequest, res: NextResponse) {
	// if (req.method !== 'POST') {
	// 	res.status(405).send({ message: 'Only POST requests allowed' });
	// 	return;
	// }

	const { searchParams } = new URL(req.url);
	const username = searchParams.get('username');

	const databaseId = process.env.NOTION_USERS_DATABASE_ID;

	// Make a query to get the database data
	const response = await notion.databases.query({
		database_id: databaseId || '',
	});

	const database = response.results as ResultResponse[];

	const getUsername = database.find(
		data => data.properties.username.title[0].plain_text === username,
	);

	if (getUsername) {
		const user_database_id =
			getUsername.properties.database_id.rich_text[0].plain_text;

		const token = sign(
			{
				user: username,
			},
			`${process.env.JWT_SECRET}`,
		);

		const redirectUrl = new URL('/', req.url);
		const cookiesExpireInSeconds = 60 * 60 * 24 * 7; // 7 days

		// const response = NextResponse.next();
		// response.cookies.set('@reading_dashboard:token', token, {
		// 	expires: cookiesExpireInSeconds,
		// });
		// response.cookies.set('@reading_dashboard:database_id', user_database_id, {
		// 	expires: cookiesExpireInSeconds,
		// });

		// return NextResponse.json({
		// 	response,
		// });

		// return NextResponse.redirect(redirectUrl);

		// cookies().set('@reading_dashboard:token', token, {
		// 	expires: cookiesExpireInSeconds,
		// 	path: '/',
		// });
		// cookies().set('@reading_dashboard:database_id', user_database_id, {
		// 	expires: cookiesExpireInSeconds,
		// 	path: '/',
		// });

		// nookies.set({ res }, '@reading_dashboard:token', token, {
		// 	maxAge: cookiesExpireInSeconds,
		// 	path: '/',
		// });
		// nookies.set({ res }, '@reading_dashboard:database_id', user_database_id, {
		// 	maxAge: cookiesExpireInSeconds,
		// 	path: '/',
		// });

		return NextResponse.json({
			token,
			username,
			database_id: user_database_id,
		});
	} else {
		return NextResponse.json({
			error: 'User not found!',
		});
	}
}
