import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { notion } from '@/lib/notion';
import { BookStatus } from '@/components/BooksStatus';
import { ReadingStatus } from '@/components/ReadingStatus';
import { YearlyChart } from '@/components/YearlyChart';

import { StatusComponent, StatusComponentWrapper } from './styles';
import { PageTitle } from '@/styles/common';

interface TitleProperty {
	plain_text: string;
}

interface Book {
	object: string;
	id: string;
	properties: {
		Status: {
			id: string;
			type: string;
			select: {
				id: string;
				name: string;
				color: string;
			};
		};
		Name: {
			id: string;
			type: string;
			title: TitleProperty[];
		};
		'Current Page': {
			id: string;
			type: number;
			number: number;
		};
		'Qtd. Pages': {
			id: string;
			type: number;
			number: number;
		};
		'Finished Date': {
			id: string;
			type: string;
			date: {
				start: string;
			};
		};
	};
}

export default async function Home() {
	// Get token from cookies
	const token = cookies().has('@reading_dashboard:token');
	// Get database id from cookies
	const databaseIdCookie = cookies().get('@reading_dashboard:database_id');

	// Sign the database id value into this variable
	const databaseId = databaseIdCookie?.value;

	// Redirect to login page if token does not exists
	if (!token || !databaseIdCookie) {
		redirect('/login');
	}

	let total_books = 0;
	let reading_books: Book[] = [];
	let to_read_books = 0;
	let finished_books: Book[] = [];

	try {
		// Make a query to get the database data
		const response = await notion.databases.query({
			database_id: databaseId || '',
			filter: {
				property: 'Status',
				select: {
					does_not_equal: 'Abandoned',
				},
			},
		});

		// Add type to the response results
		const responseResults = response.results as Book[];
		// const responseResults: ResultResponse[] = results;

		// Get the amount of total books
		total_books = Number(responseResults.length);

		// Get the reading books
		reading_books = responseResults.filter(
			book => book.properties.Status.select.name === 'Reading',
		);

		// Get the amount of books to read
		to_read_books = responseResults.filter(
			book => book.properties.Status.select.name === 'To read',
		).length;

		// Get the finished books
		finished_books = responseResults.filter(
			book => book.properties.Status.select.name === 'Finished',
		);
	} catch (error) {
		console.log(error);
	}

	return (
		<>
			<header>
				<PageTitle>Reading Dashboard</PageTitle>
			</header>

			<StatusComponentWrapper>
				<StatusComponent>
					<p className='status-component-title'>To Read</p>

					<div className='status-component-info'>
						<p className='info-value'>{to_read_books}</p>
						<p>Books</p>
					</div>
				</StatusComponent>
				<ReadingStatus books={reading_books} />
				<BookStatus
					amountOfBooks={total_books}
					amountOfFinishedBooks={Number(finished_books.length)}
				/>
			</StatusComponentWrapper>

			{/* Yearly Graph */}
			<YearlyChart finished_books={finished_books} />
		</>
	);
}
