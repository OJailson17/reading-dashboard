'use client';

import React from 'react';
import { MultiFormWrapper } from './MultiFormWrapper';
import { CreateBook } from '../BookForm';
import { useForm } from 'react-hook-form';
import { InputComponent } from '../BookForm/InputComponent';
import { useMultiForm } from '@/context/MultiFormContext';

interface BookTitle extends Partial<CreateBook> {}

export const BookTitleForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<BookTitle>();

	const { setFormValues } = useMultiForm();

	const handleSaveBookTitle = (data: BookTitle) => {
		setFormValues({ values: data });
	};

	return (
		<form onSubmit={handleSubmit(handleSaveBookTitle)}>
			<MultiFormWrapper title='Book Title'>
				<InputComponent
					{...register('name')}
					error={errors.name}
					label='Name'
					id='book-name'
					placeholder='Ex: Harry Potter'
				/>
			</MultiFormWrapper>
		</form>
	);
};
