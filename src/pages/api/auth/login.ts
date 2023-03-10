import { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'jsonwebtoken';
import { notion } from '@/lib/notion';

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

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		res.status(405).send({ message: 'Only POST requests allowed' });
		return;
	}

	const { username } = req.body;

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
			'e281e728-c362-4582-850f-8079e6f122ee',
		);

		return res.json({
			token,
			username,
			database_id: user_database_id,
		});
	} else {
		return res.status(404).json({
			error: 'User not found!',
		});
	}
};

export default Login;
