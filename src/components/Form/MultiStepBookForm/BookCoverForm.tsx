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

interface BookCover extends Partial<CreateBook> {}

const bookCoverSchema = yup.object({
	icon_url: yup.string().trim().optional(),
}) as ObjectSchema<Partial<CreateBook>>;

export const BookCoverForm = () => {
	const { onHandleNext, onSetFormData, formData, step, onHandleBack } =
		useMultiForm();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<BookCover>({
		defaultValues: formData,
		resolver: yupResolver(bookCoverSchema),
	});

	const handleSaveBookCover = (data: BookCover) => {
		onSetFormData(data);
		onHandleNext();
	};
	return (
		<form onSubmit={handleSubmit(handleSaveBookCover)} autoComplete='off'>
			<MultiFormWrapper title='Cover'>
				<InputComponent
					{...register('icon_url')}
					error={errors.icon_url}
					label='Book Cover (URL or ISBN-10)'
					id='book-cover'
					placeholder='Image URL or ISBN-10 Code'
					autoFocus
				/>
			</MultiFormWrapper>

			<FormStepsAction
				step={step}
				onHandleBack={onHandleBack}
				onHandleSubmit={handleSubmit(handleSaveBookCover)}
			/>
		</form>
	);
};
