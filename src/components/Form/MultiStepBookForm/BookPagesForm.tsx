'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';

import { CreateBook } from '@/@types/bookTypes';
import { useMultiForm } from '@/context/MultiFormContext';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputComponent } from '../InputComponent';
import { MultiFormWrapper } from './MultiFormWrapper';
import { FormStepsAction } from './StepsAction';

interface BookPages extends Partial<CreateBook> {}

const bookPagesSchema = yup.object({
	qtd_page: yup
		.number()
		.min(1, 'it must be grater than or equal to 1')
		.required('page quantity is required')
		.typeError('pages quantity needs to be a number'),
	current_page: yup
		.number()
		.default(0)
		.required()
		.typeError('current page needs to be a number'),
}) as ObjectSchema<Partial<CreateBook>>;

export const BookPagesForm = () => {
	const { formData, onSetFormData, onHandleNext, step, onHandleBack } =
		useMultiForm();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<BookPages>({
		defaultValues: formData,
		resolver: yupResolver(bookPagesSchema),
	});

	const handleSavePages = (data: BookPages) => {
		onSetFormData(data);
		onHandleNext();
	};

	return (
		<form onSubmit={handleSubmit(handleSavePages)} autoComplete='off'>
			<MultiFormWrapper title='Pages'>
				<InputComponent
					{...register('qtd_page', {
						valueAsNumber: true,
						required: 'Campo obrigatório',
					})}
					type='number'
					error={errors.qtd_page}
					label='Total Pages'
					id='book-total-pages'
					placeholder='300'
					autoFocus
				/>
				{/* Current Page */}
				<InputComponent
					{...register('current_page', {
						valueAsNumber: true,
						required: 'Campo obrigatório',
					})}
					type='number'
					error={errors.current_page}
					label='Current Page'
					id='book-current-page'
					placeholder='100'
				/>
			</MultiFormWrapper>

			{/* Hidden submit */}
			<button type='submit' style={{ display: 'none' }} aria-hidden='true'>
				Submit
			</button>

			<FormStepsAction
				step={step}
				onHandleBack={onHandleBack}
				onHandleSubmit={handleSubmit(handleSavePages)}
			/>
		</form>
	);
};
