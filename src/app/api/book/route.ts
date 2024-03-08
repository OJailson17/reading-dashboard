import { NextRequest, NextResponse } from 'next/server';

import { notion } from '@/lib/notion';
import {
	APIErrorCode,
	ClientErrorCode,
	isNotionClientError,
} from '@notionhq/client';

export async function GET(req: NextRequest, res: NextResponse) {
	const { searchParams } = new URL(req.url);
	const db = searchParams.get('db');

	const databaseIdCookie = `${db}`;

	try {
		// Make a query to get the database data
		const response = await notion.databases.query({
			database_id: databaseIdCookie || '',
			filter: {
				and: [
					{
						property: 'Status',
						select: {
							does_not_equal: 'Abandoned',
						},
					},
					{
						property: 'Is From This Year',
						checkbox: {
							equals: true,
						},
					},
				],
			},
			sorts: [
				{
					property: 'Finished Date',
					direction: 'descending',
				},
				{
					property: 'Started Date',
					direction: 'ascending',
				},
				{
					property: 'Name',
					direction: 'ascending',
				},
			],
		});

		return NextResponse.json(response.results);
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
