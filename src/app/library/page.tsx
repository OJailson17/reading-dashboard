import { redirect } from 'next/navigation';

import { Library } from '@/components/Library';
import { Book } from '@/types/bookTypes';
import { LibraryPageTitle, MainComponent } from './styles';
import { Footer } from '@/components/Footer';
import { cookies } from 'next/headers';

export const metadata = {
	title: 'Library | Reading Dashboard',
};

export default async function LibraryPage() {
	// Get token from cookies
	const token = cookies().get('@reading_dashboard:token')?.value;
	// Get database id from cookies
	const databaseId = cookies().get('@reading_dashboard:database_id')?.value;

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
	await fetch(`http://localhost:3000/api/book?db=${databaseId}`, {
		cache: 'default',
	})
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
