import { sign } from 'jsonwebtoken';
import { notion } from '@/lib/notion';
import { NextRequest, NextResponse } from 'next/server';

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
	if (process.env.NODE_ENV !== 'production') {
		return NextResponse.json({
			token: process.env.DEMO_JWT,
			username: 'demo',
			database_id: process.env.DEMO_DATABASE_ID,
		});
	}

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
		// Get the database id
		const user_database_id =
			getUsername.properties.database_id.rich_text[0].plain_text;

		// Create the token
		const token = sign(
			{
				user: username,
			},
			`${process.env.JWT_SECRET}`,
		);

		return NextResponse.json({
			token,
			username,
			database_id: user_database_id,
		});
	} else {
		return NextResponse.json(
			{
				error: 'User not found!',
			},
			{
				status: 404,
			},
		);
	}
}
