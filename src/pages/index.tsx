import { notion } from '@/lib/notion';
import { GetServerSideProps } from 'next';

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

export default function Home(data: HomeProps) {
	return <h1>Hello World!!</h1>;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
	const databaseId = process.env.NOTION_DATABASE_ID;

	let total_books = 0;
	let reading_books = 0;
	let to_read_books = 0;
	let finished_books = 0;

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
		const responseResults = response.results as ResultResponse[];

		// Get amount of books by category
		total_books = responseResults.length;
		reading_books = responseResults.filter(
			book => book.properties.Status.select.name === 'Reading',
		).length;
		to_read_books = responseResults.filter(
			book => book.properties.Status.select.name === 'To read',
		).length;
		finished_books = responseResults.filter(
			book => book.properties.Status.select.name === 'Finished',
		).length;
	} catch (error) {
		console.log(error);
	}

	return {
		props: {
			total_books,
			to_read_books,
			reading_books,
			finished_books,
		},
	};
};
