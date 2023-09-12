'use client';

import React from 'react';
import { MultiFormWrapper } from './MultiFormWrapper';
import { useForm } from 'react-hook-form';
import { InputComponent } from '../BookForm/InputComponent';
import { CreateBook } from '../BookForm';

interface BookAuthor extends Partial<CreateBook> {}

export const BookAuthorForm = () => {
	const {
		register,
		formState: { errors },
	} = useForm<BookAuthor>();

	return (
		<>
			<MultiFormWrapper title='Book Author'>
				<InputComponent
					{...register('author')}
					error={errors.author}
					label='Book Author'
					id='book-author'
					placeholder='J. K. Rowlling'
				/>
			</MultiFormWrapper>
		</>
	);
};
