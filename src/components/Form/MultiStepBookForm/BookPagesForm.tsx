'use client';

import React from 'react';
import { MultiFormWrapper } from './MultiFormWrapper';
import { CreateBook } from '../BookForm';
import { useForm } from 'react-hook-form';
import { InputComponent } from '../BookForm/InputComponent';
import { StepFormComponentProps } from './BookTitleForm';
import { useMultiForm } from '@/context/MultiFormContext';

interface BookPages extends Partial<CreateBook> {}

export const BookPagesForm = ({
	formStep,
	nextFormStep,
}: StepFormComponentProps) => {
	const { formData, onSetFormData, onHandleNext } = useMultiForm();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<BookPages>({
		defaultValues: formData,
	});

	const handleSavePages = (data: BookPages) => {
		onSetFormData(data);
		onHandleNext();
	};

	return (
		<form onSubmit={handleSubmit(handleSavePages)}>
			<MultiFormWrapper title='Book Title'>
				<InputComponent
					{...register('qtd_page', {
						valueAsNumber: true,
						required: true,
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
						required: true,
					})}
					type='number'
					error={errors.current_page}
					label='Current Page'
					id='book-current-page'
					placeholder='100'
				/>
			</MultiFormWrapper>

			{/* Hidden input */}
			<button type='submit' style={{ display: 'none' }} aria-hidden='true'>
				Submit
			</button>
		</form>
	);
};
