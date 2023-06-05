/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useCallback, useEffect, useState } from 'react';

import { DonutComponent } from '../Donut';
import { SelectBook } from '../SelectBook';

import { Book } from '@/types/bookTypes';
import { ChartDataWrapper, StatusComponent } from '@/styles/common';
import { useBook } from '@/context/BookContext';
import { calculateBookPercentage } from '@/utils/calculateBookPercentage';
import { getBookWithGraterProgress } from '@/utils/getGraterProgress';
import { LoadingScreen } from '../LoadingScreen';

interface ReadingStatusProps {
	books: Book[];
}

export const ReadingStatus = ({ books }: ReadingStatusProps) => {
	const [readingBooks, setReadingBooks] = useState<Book[]>(books);
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [selectedBook, setSelectedBook] = useState<Book>(books[0]);
	const [selectedBookName, setSelectedBookName] = useState(
		books[0].properties.Name.title[0].plain_text,
	);
	const [bookNames, setBookNames] = useState<string[]>([]);

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
			(book: Book) =>
				book.properties.Name.title[0].plain_text === selectedBookName,
		);

		if (getBookData) {
			setSelectedBook(getBookData);
			setCurrentPage(getBookData.properties['Current Page'].number);
			setTotalPages(getBookData.properties['Qtd. Pages'].number);
		}
	};

	// When the the name of the book changes, update the book data to the new book name
	useEffect(() => {
		updateCardValues();
	}, [selectedBookName]);

	// When the books list changes, update all the card data
	useEffect(() => {
		if (readingBooks && readingBooks.length > 0) {
			const graterProgress = getBookWithGraterProgress(readingBooks);
			setSelectedBookName(graterProgress[0]);
			setBookNames(graterProgress);
			return;
		}

		updateCardValues();
	}, [readingBooks]);

	// If the books get updated, get just the reading books and rerender
	useEffect(() => {
		const filterBooks =
			allBooks?.filter(
				(book: Book) => book.properties.Status.select.name === 'Reading',
			) || [];

		if (allBooks && allBooks?.length > 0) {
			setReadingBooks(filterBooks || []);
		}
	}, [allBooks]);

	// Calculate the percentage of how much the book was read
	const readPercentage = calculateBookPercentage({
		currentPage: selectedBook?.properties['Current Page']?.number || 0,
		totalPages: selectedBook?.properties['Qtd. Pages']?.number || 0,
	});

	return (
		<>
			{readingBooks.length > 0 && (
				<StatusComponent>
					<p className='status-component-title'>Reading</p>
					{bookNames.length > 0 ? (
						<>
							{readingBooks?.length > 1 ? (
								<SelectBook
									books={bookNames}
									onSelectBook={handleChangeSelectedBook}
								/>
							) : (
								<span className='status-component-description'>
									{selectedBookName}
								</span>
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
									<span className='chart-data-value'>{currentPage || 0}</span>
								</div>
							</ChartDataWrapper>
						</>
					) : (
						<LoadingScreen full_screen_height={false} />
					)}
				</StatusComponent>
			)}
		</>
	);
};
