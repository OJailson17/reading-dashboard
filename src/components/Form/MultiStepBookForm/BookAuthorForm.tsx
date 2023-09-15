'use client';

import React from 'react';
import { MultiFormWrapper } from './MultiFormWrapper';
import { useForm } from 'react-hook-form';
import { InputComponent } from '../BookForm/InputComponent';
import { CreateBook } from '../BookForm';
import { useMultiForm } from '@/context/MultiFormContext';
import { StepFormComponentProps } from './BookTitleForm';

interface BookAuthor extends Partial<CreateBook> {}

export const BookAuthorForm = ({
	formStep,
	nextFormStep,
}: StepFormComponentProps) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<BookAuthor>();

	const { setFormValues } = useMultiForm();

	const handleSaveBookAuthor = (data: BookAuthor) => {
		setFormValues(data);
		nextFormStep();
	};

	return (
		<>
			{/* {formStep === 1 && ( */}
			<form onSubmit={handleSubmit(handleSaveBookAuthor)}>
				<MultiFormWrapper title='Book Author'>
					<InputComponent
						{...register('author')}
						error={errors.author}
						label='Book Author'
						id='book-author'
						placeholder='J. K. Rowlling'
					/>
				</MultiFormWrapper>
			</form>
			{/* )} */}
		</>
	);
};
