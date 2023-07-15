'use client';

import { BookSlideComponent } from './BookSlide';

import { Book } from '@/@types/bookTypes';
import {
	BookSlide,
	LibraryComponent,
	LibraryComponentWrapper,
	PageLink,
} from './styles';
import { useEffect, useState } from 'react';
import { useBook } from '@/context/BookContext';
import { Dropdown } from 'antd';
import { ImBooks, ImHome } from 'react-icons/im';
import { BiSolidBookAdd } from 'react-icons/bi';

interface LibraryBooks {
	reading_books: Book[];
	finished_books: Book[];
	to_read_books?: Book[];
}

export const Library = ({
	reading_books,
	finished_books,
	to_read_books,
}: LibraryBooks) => {
	const [allBooks, setAllBooks] = useState<LibraryBooks>({
		reading_books,
		finished_books,
		to_read_books,
	});

	const { books } = useBook();

	useEffect(() => {
		const filterBooks = () => {
			// Get the reading books
			const reading =
				books?.filter(
					book => book.properties.Status.select.name === 'Reading',
				) || [];

			// Get the amount of books to read
			const toRead =
				books?.filter(
					book => book.properties.Status.select.name === 'To read',
				) || [];

			// Get the finished books
			const finished =
				books?.filter(
					book => book.properties.Status.select.name === 'Finished',
				) || [];

			setAllBooks({
				to_read_books: toRead,
				reading_books: reading,
				finished_books: finished,
			});
		};

		if (books && books.length > 0) {
			filterBooks();
		}
	}, [books]);

	const items = [
		{
			key: '1',
			label: (
				<div className='action-links'>
					{!to_read_books ? (
						<PageLink href={'/library'}>
							<ImBooks />
							Library
						</PageLink>
					) : (
						<PageLink href={'/'} prefetch={false}>
							<ImHome />
							Home
						</PageLink>
					)}
				</div>
			),
		},
		{
			key: '2',
			label: (
				<div className='action-links'>
					<PageLink href={'/book/create'}>
						<BiSolidBookAdd />
						Add Book
					</PageLink>
				</div>
			),
		},
	];

	return (
		<LibraryComponentWrapper>
			<LibraryComponent>
				<header>
					<p className='library-component-title'>Library</p>

					<div className='library-actions'>
						<Dropdown menu={{ items }} overlayStyle={{ background: '#292738' }}>
							<a onClick={e => e.preventDefault()}>More</a>
						</Dropdown>
					</div>
				</header>

				{to_read_books && (
					<div>
						<p className='library-component-subtitle'>
							TBR (
							{(allBooks.to_read_books && allBooks.to_read_books.length) || 0})
						</p>
						<BookSlide>
							<BookSlideComponent books={allBooks.to_read_books || []} />
						</BookSlide>
					</div>
				)}

				<div>
					<p className='library-component-subtitle'>
						Reading ({allBooks.reading_books.length || 0})
					</p>
					<BookSlide>
						<BookSlideComponent books={allBooks.reading_books} />
					</BookSlide>
				</div>
				<div>
					<p className='library-component-subtitle'>
						Finished ({allBooks.finished_books.length || 0})
					</p>
					<BookSlide>
						<BookSlideComponent books={allBooks.finished_books} />
					</BookSlide>
				</div>
			</LibraryComponent>
		</LibraryComponentWrapper>
	);
};
