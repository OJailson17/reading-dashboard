'use client';

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
	return (
		<Select.Root defaultValue={books[0]} onValueChange={e => onSelectBook(e)}>
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
