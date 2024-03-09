import { NextRequest, NextResponse } from 'next/server';

import { notion } from '@/lib/notion';
import {
	APIErrorCode,
	ClientErrorCode,
	isNotionClientError,
} from '@notionhq/client';

export async function PATCH(req: NextRequest, res: NextResponse) {
	const { current_page, page_id } = (await req.json()) as {
		current_page: number;
		page_id: string;
	};

	try {
		const response = await notion.pages.update({
			page_id,
			properties: {
				'Current Page': {
					number: Number(current_page),
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
