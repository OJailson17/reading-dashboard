'use client';

import { ChartDataWrapper, StatusComponent } from '@/styles/common';
import { results } from 'fakeData';
import { useCallback, useEffect, useState } from 'react';
import { DonutComponent } from '../Donut';
import { SelectBook } from '../SelectBook';

interface ReadingStatusProps {
	books: any;
}

export const ReadingStatus = ({ books }: ReadingStatusProps) => {
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [selectedBook, setSelectedBook] = useState(books[0]);
	const [selectedBookName, setSelectedBookName] = useState(
		books[0].properties.Name.title[0].plain_text,
	);

	// Get the selected book and set on selectedBook state
	const handleChangeSelectedBook = (book: any) => {
		setSelectedBookName(book);
	};

	// Map through the books list and get just the name of the books
	const bookNames = books.map((book: any) => {
		return book.properties.Name.title[0].plain_text;
	});

	// When the books list or the name of the book changes, update the book data to the new book name
	useEffect(() => {
		// Find a book with the same name as the selected book state
		const getBookData = books.find(
			(book: any) =>
				book.properties.Name.title[0].plain_text === selectedBookName,
		);

		if (getBookData) {
			setSelectedBook(getBookData);
			setCurrentPage(getBookData.properties['Current Page'].number);
			setTotalPages(getBookData.properties['Qtd. Pages'].number);
		}

		console.log({ getBookData });

		console.log(selectedBookName);
	}, [selectedBookName, books]);

	// Calculate the percentage of how much the book was read
	const calculatePercentage = useCallback(() => {
		if (
			selectedBook?.properties['Current Page']?.number &&
			selectedBook?.properties['Qtd. Pages']?.number
		) {
			return Math.floor(
				(selectedBook.properties['Current Page'].number /
					selectedBook.properties['Qtd. Pages'].number) *
					100,
			);
		}

		return 0;
	}, [selectedBook]);

	return (
		<StatusComponent>
			<p className='status-component-title'>Reading</p>

			{books?.length > 1 ? (
				<SelectBook books={bookNames} onSelectBook={handleChangeSelectedBook} />
			) : (
				<span className='status-component-description'>
					Book Name quando o nome do book é muito grande
				</span>
			)}

			<DonutComponent read_percentage={calculatePercentage()} />

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
