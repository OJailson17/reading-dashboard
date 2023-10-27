// import { result } from 'fakeData';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Book } from '@/@types/bookTypes';
import { BookStatus } from '@/components/BooksStatus';
import { Footer } from '@/components/Footer';
import { Library } from '@/components/Library';
import { ReadingStatus } from '@/components/ReadingStatus';
import { YearlyChart } from '@/components/YearlyChart';
import { PageTitle } from '@/styles/common';
import { cookiesStrings } from '@/utils/constants/storageStrings';

import { StatusComponent, StatusComponentWrapper } from './styles';

export default async function Home() {
	// Get token from cookies
	const token = cookies().get(cookiesStrings.TOKEN)?.value;
	// Get database id from cookies
	const databaseId = cookies().get(cookiesStrings.DATABASE_ID)?.value;

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
	await fetch(`${process.env.API_BASE_URL}/book?db=${databaseId}`)
		.then(res => res.json())
		.then(bookList => {
			// Assign books array with the api response
			books = bookList;

			// console.log(bookList[0].properties);

			// Call the filter function to fill the data
			filterBooks();
		})
		.catch(err => console.log(err));

	// books = result;
	// filterBooks();

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
				{finished_books && <YearlyChart finished_books={finished_books} />}

				<Footer />
			</>
			{/* ) : (
				<LoadingScreen />
			)} */}
		</>
	);
}
