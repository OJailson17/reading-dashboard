'use client';

import { redirect } from 'next/navigation';
import { parseCookies } from 'nookies';
import { BookStatus } from '@/components/BooksStatus';
import { ReadingStatus } from '@/components/ReadingStatus';
import { YearlyChart } from '@/components/YearlyChart';

import { StatusComponent, StatusComponentWrapper } from './styles';
import { PageTitle } from '@/styles/common';
import { Library } from '@/components/Library';
import { useBook } from '@/context/BookContext';
import { useEffect } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Book } from '@/types/bookTypes';
import { Footer } from '@/components/Footer';

export default function Home() {
	// Get token from cookies
	const { '@reading_dashboard:token': token } = parseCookies();
	// Get database id from cookies
	const { '@reading_dashboard:database_id': databaseId } = parseCookies();

	// Redirect to login page if token does not exists
	if (!token || !databaseId) {
		redirect('/login');
	}

	const { books, onGetBooks } = useBook();

	let total_books = 0;
	let reading_books: Book[] = [];
	let to_read_books = 0;
	let finished_books: Book[] = [];
	let allBooksReadAndReading: Book[] = [];

	if (books) {
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
	}

	useEffect(() => {
		onGetBooks({ databaseId, token });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<header>
				<PageTitle>Reading Dashboard</PageTitle>
			</header>

			{books && books.length > 0 ? (
				<>
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

					<Library
						reading_books={reading_books}
						finished_books={finished_books}
					/>

					{/* Yearly Graph */}
					<YearlyChart finished_books={finished_books} />

					<Footer />
				</>
			) : (
				<LoadingScreen />
			)}
		</>
	);
}
