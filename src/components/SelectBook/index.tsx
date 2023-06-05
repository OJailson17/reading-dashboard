'use client';

import { useEffect, useState } from 'react';
import { SelectComponent } from './styles';

interface SelectBookProps {
	books: string[];
	onSelectBook: (book: string) => void;
}

export const SelectBook = ({ books, onSelectBook }: SelectBookProps) => {
	const [selectedBook, setSelectedBook] = useState(books[0]);

	useEffect(() => {
		setSelectedBook(books[0]);
	}, [books]);

	const handleSelectBook = (e: any) => {
		const selectedValue = e.target.value;
		setSelectedBook(selectedValue);
		onSelectBook(selectedValue);
	};

	return (
		<SelectComponent value={selectedBook} onChange={handleSelectBook}>
			{books &&
				books.map(book => {
					return (
						<option value={book} key={`${book}`}>
							{book}
						</option>
					);
				})}
		</SelectComponent>
	);
};

// export const SelectBook = memo(SelectBookBase);
