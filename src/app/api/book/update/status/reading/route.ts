import { notion } from '@/lib/notion';
import {
	APIErrorCode,
	ClientErrorCode,
	isNotionClientError,
} from '@notionhq/client';
import { format } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

// Update the status of the book to reading
export async function PATCH(req: NextRequest, res: NextResponse) {
	const { page_id, current_page } = await req.json();

	const today = format(new Date(), 'yyyy-MM-dd');

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
			},
		});

		return NextResponse.json(response);
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
					return NextResponse.json(error, {
						status: 400,
					});
			}
		}
	}
}
