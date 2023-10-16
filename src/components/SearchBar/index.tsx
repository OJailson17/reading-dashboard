'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';

import { Book } from '@/@types/bookTypes';

import { SearchBarContainer, SearchInput } from './styles';

interface SearchBarProps {
	isOpen: boolean;
	reading_books: Book[];
	finished_books: Book[];
	to_read_books?: Book[];
	onSearchBook: (bookTitle: string) => void;
}

export const SearchBar = (props: SearchBarProps) => {
	const { register, handleSubmit } = useForm();

	const handleSearchBook = (data: any) => {
		console.log(data);

		props.onSearchBook(data['book-title']);
	};

	return (
		<SearchBarContainer
			isOpen={props.isOpen}
			onSubmit={handleSubmit(handleSearchBook)}
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
