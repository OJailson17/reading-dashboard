import { NextRequest, NextResponse } from 'next/server';

import { notion } from '@/lib/notion';
import {
	APIErrorCode,
	ClientErrorCode,
	isNotionClientError,
} from '@notionhq/client';
import { handleFormatDate } from '@/utils/formatDate';

// Update the status of the book to reading
export async function PATCH(req: NextRequest, res: NextResponse) {
	const { page_id, current_page } = await req.json();

	const today = handleFormatDate(new Date(), 'utc');

	try {
		const response = await notion.pages.update({
			page_id,
			properties: {
				Status: {
					select: {
						name: 'Reading',
					},
				},
				'Current Page': {
					number: Number(current_page),
				},
				'Started Date': {
					date: {
						start: today,
					},
				},
				'Finished Date': {
					date: null,
				},
			},
		});

		return NextResponse.json(response);
	} catch (error) {
		if (isNotionClientError(error)) {
			switch (error.code) {
				case ClientErrorCode.RequestTimeout:
					return NextResponse.json({
						error: 'Request Timeout',
					});

				case APIErrorCode.ObjectNotFound:
					return NextResponse.json({
						error: 'Object not found',
					});

				case APIErrorCode.Unauthorized:
					return NextResponse.json({
						error: 'Unauthorized',
					});

				default:
					console.log(error);
					return NextResponse.json(error, {
						status: 400,
					});
			}
		}
	}
}
