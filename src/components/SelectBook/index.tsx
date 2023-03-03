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
	onSelectBook: (book: any) => void;
}

export const SelectBook = ({ books, onSelectBook }: SelectBookProps) => {
	// console.log({ books2: books });

	// books.push('Hábitos Atômicos');

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
					{/* <Select.Item value='book1' style={{ background: 'red' }}>
							Nome do livro 1
						</Select.Item>
						<Select.Item value='book2' style={{ background: 'red' }}>
							Nome do livro 2
						</Select.Item> */}

					<SelectViewport>
						{books.map((book, i) => (
							<SelectItem value={book} key={`${book}-${i}`}>
								<Select.ItemText>{book}</Select.ItemText>
							</SelectItem>
						))}
						{/* 
						<SelectItem value='book2'>
							<Select.ItemText>Book 2</Select.ItemText>
							<Select.ItemIndicator />
						</SelectItem>
						<SelectItem value='book3'>
							<Select.ItemText>Book 2</Select.ItemText>
							<Select.ItemIndicator />
						</SelectItem>
						<SelectItem value='book4'>
							<Select.ItemText>Book 2</Select.ItemText>
							<Select.ItemIndicator />
						</SelectItem> */}
					</SelectViewport>
				</SelectContent>
			</Select.Portal>
		</Select.Root>
	);
};
