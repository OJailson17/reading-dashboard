import { NextRequest, NextResponse } from 'next/server';

import { Book } from '@/@types/book';
import { notion } from '@/lib/notion';
import {
	APIErrorCode,
	ClientErrorCode,
	isNotionClientError,
} from '@notionhq/client';

export async function POST(req: NextRequest, res: NextResponse) {
	const { searchParams } = new URL(req.url);
	const db = searchParams.get('db');

	const databaseIdCookie = `${db}`;

	console.log({ req });

	// const createBookBody = (await req.json()) as Book;

	// console.log({ createBookBody });

	return NextResponse.json(req, {
		status: 201,
	});

	// try {
	// 	// Make a query to get the database data
	// 	const response = await notion.pages.create({
	// 		parent: {
	// 			database_id: databaseIdCookie,
	// 		},
	// 		icon: createBookBody.cover_url
	// 			? {
	// 					external: {
	// 						url: createBookBody.cover_url,
	// 					},
	// 			  }
	// 			: null,
	// 		properties: {
	// 			Name: {
	// 				type: 'title',
	// 				title: [
	// 					{
	// 						type: 'text',
	// 						text: {
	// 							content: createBookBody.title,
	// 						},
	// 					},
	// 				],
	// 			},
	// 			Genre: {
	// 				type: 'multi_select',
	// 				multi_select: createBookBody.genres.map(genre => ({
	// 					name: genre.name,
	// 				})),
	// 			},
	// 			Author: {
	// 				rich_text: [
	// 					{
	// 						type: 'text',
	// 						text: {
	// 							content: createBookBody.author,
	// 						},
	// 					},
	// 				],
	// 			},
	// 			Status: {
	// 				select: {
	// 					name: createBookBody.status,
	// 				},
	// 			},
	// 			Language: {
	// 				select: {
	// 					name: createBookBody.language,
	// 				},
	// 			},
	// 			'Qtd. Pages': {
	// 				number: createBookBody.total_pages || 0,
	// 			},
	// 			'Current Page': {
	// 				number: createBookBody.current_page || 0,
	// 			},
	// 			Goodreads: {
	// 				type: 'select',
	// 				select: {
	// 					id: createBookBody.goodreads || '',
	// 				},
	// 			},
	// 			'Started Date': {
	// 				type: 'date',
	// 				date: createBookBody.started_date
	// 					? {
	// 							start: createBookBody.started_date,
	// 					  }
	// 					: null,
	// 			},
	// 			'Finished Date': {
	// 				type: 'date',
	// 				date: createBookBody.finished_date
	// 					? {
	// 							start: createBookBody.finished_date,
	// 					  }
	// 					: null,
	// 			},
	// 			Rating: {
	// 				type: 'select',
	// 				select: {
	// 					id: createBookBody.review || '',
	// 				},
	// 			},
	// 			'Reading Summary': {
	// 				type: 'relation',
	// 				relation: [
	// 					{
	// 						id: `${process.env.NOTION_READING_SUMMARY_ID}`,
	// 					},
	// 				],
	// 			},
	// 			'Book Price': {
	// 				type: 'number',
	// 				number: Number(createBookBody.book_price) || null,
	// 			},
	// 		},
	// 	});

	// 	return NextResponse.json(response, {
	// 		status: 201,
	// 	});
	// } catch (error) {
	// 	if (isNotionClientError(error)) {
	// 		switch (error.code) {
	// 			case ClientErrorCode.RequestTimeout:
	// 				return NextResponse.json({
	// 					error: 'Request Timeout',
	// 				});

	// 			case APIErrorCode.ObjectNotFound:
	// 				return NextResponse.json({
	// 					error: 'Object not found',
	// 				});

	// 			case APIErrorCode.Unauthorized:
	// 				return NextResponse.json({
	// 					error: 'Unauthorized',
	// 				});

	// 			default:
	// 				console.log(error);
	// 				return NextResponse.json(error, {
	// 					status: 400,
	// 				});
	// 		}
	// 	}
	// }
}
