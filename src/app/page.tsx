'use client';

import { redirect } from 'next/navigation';
// import { cookies } from 'next/headers';
import { parseCookies } from 'nookies';

import { notion } from '@/lib/notion';
import { BookStatus } from '@/components/BooksStatus';
import { ReadingStatus } from '@/components/ReadingStatus';
import { YearlyChart } from '@/components/YearlyChart';

import { StatusComponent, StatusComponentWrapper } from './styles';
import { PageTitle } from '@/styles/common';
// import { results } from 'fakeData';
import { Library } from '@/components/Library';
import { BookContext, useBook } from '@/context/BookContext';
import { useContext, useEffect, useState } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';

interface TitleProperty {
	plain_text: string;
}

interface Book {
	object: string;
	id: string;
	icon: {
		external: {
			url: string;
		};
	};
	properties: {
		Author: {
			id: string;
			rich_text: TitleProperty[];
		};
		Rating: {
			id: string;
			type: string;
			select: {
				name: string;
			};
		};
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
		allBooksReadAndReading = reading_books.concat(finished_books);
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

					<Library books={allBooksReadAndReading} />

					{/* Yearly Graph */}
					<YearlyChart finished_books={finished_books} />
				</>
			) : (
				<LoadingScreen />
			)}
		</>
	);
}
