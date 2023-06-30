import { notion } from '@/lib/notion';
import {
	APIErrorCode,
	ClientErrorCode,
	isNotionClientError,
} from '@notionhq/client';
import { NextRequest, NextResponse } from 'next/server';

type CreateBookDTO = {
	name: string;
	icon_url?: string;
	genres: string[];
	author: string;
	status: 'To read' | 'Reading' | 'Finished';
	language: 'Portuguese' | 'English';
	qtd_page: number;
	current_page: number;
	goodreads_review: string;
	started_date?: string;
	finished_date?: string;
	book_review?: string;
};

export async function POST(req: NextRequest, res: NextResponse) {
	const { searchParams } = new URL(req.url);
	const db = searchParams.get('db');

	const databaseIdCookie = `${db}`;

	const createBookBody = (await req.json()) as CreateBookDTO;

	try {
		// Make a query to get the database data
		const response = await notion.pages.create({
			parent: {
				database_id: databaseIdCookie,
			},
			icon: createBookBody.icon_url
				? {
						external: {
							url: createBookBody.icon_url,
						},
				  }
				: null,
			properties: {
				Name: {
					type: 'title',
					title: [
						{
							type: 'text',
							text: {
								content: createBookBody.name,
							},
						},
					],
				},
				Genre: {
					type: 'multi_select',
					multi_select: createBookBody.genres.map(genre => ({
						name: genre,
					})),
				},
				Author: {
					rich_text: [
						{
							type: 'text',
							text: {
								content: createBookBody.author,
							},
						},
					],
				},
				Status: {
					select: {
						name: createBookBody.status,
					},
				},
				Language: {
					select: {
						name: createBookBody.language,
					},
				},
				'Qtd. Pages': {
					number: createBookBody.qtd_page || 0,
				},
				'Current Page': {
					number: createBookBody.current_page || 0,
				},
				Goodreads: {
					type: 'select',
					select: {
						name: createBookBody.goodreads_review,
						color:
							createBookBody.goodreads_review === 'none' ? 'blue' : 'yellow',
					},
				},
				'Started Date': {
					type: 'date',
					date: createBookBody.started_date
						? {
								start: createBookBody.started_date,
						  }
						: null,
				},
				'Finished Date': {
					type: 'date',
					date: createBookBody.finished_date
						? {
								start: createBookBody.finished_date,
						  }
						: null,
				},
				Rating: {
					type: 'select',
					select: {
						name: createBookBody.book_review || 'none',
						color: createBookBody.book_review === 'none' ? 'blue' : 'yellow',
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
