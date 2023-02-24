import { notion } from '@/lib/notion';
import { results } from 'fakeData';
import { Title } from './styles';

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
	let reading_books = 0;
	let to_read_books = 0;
	let finished_books = 0;

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
		total_books = responseResults.length;
		// reading_books = responseResults.filter(
		// 	book => book.properties.Status.select.name === 'Reading',
		// ).length;
		// to_read_books = responseResults.filter(
		// 	book => book.properties.Status.select.name === 'To read',
		// ).length;
		// finished_books = responseResults.filter(
		// 	book => book.properties.Status.select.name === 'Finished',
		// ).length;
	} catch (error) {
		console.log(error);
	}

	return <Title>Hello World!!</Title>;
}
