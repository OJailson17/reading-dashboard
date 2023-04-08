import { NextApiRequest, NextApiResponse } from 'next';
import {
	APIErrorCode,
	ClientErrorCode,
	isNotionClientError,
} from '@notionhq/client';
import { notion } from '@/lib/notion';

const UpdateBookPages = async (req: NextApiRequest, res: NextApiResponse) => {
	const { db } = req.query;

	const databaseIdCookie = `${db}`;

	try {
		// Make a query to get the database data
		const response = await notion.databases.query({
			database_id: databaseIdCookie || '',
			filter: {
				property: 'Status',
				select: {
					does_not_equal: 'Abandoned',
				},
			},
		});

		return res.json(response);
	} catch (error) {
		if (isNotionClientError(error)) {
			switch (error.code) {
				case ClientErrorCode.RequestTimeout:
					return {
						error: 'Request Timeout',
					};

				case APIErrorCode.ObjectNotFound:
					return {
						error: 'Object not found',
					};

				case APIErrorCode.Unauthorized:
					return {
						error: 'Unauthorized',
					};

				default:
					console.log(error);
					return res.json(error);
			}
		}
	}
};

export default UpdateBookPages;
