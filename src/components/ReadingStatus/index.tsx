/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';

import { DonutComponent } from '../Donut';
import { SelectBook } from '../SelectBook';

import { Book } from '@/types/bookTypes';
import { ChartDataWrapper, StatusComponent } from '@/styles/common';

interface ReadingStatusProps {
	books: Book[];
}

export const ReadingStatus = ({ books }: ReadingStatusProps) => {
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [selectedBook, setSelectedBook] = useState<Book>(books[0]);
	const [selectedBookName, setSelectedBookName] = useState(
		books[0]?.properties.Name.title[0].plain_text,
	);

	// Get the selected book and set on selectedBook state
	const handleChangeSelectedBook = (book: string) => {
		setSelectedBookName(book);
	};

	// Update the whole card values
	const updateCardValues = () => {
		// Find a book with the same name as the selected book state
		const getBookData = books.find(
			(book: any) =>
				book.properties.Name.title[0].plain_text === selectedBookName,
		);

		// console.log(getBookData?.properties['Current Page'].number);

		if (getBookData) {
			setSelectedBook(getBookData);
			setCurrentPage(getBookData.properties['Current Page'].number);
			setTotalPages(getBookData.properties['Qtd. Pages'].number);
		}
	};

	// Map through the books list and get just the name of the books
	const bookNames = books.map((book: Book) => {
		return book.properties.Name.title[0].plain_text;
	});

	// When the the name of the book changes, update the book data to the new book name
	useEffect(() => {
		updateCardValues();
	}, [selectedBookName]);

	// When the books list change, update the book data
	useEffect(() => {
		// console.log({ selectedBookName });
		// console.log({ books });
		if (books[0]?.properties.Name.title[0].plain_text !== selectedBookName) {
			// console.log('it rendered');
			setSelectedBookName(books[0]?.properties.Name.title[0].plain_text);
			return;
		}
		updateCardValues();
	}, [books]);

	// Calculate the percentage of how much the book was read
	const readPercentage = Math.floor(
		(selectedBook?.properties['Current Page']?.number /
			selectedBook?.properties['Qtd. Pages']?.number) *
			100,
	);

	// console.log({ selectedBookName });

	// console.log({ books });

	return (
		<StatusComponent>
			<p className='status-component-title'>Reading</p>

			{/* If there is more the one book render a select element, if not render just the name of the book */}
			{books?.length > 1 ? (
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
