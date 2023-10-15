// import { result } from 'fakeData';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Book } from '@/@types/bookTypes';
import { Footer } from '@/components/Footer';
import { Library } from '@/components/Library';
import { cookiesStrings } from '@/utils/constants/storageStrings';

import { LibraryPageTitle, MainComponent } from './styles';

export const metadata = {
	title: 'Library | Reading Dashboard',
};

export default async function LibraryPage() {
	// Get token from cookies
	const token = cookies().get(cookiesStrings.TOKEN)?.value;
	// Get database id from cookies
	const databaseId = cookies().get(cookiesStrings.DATABASE_ID)?.value;

	// Redirect to login page if token does not exists
	if (!token || !databaseId) {
		redirect('/login');
	}

	let books: Book[] = [];
	let reading_books: Book[] = [];
	let to_read_books: Book[] = [];
	let finished_books: Book[] = [];

	const filterBooks = () => {
		if (books) {
			// Get the reading books
			reading_books =
				books?.filter(
					book => book.properties.Status.select.name === 'Reading',
				) || [];

			// Get the amount of books to read
			to_read_books = books?.filter(
				book => book.properties.Status.select.name === 'To read',
			);

			// Get the finished books
			finished_books =
				books?.filter(
					book => book.properties.Status.select.name === 'Finished',
				) || [];
		}
	};

	// Fetch books data from api
	await fetch(`${process.env.API_BASE_URL}/book?db=${databaseId}`)
		.then(res => res.json())
		.then(bookList => {
			// Assign books array with the api response
			books = bookList;

			console.log(JSON.stringify(bookList, null, 2));

			// Call the filter function to fill the data
			filterBooks();
		})
		.catch(err => console.log(err));

	// books = result;
	// filterBooks();

	return (
		<>
			<LibraryPageTitle>All Books</LibraryPageTitle>

			<MainComponent>
				<Library
					finished_books={finished_books}
					reading_books={reading_books}
					to_read_books={to_read_books}
				/>
			</MainComponent>

			<Footer />
		</>
	);
}
