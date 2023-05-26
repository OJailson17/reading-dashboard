'use client';

import { Library } from '@/components/Library';
import { useBook } from '@/context/BookContext';
import { Book } from '@/types/bookTypes';
import { redirect } from 'next/navigation';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';
import { LibraryPageTitle, MainComponent } from './styles';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Footer } from '@/components/Footer';

export const metadata = {
	title: 'Library | Reading Dashboard',
};

export default function LibraryPage() {
	// Get token from cookies
	const { '@reading_dashboard:token': token } = parseCookies();
	// Get database id from cookies
	const { '@reading_dashboard:database_id': databaseId } = parseCookies();

	// Redirect to login page if token does not exists
	if (!token || !databaseId) {
		redirect('/login');
	}

	const { books, onGetBooks } = useBook();

	let reading_books: Book[] = [];
	let to_read_books: Book[] = [];
	let finished_books: Book[] = [];

	if (books) {
		// Get the reading books
		reading_books =
			books?.filter(book => book.properties.Status.select.name === 'Reading') ||
			[];

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

	useEffect(() => {
		onGetBooks({ databaseId, token });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// If there is no books yet, add a loading screen
	if (to_read_books.length <= 0) return <LoadingScreen />;

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
