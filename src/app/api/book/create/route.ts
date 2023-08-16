import { validateURL } from '@/utils/functions/checkURL';
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

	let bookCover: string = createBookBody.icon_url || '';

	if (!validateURL(createBookBody.icon_url || '')) {
		bookCover = `https://covers.openlibrary.org/b/isbn/${createBookBody.icon_url}-M.jpg`;
	}

	try {
		// Make a query to get the database data
		const response = await notion.pages.create({
			parent: {
				database_id: databaseIdCookie,
			},
			icon: createBookBody.icon_url
				? {
						external: {
							url: bookCover,
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
						id:
							createBookBody.goodreads_review === 'none' ||
							!createBookBody.goodreads_review
								? '90de4911-f67a-44bf-893e-3aeddb3e3e1e'
								: createBookBody.goodreads_review,
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
						id:
							createBookBody.book_review === 'none' ||
							!createBookBody.book_review
								? '90de4911-f67a-44bf-893e-3aeddb3e3e1e'
								: createBookBody.book_review,
						// name: createBookBody.book_review || 'none',
						// color: createBookBody.book_review === 'none' ? 'blue' : 'yellow',
					},
				},
				'Reading Summary': {
					type: 'relation',
					relation: [
						{
							id: `${process.env.NOTION_READING_SUMMARY_ID}`,
						},
					],
				},
			},
		});

		// console.log(JSON.stringify(getReviewProperty.object, null, 2));

		return NextResponse.json(response.object);
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
