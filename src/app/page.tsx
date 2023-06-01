import { redirect } from 'next/navigation';
import { parseCookies } from 'nookies';

import { BookStatus } from '@/components/BooksStatus';
import { ReadingStatus } from '@/components/ReadingStatus';
import { YearlyChart } from '@/components/YearlyChart';
import { Library } from '@/components/Library';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Footer } from '@/components/Footer';

// import { useBook } from '@/context/BookContext';
import { Book } from '@/types/bookTypes';

import { PageTitle } from '@/styles/common';
import { StatusComponent, StatusComponentWrapper } from './styles';
import { cookies } from 'next/headers';

export default async function Home() {
	// Get token from cookies
	const token = cookies().get('@reading_dashboard:token')?.value;
	// Get database id from cookies
	const databaseId = cookies().get('@reading_dashboard:database_id')?.value;

	// Redirect to login page if token does not exists
	if (!token || !databaseId) {
		redirect('/login');
	}

	// const { books, onGetBooks } = useBook();

	let books: Book[] = [];

	let total_books = 0;
	let reading_books: Book[] = [];
	let to_read_books = 0;
	let finished_books: Book[] = [];
	let allBooksReadAndReading: Book[] = [];

	const filterBooks = () => {
		// if (books.length > 0) {
		// Get the amount of total books
		total_books = Number(books?.length);

		// Get the reading books
		reading_books =
			books?.filter(book => book.properties.Status.select.name === 'Reading') ||
			[];

		// Get the amount of books to read
		to_read_books =
			books?.filter(book => book.properties.Status.select.name === 'To read')
				.length || 0;

		// Get the finished books
		finished_books =
			books?.filter(
				book => book.properties.Status.select.name === 'Finished',
			) || [];

		// All finished and reading books together
		// allBooksReadAndReading = reading_books.concat(finished_books);
		// }
	};

	// Fetch books data from api
	await fetch(
		`${process.env.API_BASE_URL}/book?db=${databaseId}`,
		// {
		// 	cache: 'no-store',
		// 	next: {
		// 		tags: ['books'],
		// 	},
		// }
	)
		.then(res => res.json())
		.then(bookList => {
			// Assign books array with the api response
			books = bookList;

			// Call the filter function to fill the data
			filterBooks();
		})
		.catch(err => console.log(err));

	return (
		<>
			<header>
				<PageTitle>Reading Dashboard</PageTitle>
			</header>

			<>
				<StatusComponentWrapper>
					<StatusComponent>
						<p className='status-component-title'>To Read</p>

						<div className='status-component-info'>
							<p className='info-value'>{to_read_books}</p>
							<p>Books</p>
						</div>
					</StatusComponent>
					{reading_books.length > 0 && <ReadingStatus books={reading_books} />}
					<BookStatus
						amountOfBooks={total_books}
						amountOfFinishedBooks={Number(finished_books.length)}
					/>
				</StatusComponentWrapper>

				<Library
					reading_books={reading_books}
					finished_books={finished_books}
				/>

				{/* Yearly Graph */}
				<YearlyChart finished_books={finished_books} />

				<Footer />
			</>
			{/* ) : (
				<LoadingScreen />
			)} */}
		</>
	);
}
