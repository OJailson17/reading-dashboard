import { notion } from '@/lib/notion';
import {
	APIErrorCode,
	ClientErrorCode,
	isNotionClientError,
} from '@notionhq/client';
import { format } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';

// Update the status of the book to finished, update the page and set the finished date to today
const UpdateBookStatusToFinished = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	if (req.method !== 'PATCH') {
		res.status(405).send({ message: 'Only PATCH requests allowed' });
		return;
	}

	const { page_id, current_page } = req.body as {
		page_id: string;
		current_page: string;
	};

	console.log({ page_id });

	const today = format(new Date(), 'yyyy-MM-dd');

	try {
		const response = await notion.pages.update({
			page_id,
			properties: {
				Status: {
					select: {
						name: 'Finished',
					},
				},
				'Current Page': {
					number: Number(current_page),
				},
				'Finished Date': {
					date: {
						start: today,
					},
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

export default UpdateBookStatusToFinished;
