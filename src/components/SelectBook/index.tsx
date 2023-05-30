'use client';

import * as Select from '@radix-ui/react-select';

import { GoTriangleDown } from 'react-icons/go';

import {
	SelectContent,
	SelectItem,
	SelectTriggerButton,
	SelectViewport,
} from './styles';
import { useEffect } from 'react';

interface SelectBookProps {
	books: string[];
	onSelectBook: (book: string) => void;
}

export const SelectBook = ({ books, onSelectBook }: SelectBookProps) => {
	useEffect(() => {
		console.log(books.map(book => book));
	}, [books]);

	return (
		// <Select.Root defaultValue={books[0]} onValueChange={e => onSelectBook(e)}>
		// 	<SelectTriggerButton>
		// 		<Select.Value placeholder='Select a book' />
		// 		<Select.Icon style={{ color: 'white' }}>
		// 			<GoTriangleDown />
		// 		</Select.Icon>
		// 	</SelectTriggerButton>

		// 	<Select.Portal>
		// 		<SelectContent>
		// 			<SelectViewport>
		// 				{books.map((book, i) => (
		// 					<SelectItem value={book} key={`${book}-${i}`}>
		// 						<Select.ItemText>{book}</Select.ItemText>
		// 					</SelectItem>
		// 				))}
		// 			</SelectViewport>
		// 		</SelectContent>
		// 	</Select.Portal>
		// </Select.Root>
		<select
			name='books_names'
			id='books_names'
			onChange={e => onSelectBook(e.target.value)}
			defaultValue={books[0]}
		>
			{books.map((book, i) => (
				<option value={book} key={`${book}-${i}`}>
					{book}
				</option>
			))}
		</select>
	);
};
