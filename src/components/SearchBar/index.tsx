'use client';

import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { Book } from '@/@types/bookTypes';

import { SearchBarContainer, SearchInput } from './styles';

interface SearchBarProps {
	isOpen: boolean;
	reading_books: Book[];
	finished_books: Book[];
	to_read_books?: Book[];
	onSearchBook: (bookTitle: string) => void;
}

interface SearchBookProps {
	'book-title': string;
}

export const SearchBar = (props: SearchBarProps) => {
	const { register, handleSubmit, setFocus } = useForm<SearchBookProps>();

	const handleSearchBook = (data: SearchBookProps) => {
		props.onSearchBook(data['book-title'] || '');
	};

	useEffect(() => {
		if (props.isOpen) {
			setFocus('book-title');
		}
	}, [props.isOpen, setFocus]);

	return (
		<SearchBarContainer
			isOpen={props.isOpen}
			onSubmit={handleSubmit(handleSearchBook)}
			autoComplete='off'
		>
			<div>
				<SearchInput
					isOpen={props.isOpen}
					placeholder='Search book'
					title='Search Book'
					{...register('book-title')}
				/>
			</div>

			<div />
		</SearchBarContainer>
	);
};
