'use server';

import { revalidateTag } from 'next/cache';

import { notion } from '@/lib/notion';
import {
	APIErrorCode,
	ClientErrorCode,
	isNotionClientError,
} from '@notionhq/client';

type UpdateDatesProps = {
	book_id: string;
	started_date: string;
	finished_date: string;
};

export const updateBookDates = async ({
	book_id,
	started_date,
	finished_date,
}: UpdateDatesProps) => {
	try {
		await notion.pages.update({
			page_id: book_id,
			properties: {
				'Started Date': {
					date: {
						start: started_date,
					},
				},
				'Finished Date': {
					date: {
						start: finished_date,
					},
				},
			},
		});

		revalidateTag('fetch-books');
		revalidateTag('fetch-book-stats');

		return {};
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
					return {
						error: error.message,
						status: 400,
					};
			}
		}
	}

	revalidateTag('fetch-books');
	revalidateTag('fetch-book-stats');
};
