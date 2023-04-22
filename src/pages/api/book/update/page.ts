import { NextApiRequest, NextApiResponse } from 'next';
import {
	APIErrorCode,
	ClientErrorCode,
	isNotionClientError,
} from '@notionhq/client';
import { notion } from '@/lib/notion';

const UpdateBookPages = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'PATCH') {
		res.status(405).send({ message: 'Only PATCH requests allowed' });
		return;
	}

	const { current_page, page_id } = req.body as {
		current_page: number;
		page_id: string;
	};

	console.log({ current_page, page_id });

	try {
		const response = await notion.pages.update({
			page_id,
			properties: {
				'Current Page': {
					number: Number(current_page),
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