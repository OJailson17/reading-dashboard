/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';

import { DonutComponent } from '../Donut';
import { SelectBook } from '../SelectBook';

import { Book } from '@/types/bookTypes';
import { ChartDataWrapper, StatusComponent } from '@/styles/common';
import { useBook } from '@/context/BookContext';
import { calculateBookPercentage } from '@/utils/calculateBookPercentage';
import { getBookWithGraterProgress } from '@/utils/getGraterProgress';

interface ReadingStatusProps {
	books: Book[];
}

export const ReadingStatus = ({ books }: ReadingStatusProps) => {
	const [readingBooks, setReadingBooks] = useState<Book[]>(books);
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [selectedBook, setSelectedBook] = useState<Book>(books[0]);
	const [selectedBookName, setSelectedBookName] = useState('');

	console.log(selectedBookName);

	// Book context hook
	const { books: allBooks } = useBook();

	// Get the selected book and set on selectedBook state
	const handleChangeSelectedBook = (book: string) => {
		setSelectedBookName(book);
	};

	// Update the whole card values
	const updateCardValues = () => {
		// Find a book with the same name as the selected book state
		const getBookData = readingBooks.find(
			(book: any) =>
				book.properties.Name.title[0].plain_text === selectedBookName,
		);

		if (getBookData) {
			setSelectedBook(getBookData);
			setCurrentPage(getBookData.properties['Current Page'].number);
			setTotalPages(getBookData.properties['Qtd. Pages'].number);
		}
	};

	// Map through the books list and get just the name of the books
	const bookNames = getBookWithGraterProgress(readingBooks);

	// readingBooks?.map((book: Book) => {
	// 	return book.properties.Name.title[0].plain_text;
	// });

	// When the the name of the book changes, update the book data to the new book name
	useEffect(() => {
		console.log({ selectedBookName });
		updateCardValues();
	}, [selectedBookName]);

	// When the books list changes, update all the card data
	useEffect(() => {
		console.log({ bookNames1: bookNames[0], selectedBookName });
		if (bookNames[0] !== selectedBookName) {
			setSelectedBookName(bookNames[0]);
			return;
		}

		updateCardValues();
	}, [readingBooks]);

	// If the books get updated, get just the reading books and rerender
	useEffect(() => {
		const filterBooks = () => {
			return allBooks?.filter(
				book => book.properties.Status.select.name === 'Reading',
			);
		};

		if (allBooks && allBooks?.length > 0) {
			setReadingBooks(() => filterBooks() || []);
		}
	}, [allBooks]);

	// Calculate the percentage of how much the book was read
	const readPercentage = calculateBookPercentage({
		currentPage: selectedBook?.properties['Current Page']?.number,
		totalPages: selectedBook?.properties['Qtd. Pages']?.number,
	});

	return (
		<StatusComponent>
			<p className='status-component-title'>Reading</p>

			{/* If there is more the one book render a select element, if not render just the name of the book */}
			{readingBooks?.length > 1 ? (
				<SelectBook books={bookNames} onSelectBook={handleChangeSelectedBook} />
			) : (
				<span className='status-component-description'>{selectedBookName}</span>
			)}

			<DonutComponent read_percentage={readPercentage} />

			<ChartDataWrapper>
				<div className='chart-data'>
					<div className='circle-data'></div>
					<p className='chart-label'>Total Pages</p>
					<span className='chart-data-value'>{totalPages}</span>
				</div>
				<div className='chart-data'>
					<div className='circle'></div>
					<p className='chart-label'>Current Page</p>
					<span className='chart-data-value'>{currentPage}</span>
				</div>
			</ChartDataWrapper>
		</StatusComponent>
	);
};
