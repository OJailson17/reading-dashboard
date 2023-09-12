'use client';

import React from 'react';
import { MultiFormWrapper } from './MultiFormWrapper';
import { CreateBook } from '../BookForm';
import { useForm } from 'react-hook-form';
import { InputComponent } from '../BookForm/InputComponent';

interface BookPages extends Partial<CreateBook> {}

export const BookPagesForm = () => {
	const {
		register,
		formState: { errors },
	} = useForm<BookPages>();

	return (
		<>
			<MultiFormWrapper title='Book Title'>
				<InputComponent
					{...register('qtd_page', {
						valueAsNumber: true,
					})}
					type='number'
					error={errors.qtd_page}
					label='Total Pages'
					id='book-total-pages'
					placeholder='Image URL or ISBN-10 Code'
				/>

				{/* Current Page */}
				<InputComponent
					{...register('current_page', {
						valueAsNumber: true,
					})}
					type='number'
					error={errors.current_page}
					label='Current Page'
					id='book-current-page'
					placeholder='100'
				/>
			</MultiFormWrapper>
		</>
	);
};
