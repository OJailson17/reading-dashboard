'use client';

import { useEffect, useState } from 'react';
import * as Select from '@radix-ui/react-select';
import { GoTriangleDown } from 'react-icons/go';
import {
	SelectContent,
	SelectItem,
	SelectTriggerButton,
	SelectViewport,
} from './styles';

interface SelectBookProps {
	books: string[];
	onSelectBook: (book: string) => void;
}

export const SelectBook = ({ books, onSelectBook }: SelectBookProps) => {
	const [selectedBook, setSelectedBook] = useState(books[0]);

	useEffect(() => {
		setSelectedBook(books[0]);
	}, [books]);

	const handleSelectBook = (e: string) => {
		const selectedValue = e;
		setSelectedBook(selectedValue);
		onSelectBook(selectedValue);
	};

	return (
		<Select.Root value={selectedBook} onValueChange={handleSelectBook}>
			<SelectTriggerButton>
				<Select.Value placeholder='Select a book' />
				<Select.Icon style={{ color: 'white' }}>
					<GoTriangleDown />
				</Select.Icon>
			</SelectTriggerButton>

			<Select.Portal>
				<SelectContent>
					<SelectViewport>
						{books.map((book, i) => (
							<SelectItem value={book} key={`${book}-${i}`}>
								<Select.ItemText>{book}</Select.ItemText>
							</SelectItem>
						))}
					</SelectViewport>
				</SelectContent>
			</Select.Portal>
		</Select.Root>
	);
};

// export const SelectBook = memo(SelectBookBase);
