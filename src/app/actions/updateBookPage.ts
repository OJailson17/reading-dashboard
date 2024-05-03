'use server';

import { revalidateTag } from 'next/cache';

import { notion } from '@/lib/notion';
import {
	APIErrorCode,
	ClientErrorCode,
	isNotionClientError,
} from '@notionhq/client';

type UpdatePagesProps = {
	book_id: string;
	current_page: number;
};

export const updateBookPage = async ({
	book_id,
	current_page,
}: UpdatePagesProps) => {
	try {
		await notion.pages.update({
			page_id: book_id,
			properties: {
				'Current Page': {
					number: Number(current_page),
				},
			},
		});

		revalidateTag('fetch-books');

		return {};
	} catch (error) {
		if (isNotionClientError(error)) {
			switch (error.code) {
				case ClientErrorCode.RequestTimeout:
					return {
						error: 'Request Timeout',
					};

				case APIErrorCode.ObjectNotFound:
					return { error: 'Object not found' };

				case APIErrorCode.Unauthorized:
					return { error: 'Unauthorized' };

				default:
					console.log(error);
					return {
						error: error.message,
						status: 400,
					};
			}
		}
	}
};
