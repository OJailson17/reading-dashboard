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
	const [selectedBookName, setSelectedBookName] = useState('');
	const [readPercentage, setReadPercentage] = useState(0);

	const handleChangeSelectedBook = (book: any) => {
		setSelectedBookName(book);
	};

	const bookNames = books.map(book => {
		return book.properties.Name.title[0].plain_text;
	});

	console.log({ bookNames });

	console.log({ books });

	useEffect(() => {
		const getBookData = books.filter(
			book => book.properties.Name.title[0].plain_text === selectedBookName,
		);

		// setSelectedBook(getBookData);

		console.log({ getBookData });

		console.log(selectedBookName);
	}, [selectedBookName, books]);

	// !Corrigir bug das propriedades estarem undefined

	useEffect(() => {
		console.log({ selectedBook2: selectedBook });

		const calculatePercentage = () => {
			return Math.floor(
				(selectedBook.properties['Current Page'].number /
					selectedBook.properties['Qtd. Pages'].number) *
					100,
			);
		};

		const percentage = calculatePercentage();
		setReadPercentage(percentage);
	}, [selectedBook]);

	console.log({ selectedBook });

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
