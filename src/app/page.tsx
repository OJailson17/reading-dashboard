import { BookStatus } from '@/components/BooksStatus';
import { ReadingStatus } from '@/components/ReadingStatus';
import { YearlyChart } from '@/components/YearlyChart';
import { notion } from '@/lib/notion';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { results } from 'fakeData';
import { PageTitle, StatusComponent, StatusComponentWrapper } from './styles';

interface ResultResponse {
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
			title: [
				{
					plain_text: string;
				},
			];
		};
	};
}

interface HomeProps {
	total_books: number;
	to_read_books: number;
	reading_books: number;
	finished_books: number;
}

export default async function Home() {
	const databaseId = process.env.NOTION_DATABASE_ID;

	let total_books = 0;
	let reading_books;
	let to_read_books = 0;
	let finished_books: any;

	try {
		// Make a query to get the database data
		// const response = await notion.databases.query({
		// 	database_id: databaseId || '',
		// 	filter: {
		// 		property: 'Status',
		// 		select: {
		// 			does_not_equal: 'Abandoned',
		// 		},
		// 	},
		// });

		// Add type to the response results
		// const responseResults = response.results as ResultResponse[];
		const responseResults = results;

		// Get amount of books by category
		total_books = Number(responseResults.length);
		reading_books = responseResults.filter(
			book => book.properties.Status.select.name === 'Reading',
		);
		// to_read_books = responseResults.filter(
		// 	book => book.properties.Status.select.name === 'To read',
		// ).length;
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
						<p className='info-value'>{total_books}</p>
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
