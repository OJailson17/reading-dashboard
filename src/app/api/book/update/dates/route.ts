import { NextRequest, NextResponse } from 'next/server';

import { notion } from '@/lib/notion';
import {
	APIErrorCode,
	ClientErrorCode,
	isNotionClientError,
} from '@notionhq/client';

export async function PATCH(req: NextRequest, res: NextResponse) {
	const { finished_date, started_date, page_id } = (await req.json()) as {
		started_date: string;
		finished_date: string;
		page_id: string;
	};

	try {
		await notion.pages.update({
			page_id,
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

		return NextResponse.json(
			{},
			{
				status: 201,
			},
		);
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
