'use client';

import { SelectComponent } from './styles';

interface SelectBookProps {
	books: string[];
	onSelectBook: (book: string) => void;
}

export const SelectBook = ({ books, onSelectBook }: SelectBookProps) => {
	return (
		<SelectComponent
			defaultValue={books[0]}
			onChange={e => onSelectBook(e.target.value)}
		>
			{books.map((book, i) => (
				<option value={book} key={`${book}-${i}`}>
					{book}
				</option>
			))}
		</SelectComponent>
	);
};
