/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';

import { Book } from '@/@types/bookTypes';
import { useBook } from '@/context/BookContext';
import { ChartDataWrapper, StatusComponent } from '@/styles/common';
import { calculateBookPercentage } from '@/utils/functions/calculateBookPercentage';
import { getBookWithGraterProgress } from '@/utils/functions/getBookWithGraterProgress';

import { DonutComponent } from '../Donut';
import { LoadingScreen } from '../LoadingScreen';
import { SelectBook } from '../SelectBook';

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

	const { books: allBooks } = useBook();

	const handleChangeSelectedBook = (book: string) => {
		setSelectedBookName(book);
	};

	const updateCardValues = () => {
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

	// If the books get updated, get just the reading books and rerender the whole card
	useEffect(() => {
		const filterBooks =
			allBooks?.filter(
				(book: Book) => book.properties.Status.select.name === 'Reading',
			) || [];

		if (allBooks && allBooks?.length > 0) {
			setReadingBooks(filterBooks || []);
		}
	}, [allBooks]);

	// When the books list changes, update all the card data
	useEffect(() => {
		if (readingBooks && readingBooks.length > 0) {
			const graterProgress = getBookWithGraterProgress(readingBooks);

			// This check is needed to update the card data if the updated book is the first item of the list
			if (graterProgress[0] === selectedBookName) {
				setBookNames(graterProgress);
				updateCardValues();
				return;
			}

			setSelectedBookName(graterProgress[0]);
			setBookNames(graterProgress);
			return;
		}

		updateCardValues();
	}, [readingBooks]);

	// When the the name of the book changes, update the book data with the new book name
	useEffect(() => {
		updateCardValues();
	}, [selectedBookName]);

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
							{readingBooks?.length === 1 && (
								<span className='status-component-description'>
									{selectedBookName}
								</span>
							)}

							{readingBooks?.length > 1 && (
								<SelectBook
									books={bookNames}
									onSelectBook={handleChangeSelectedBook}
								/>
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
